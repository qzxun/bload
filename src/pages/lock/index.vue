<template>
  <view class="lock-page">
    <view class="title">
      <view class="tag">个人版</view>
      <text class="hello">{{ greet }}</text>
    </view>

    <canvas
      type="2d"
      id="lockCanvas"
      canvas-id="lockCanvas"
      class="canvas"
      @touchstart="onStart"
      @touchmove="onMove"
      @touchend="onEnd"
    />

    <view class="hint" :class="{ error: state==='error' }">
      <text v-if="mode==='verify'">{{ msgVerify }}</text>
      <text v-else>{{ msgSet }}</text>
    </view>

    <view class="actions">
      <text class="alt" @click="other">其他登录方式</text>
      <view class="ops">
        <button class="btn ghost" @click="reset">重设</button>
        <button class="btn primary" v-if="mode==='verify'" @click="toReset">忘记手势</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 手势解锁页（uni-app / Vue3）
 * - 支持两种模式：set / verify
 * - 入口参数：
 *    mode: 'set' | 'verify'
 *    redirect: 成功后的回跳路径（缺省 /pages/mine/index）
 * - 成功后：markAuthedNow()，并回跳
 */
import { onMounted, ref } from 'vue'
import { markAuthedNow, getGesture } from '@/utils/auth'

/** ====== 画布参数 ====== */
const R = 34          // 点半径 rpx
const LINE = 4        // 线宽 rpx
const GRID = 3
const PADDING = 40    // 内边距 rpx
const RED = '#e1251b'
const OK = '#2ecc71'
const NORMAL = 'rgba(0,0,0,.35)'

/** ====== 文案&状态 ====== */
const mode = ref<'set'|'verify'>('verify')
const msgSet = ref('请绘制解锁图案')
const msgVerify = ref('请绘制已设置的手势')
const greet = ref('欢迎回来')

let ctx: CanvasRenderingContext2D
let W = 0, H = 0, scale = 1
let points:{x:number,y:number,idx:number,selected:boolean}[] = []
let selectPath:number[] = []
let lastPoint:{x:number,y:number}|null = null
let saved:number[]|null = null
let firstSet:number[]|null = null
let state:'idle'|'drawing'|'ok'|'error' = 'idle'

/** ====== 入参处理 ====== */
const page = getCurrentPages().slice(-1)[0] as any
const q = (page && page.options) ? page.options : {}
const initMode: 'set'|'verify' = (q.mode === 'set' || q.mode === 'verify') ? q.mode : 'verify'
const redirect = q.redirect ? decodeURIComponent(q.redirect) : '/pages/mine/index'

/** ====== 工具函数 ====== */
function rpx(n:number){ return n * scale }
function distance(a:any,b:any){ const dx=a.x-b.x, dy=a.y-b.y; return Math.hypot(dx,dy) }
function hit(p:any,t:any){ return distance(p,t)<=rpx(R) }

function makePoints(){
  points = []
  const boxW = W - rpx(PADDING*2)
  const gap = boxW/(GRID-1)
  for(let i=0;i<GRID;i++){
    for(let j=0;j<GRID;j++){
      const x = rpx(PADDING)+j*gap
      const y = rpx(PADDING)+i*gap
      const idx = i*GRID+j
      points.push({x,y,idx,selected:false})
    }
  }
}

function draw(bgOnly=false, color=NORMAL){
  ctx.clearRect(0,0,W,H)
  // 线
  if(!bgOnly){
    ctx.lineWidth = rpx(LINE)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = color
    ctx.beginPath()
    let started=false
    for(const idx of selectPath){
      const p = points[idx]
      if(!started){ ctx.moveTo(p.x,p.y); started=true }
      else ctx.lineTo(p.x,p.y)
    }
    if(lastPoint){ ctx.lineTo(lastPoint.x, lastPoint.y) }
    ctx.stroke()
  }
  // 点
  for(const p of points){
    ctx.fillStyle = p.selected ? color : 'rgba(0,0,0,.08)'
    ctx.beginPath()
    ctx.arc(p.x, p.y, rpx(R), 0, Math.PI*2)
    ctx.fill()
    if(p.selected){
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(p.x, p.y, rpx(8), 0, Math.PI*2)
      ctx.fill()
    }
  }
}

function setState(s:'idle'|'drawing'|'ok'|'error'){
  state = s
  const col = s==='error'? RED : (s==='ok'? OK : NORMAL)
  draw(false, col)
}

function pick(t:{x:number,y:number}){
  for(const p of points){
    if(!p.selected && hit(t,p)){
      p.selected = true
      selectPath.push(p.idx)
      return
    }
  }
}

function canvasPos(e:any){
  const touch = e.touches?.[0] || e.changedTouches?.[0]
  return { x: touch.x, y: touch.y }
}

