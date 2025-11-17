<template>
  <view class="page">
    <!-- 顶部头像 + “个人版” -->
    <view class="top">
      <view class="avatar-wrap">
        <image class="avatar" src="/static/gesture/avatar.png" mode="aspectFit" />
        <view class="chip">个人版</view>
      </view>
      <view class="hello">**莲，下午好！</view>
    </view>

    <!-- 手势九宫格（画布 + 点位） -->
    <view
      class="lock-wrap"
      @touchstart.stop.prevent="onStart"
      @touchmove.stop.prevent="onMove"
      @touchend.stop.prevent="onEnd"
    >
      <canvas class="cv" canvas-id="lockCanvas" id="lockCanvas" type="2d"></canvas>
      <view class="dots">
        <view
          v-for="(p,idx) in points"
          :key="idx"
          :class="['dot', selected.has(idx) ? 'on' : '', error && selected.size>0 ? 'err' : '']"
          :style="{ left: (p.x - R)+'px', top: (p.y - R)+'px', width: 2*R+'px', height: 2*R+'px' }"
        />
      </view>
    </view>

    <!-- 提示 -->
    <view class="tip" :class="{ err: error }">{{ tipText }}</view>

    <!-- 其他登录方式 -->
    <view class="other">
      <text class="other-t">其他登录方式</text>
      <view class="ways">
        <view class="way" @click="toast('密码登录')"><image src="/static/gesture/pwd.png" class="w-ico" /></view>
        <view class="way" @click="toast('指纹登录')"><image src="/static/gesture/fp.png"  class="w-ico" /></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onReady, onShow, onHide } from '@dcloudio/uni-app'

/** === 登录时效 === */
const FRONT_TTL_MS = 60 * 60 * 1000   // 前台 1h
const BG_TTL_MS    = 10 * 60 * 1000   // 后台 10min
const STORAGE_KEY  = 'GESTURE_PATTERN'
const LOGIN_UNTIL  = 'AUTH_VALID_UNTIL'
const BG_AT        = 'APP_BG_AT'

/** === 画布与点位 === */
let ctx: any = null
let isMiniCtx = false            // 是否为小程序/APP CanvasContext
const W = 300, H = 300, GAP = 100, R = 26
const originX = 36, originY = 36

type P = { x:number, y:number }
const points = ref<P[]>([])
const selected = ref<Set<number>>(new Set())
const movingPoint = ref<P|null>(null)
const error = ref(false)
const tipText = ref('请绘制解锁图案')
const mode = ref<'set1'|'set2'|'verify'>('verify')
const cacheFirst = ref<number[]|null>(null)

/** 生成 3x3 点位 */
function buildPoints(){
  const arr:P[] = []
  for (let r=0;r<3;r++){
    for (let c=0;c<3;c++){
      arr.push({ x: originX + c*GAP, y: originY + r*GAP })
    }
  }
  points.value = arr
}

/** 命中检测 */
function hitIndex(x:number,y:number): number | null {
  for (let i=0;i<points.value.length;i++){
    const p = points.value[i]
    const d = Math.hypot(x-p.x, y-p.y)
    if (d <= R + 6) return i
  }
  return null
}

/** touch 工具 */
let rect:{left:number,top:number} = {left:0, top:0}
function getTouch(e:any){ const t=e.touches?.[0]||e.changedTouches?.[0]; return { x:t.x||t.clientX, y:t.y||t.clientY } }
function rel(e:any){ const {x,y}=getTouch(e); return { x: x-rect.left, y: y-rect.top } }

/** 事件 */
function onStart(e:any){
  resetDraw()
  const p = rel(e)
  const idx = hitIndex(p.x,p.y)
  if (idx!==null){ selected.value.add(idx); movingPoint.value = p; draw() }
}
function onMove(e:any){
  if (!selected.value.size) return
  const p = rel(e)
  movingPoint.value = p
  const idx = hitIndex(p.x,p.y)
  if (idx!==null && !selected.value.has(idx)) selected.value.add(idx)
  draw()
}
function onEnd(){
  if (selected.value.size<4){ return errorFlash('至少连接 4 个点') }
  const pattern = Array.from(selected.value)
  if (mode.value==='verify'){
    const saved = uni.getStorageSync(STORAGE_KEY) as number[]|undefined
    if (!saved || !saved.length){ mode.value='set1'; tipText.value='请设置手势图案'; return resetDraw(true) }
    return isSame(saved, pattern) ? okLogin('解锁成功') : errorFlash('手势不正确')
  }
  if (mode.value==='set1'){ cacheFirst.value=pattern; mode.value='set2'; tipText.value='请再次绘制以确认'; return resetDraw(true) }
  if (mode.value==='set2'){
    if (isSame(cacheFirst.value!, pattern)){
      uni.setStorageSync(STORAGE_KEY, pattern)
      return okLogin('设置成功，已解锁')
    }
    cacheFirst.value=null; mode.value='set1'; return errorFlash('两次不一致，请重试')
  }
}

function isSame(a:number[], b:number[]){ return a.length===b.length && a.every((v,i)=>v===b[i]) }
function okLogin(msg:string){
  uni.showToast({ title: msg, icon: 'success' })
  uni.setStorageSync(LOGIN_UNTIL, Date.now() + FRONT_TTL_MS)
  setTimeout(()=>{ uni.navigateBack({ fail(){ uni.switchTab({ url:'/pages/mine/index' }) } }) }, 220)
  resetDraw(true)
}