function onStart(e:any){
  selectPath = []; lastPoint=null
  points.forEach(p=>p.selected=false)
  setState('drawing')
  const p = canvasPos(e)
  pick(p); lastPoint = p
  draw(false, NORMAL)
}
function onMove(e:any){
  if(state!=='drawing') return
  const p = canvasPos(e)
  pick(p); lastPoint = p
  draw(false, NORMAL)
}
function resetLine(keepSel=false){
  selectPath = []
  if(!keepSel) points.forEach(p=>p.selected=false)
  setState('idle'); draw(true)
}

/** 成功后：标记认证时间 + 回跳 */
function onUnlockSuccess(){
  markAuthedNow()
  // tab 页建议 switchTab
  if (redirect.startsWith('/pages/')) {
    if (redirect.includes('/mine/')) uni.switchTab({ url: redirect })
    else uni.redirectTo({ url: redirect })
  } else {
    uni.switchTab({ url: '/pages/mine/index' })
  }
}

function onEnd(){
  lastPoint = null
  if(selectPath.length<3){
    msgSet.value = '至少连接 3 个点'
    setState('error'); return setTimeout(()=>{resetLine()}, 500)
  }

  if(mode.value==='verify'){
    const ok = JSON.stringify(selectPath)===JSON.stringify(saved)
    if(ok){
      setState('ok'); msgVerify.value='解锁成功'
      setTimeout(onUnlockSuccess, 220)
    }else{
      msgVerify.value='手势不匹配'
      setState('error'); setTimeout(()=>{resetLine()}, 500)
    }
  }else{ // set
    if(!firstSet){
      firstSet = [...selectPath]
      msgSet.value = '请再次绘制以确认'
      resetLine(true)
    }else{
      const same = JSON.stringify(firstSet)===JSON.stringify(selectPath)
      if(same){
        uni.setStorageSync('gesture_pattern', firstSet)
        setState('ok'); msgSet.value='设置成功'
        setTimeout(onUnlockSuccess, 220)
      }else{
        msgSet.value='两次不一致，请重试'
        firstSet = null
        setState('error'); setTimeout(()=>{resetLine()}, 500)
      }
    }
  }
}

function reset(){
  if(mode.value==='set'){ firstSet=null; msgSet.value='请绘制解锁图案' }
  resetLine()
}
function toReset(){
  uni.removeStorageSync('gesture_pattern')
  mode.value='set'
  msgSet.value='请绘制新的解锁图案'
  firstSet=null
  reset()
}
function other(){
  uni.showToast({ title:'其它登录方式（占位）', icon:'none' })
}

/** 初始化：模式与画布 */
onMounted(()=>{
  saved = getGesture()
  // 若未设置手势但要求 verify，强制进入 set
  mode.value = saved && saved.length ? initMode : 'set'

  // 初始化 Canvas
  const query = uni.createSelectorQuery()
  query.select('#lockCanvas').fields({ node:true, size:true }).exec((res:any)=>{
    const canvas = res?.[0]?.node as HTMLCanvasElement
    ctx = canvas.getContext('2d') as any
    const dpr = uni.getSystemInfoSync().pixelRatio || 1
    const vw = uni.getSystemInfoSync().windowWidth
    const size = Math.min(vw*0.86, 360)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = size + 'px'
    canvas.style.height = size + 'px'
    ctx.scale(dpr, dpr)
    W = size; H = size
    scale = 1 // 这里直接用 1，rpx() 作为像素倍增器
    makePoints()
    draw(true)
  })
})
</script>

<style scoped>
.lock-page{
  min-height:100vh;
  background: #f6f7fb;
  display:flex; flex-direction:column; align-items:center;
}
.title{ width:100%; padding-top: 60rpx; display:flex; align-items:center; flex-direction:column; }
.tag{
  background:#e1251b; color:#fff; padding: 8rpx 18rpx; border-radius: 999rpx;
  font-size: 22rpx;
}
.hello{ margin-top: 16rpx; font-size: 34rpx; font-weight:600; color:#1f2329; }
.canvas{ margin-top: 40rpx; width: 86vw; height: 86vw; background: #fff; border-radius: 24rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,.05); }
.hint{ margin-top: 16rpx; color:#8a8f99; }
.hint.error{ color:#e1251b; animation: shake .25s linear 2; }
@keyframes shake{ 0%{transform:translateX(0)}25%{transform:translateX(-6rpx)}50%{transform:translateX(6rpx)}75%{transform:translateX(-6rpx)}100%{transform:translateX(0)} }
.actions{ width: 86vw; margin-top: 28rpx; display:flex; align-items:center; flex-direction:column; gap: 18rpx; }
.alt{ color:#8a8f99; }
.ops{ display:flex; gap: 16rpx; }
.btn{ padding: 14rpx 20rpx; border-radius: 999rpx; font-size: 26rpx; }
.btn.ghost{ background:#fff; border: 1rpx solid #e5e6eb; }
.btn.primary{ background:#e1251b; color:#fff; }
</style>