/** === 画布兼容封装 === */
function setStrokeStyle(color:string){
  if (!ctx) return
  if ('setStrokeStyle' in ctx){ // 小程序/APP
    ctx.setStrokeStyle(color)
    ctx.setLineWidth(4)
    // @ts-ignore
    ctx.setLineCap && ctx.setLineCap('round')
    isMiniCtx = true
  }else{                        // H5
    ctx.strokeStyle = color
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    isMiniCtx = false
  }
}
function clearAll(){
  if (!ctx) return
  // 两端都有 clearRect
  ctx.clearRect(0,0,W,H)
  if (isMiniCtx && 'draw' in ctx) ctx.draw(true)
}
function pathMoveTo(x:number,y:number){
  if (!ctx) return
  ctx.beginPath()
  ctx.moveTo(x,y)
}
function pathLineTo(x:number,y:number){
  if (!ctx) return
  ctx.lineTo(x,y)
}
function stroke(){
  if (!ctx) return
  ctx.stroke()
  if (isMiniCtx && 'draw' in ctx) ctx.draw(true)
}

/** 绘制主逻辑 */
function draw(){
  if (!ctx) return
  clearAll()
  const color = error.value ? '#c84c4c' : '#b86a6a'
  setStrokeStyle(color)
  const arr = Array.from(selected.value).map(i=>points.value[i])
  if (!arr.length) return
  pathMoveTo(arr[0].x, arr[0].y)
  for (let i=1;i<arr.length;i++){ pathLineTo(arr[i].x, arr[i].y) }
  if (movingPoint.value) pathLineTo(movingPoint.value.x, movingPoint.value.y)
  stroke()
}

function resetDraw(onlyState=false){
  selected.value.clear()
  movingPoint.value=null
  if (!onlyState) clearAll(); else draw()
}
function errorFlash(tip:string){
  tipText.value = tip; error.value = true; draw()
  setTimeout(()=>{
    error.value=false; resetDraw(true)
    tipText.value = mode.value==='verify' ? '请绘制解锁图案' : (mode.value==='set2' ? '请再次绘制以确认' : '请设置手势图案')
  }, 800)
}

/** === 生命周期 === */
onReady(() => {
  buildPoints()

  // H5：原生 Canvas 2D
  // #ifdef H5
  const el = document.querySelector('#lockCanvas') as HTMLCanvasElement | null
  if (el && el.getContext){
    ctx = el.getContext('2d')
    el.width = W; el.height = H
  } else {
    console.warn('H5: canvas not found or unsupported')
  }
  // #endif

  // 非 H5：小程序 / App
  // #ifndef H5
  ctx = uni.createCanvasContext('lockCanvas', getCurrentPages().slice(-1)[0])
  // #endif

  // 计算触控基准偏移
  uni.createSelectorQuery()
    .in(getCurrentPages().slice(-1)[0])
    .select('.lock-wrap')
    .boundingClientRect((r:any)=>{ if(r) rect={left:r.left, top:r.top} })
    .exec()

  tipText.value = uni.getStorageSync(STORAGE_KEY) ? '请绘制解锁图案' : '请设置手势图案'
  mode.value = uni.getStorageSync(STORAGE_KEY) ? 'verify' : 'set1'
  draw()
})

onShow(()=>{
  const now = Date.now()
  const until = Number(uni.getStorageSync(LOGIN_UNTIL)||0)
  const bgAt  = Number(uni.getStorageSync(BG_AT)||0)
  if (until && now<until) return
  if (bgAt && now-bgAt<BG_TTL_MS) return
  // 过期则停留在本页
})
onHide(()=>{ uni.setStorageSync(BG_AT, Date.now()) })

const toast = (t:string)=>uni.showToast({ title:t, icon:'none' })
</script>

<style scoped>
.page{ min-height:100vh; background:#f6f7f9; display:flex; flex-direction:column; align-items:center; }

/* 顶部 */
.top{ padding-top:48rpx; text-align:center; }
.avatar-wrap{ position:relative; display:inline-block; }
.avatar{ width:168rpx; height:168rpx; opacity:.25; }
.chip{
  position:absolute; left:50%; transform:translateX(-50%); bottom:-12rpx;
  background:#b54c4c; color:#fff; font-size:28rpx; padding:6rpx 18rpx; border-radius:36rpx;
}
.hello{ margin-top:40rpx; font-size:40rpx; font-weight:800; color:#1f2329; }

/* 九宫格区域 */
.lock-wrap{ margin-top:36rpx; width:300px; height:300px; position:relative; }
.cv{ width:300px; height:300px; position:absolute; left:0; top:0; }
.dots{ position:absolute; left:0; top:0; width:300px; height:300px; }
.dot{ position:absolute; border-radius:9999px; background:rgba(183,98,98,.55); box-shadow: inset 0 0 0 4rpx rgba(255,255,255,.35); }
.dot.on{ background: rgba(183,98,98,.95); }
.dot.err{ background:#c84c4c; }

/* 提示 */
.tip{ margin-top:28rpx; font-size:26rpx; color:#8a8f99; }
.tip.err{ color:#c84c4c; }

/* 其他方式 */
.other{ margin-top:60rpx; text-align:center; }
.other-t{ color:#8a8f99; font-size:28rpx; }
.ways{ margin-top:24rpx; display:flex; gap:48rpx; justify-content:center; }
.way{ width:96rpx; height:96rpx; border-radius:999rpx; background:#f0f2f5; display:flex; align-items:center; justify-content:center; }
.w-ico{ width:52rpx; height:52rpx; }
</style>
