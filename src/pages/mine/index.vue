<template>
  <view class="page">
    <!-- 顶部头像与问候 -->
    <view class="top card">
      <view class="top-row">
        <image class="avatar" src="/static/mine/avatar.png" mode="aspectFit" />
        <view class="hi">
          <text class="hi-name">**莲女士，下午好！</text>
          <view class="tags">
            <view class="chip gold"><image src="/static/mine/gold.png" class="c-ico" />黄金会员</view>
            <view class="chip blue"><image src="/static/mine/shield.png" class="c-ico" />安全保护中</view>
          </view>
        </view>
        <view class="actions">
          <image class="a" src="/static/mine/arrow.png" mode="aspectFit" />
          <image class="a" src="/static/mine/gear.png" mode="aspectFit" />
          <view class="msg">
            <image class="a" src="/static/mine/msg.png" mode="aspectFit" />
            <view class="badge">99</view>
          </view>
        </view>
      </view>

      <!-- 四个统计 -->
      <view class="stats">
        <view class="s">
          <text class="s-num">1</text>
          <text class="s-lab">银行卡</text>
        </view>
        <view class="s">
          <text class="s-num">0</text>
          <text class="s-lab">优惠券</text>
        </view>
        <view class="s">
          <text class="s-num">7</text>
          <text class="s-lab">权益星</text>
        </view>
        <view class="s">
          <text class="s-num">14.5</text>
          <text class="s-lab">积分(万)</text>
        </view>
      </view>

      <!-- 五宫格快捷 -->
      <view class="qgrid">
        <view class="q" v-for="q in quicks" :key="q.text" @click="toast(q.text)">
          <image :src="q.icon" class="q-ico" />
          <text class="q-t">{{ q.text }}</text>
        </view>
      </view>
    </view>

    <!-- 我的资产 -->
    <view class="card asset">
      <view class="asset-hd">
        <view class="row">
          <text class="asset-title">我的资产</text>
          <image class="eye" :src="eyeOn?'/static/mine/eye_on.png':'/static/mine/eye_off.png'" @click="eyeOn=!eyeOn" />
        </view>
        <view class="row">
          <image class="i" src="/static/mine/info.png" />
          <text class="asset-link">资产说明</text>
        </view>
      </view>

      <view class="asset-body">
        <view class="ab-col">
          <text class="ab-k">总资产（元）</text>
          <text class="ab-v">{{ eyeOn ? '948.93' : '****' }}</text>
        </view>
        <view class="ab-col right">
          <text class="ab-k">昨日收益</text>
          <text class="ab-v">{{ eyeOn ? '0.00' : '**' }}</text>
        </view>
      </view>

      <view class="asset-foot">
        <text class="gray">活期余额</text>
        <text class="gray num">{{ eyeOn ? '948.93' : '****' }}</text>
      </view>
    </view>

    <!-- 本月收支 -->
    <view class="card flow">
      <view class="flow-hd">
        <text class="title">本月收支</text>
        <text class="arr">→</text>
      </view>
      <view class="flow-row">
        <view class="flow-col">
          <text class="f-k">收入</text>
          <text class="f-v">0.00</text>
        </view>
        <view class="flow-col right">
          <text class="f-k">支出</text>
          <text class="f-v">0.00</text>
        </view>
      </view>
      <view class="bar">
        <view class="bar-inner"></view>
      </view>
    </view>

    <!-- 好企贷 IPC -->
    <view class="card promo">
      <view class="p-left">
        <view class="p-title">好企贷IPC</view>
        <view class="p-sub">最高可借500万，好借好还好生意</view>
        <button class="btn primary" @click="toast('立即申请')">立即申请</button>
      </view>
      <image src="/static/mine/pig.png" class="p-img" mode="aspectFit" />
    </view>

    <!-- 行外资产 / 我的网点 -->
    <view class="card list">
      <view class="item" @click="toast('行外资产')">
        <view class="l"><text class="i-title">行外资产</text><image src="/static/mine/info.png" class="i-ico"/></view>
        <text class="i-link">轻松录入行外资产  →</text>
      </view>
      <view class="divider"></view>
      <view class="item" @click="toast('我的网点')">
        <text class="i-title">我的网点</text>
        <text class="i-link">查找更多网点  →</text>
      </view>
    </view>

    <!-- 分行信息 -->
    <view class="card branch">
      <view class="b-title">深圳分行营业部</view>
      <view class="b-addr">深圳市南山区深圳湾创新科技中心1栋…</view>
      <view class="go">
        <image src="/static/mine/nav.png" class="go-ico" />
        <text class="go-t">去这里</text>
      </view>
    </view>

    <!-- 热门活动 / 本地权益 -->
    <view class="card two-cols">
      <view class="col">
        <view class="tc-hd">
          <text class="tc-title">热门活动</text><text class="tc-arr">›</text>
        </view>
        <view class="tc-main">
          <text class="tc-line1">加“薪”攻略，解</text>
          <text class="tc-line2">锁“兴”福利</text>
          <button class="btn primary sm" @click="toast('立即预约')">立即预约</button>
        </view>
      </view>
      <view class="col">
        <view class="tc-hd">
          <text class="tc-title">本地权益</text><text class="tc-arr">›</text>
        </view>
        <view class="tc-main">
          <text class="tc-line1">仅限本地分行个人</text>
          <text class="tc-line2">客户领取</text>
          <view class="ribbon">本分行客户专享</view>
          <button class="btn primary sm" @click="toast('立即查看')">立即查看</button>
        </view>
      </view>
    </view>

    <!-- 更多业务 -->
    <view class="card more">
      <view class="more-hd">
        <text class="title">更多业务</text>
        <text class="arr">→</text>
      </view>
      <view class="more-grid">
        <view class="m" v-for="m in mores" :key="m.text" @click="toast(m.text)">
          <image :src="m.icon" class="m-ico"/>
          <text class="m-t">{{ m.text }}</text>
        </view>
      </view>
    </view>

    <!-- 贵宾权益兑换 -->
    <view class="card vip">
      <view class="vip-hd">
        <text class="v-title">贵宾权益兑换</text>
        <text class="v-arr">›</text>
      </view>
      <text class="v-sub">覆盖出行 康养 生活</text>
      <view class="vip-row">
        <view class="vr">
          <text class="vr-k">权益星</text>
          <text class="vr-v">7</text>
        </view>
        <view class="vr">
          <text class="vr-k">本月日均</text>
          <text class="vr-v">6.95万</text>
        </view>
      </view>
    </view>

    <!-- 关于我们 -->
    <view class="card about" @click="toast('关于我们')">
      <text class="ab-title">关于我们</text>
      <text class="ab-ver">当前版本 V7.0.06 ›</text>
    </view>

    <view style="height:48rpx" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const eyeOn = ref(true)
const toast = (t:string)=>uni.showToast({title:t, icon:'none'})

const quicks = [
  { icon:'/static/mine/bigdep.png', text:'大额存单' },
  { icon:'/static/mine/anxing.png', text:'安兴存' },
  { icon:'/static/mine/xingan.png', text:'兴安宝' },
  { icon:'/static/mine/fastloan.png', text:'华兴快贷' },
  { icon:'/static/mine/all.png', text:'全部' }
]

const mores = [
  { icon:'/static/mine/order.png', text:'商城订单' },
  { icon:'/static/mine/coupon.png', text:'优惠券' },
  { icon:'/static/mine/profile.png', text:'个人信息' },
  { icon:'/static/mine/limit.png', text:'转账限额' },
  { icon:'/static/mine/privacy.png', text:'隐私' },
  { icon:'/static/mine/more.png', text:'更多' }
]
</script>

<style scoped>
:root{
  --text:#1f2329; --sub:#8a8f99; --line:#eef0f3;
  --bg:#f7f8fa; --card:#fff; --shadow:0 4rpx 12rpx rgba(0,0,0,.04);
  --red:#e1251b; --blue:#1f5cd4;
}
.page{ background:var(--bg); min-height:100vh; }

/* 通用卡片 */
.card{ background:var(--card); border-radius:16rpx; padding:20rpx; margin:12rpx 20rpx; box-shadow:var(--shadow); }

/* 顶部区 */
.top{ padding-bottom:14rpx; }
.top-row{ display:flex; align-items:center; }
.avatar{ width:96rpx; height:96rpx; opacity:.3; }
.hi{ margin-left:12rpx; flex:1; }
.hi-name{ font-size:32rpx; font-weight:800; color:var(--text); }
.tags{ margin-top:8rpx; display:flex; gap:10rpx; }
.chip{ display:flex; align-items:center; gap:6rpx; padding:4rpx 10rpx; font-size:22rpx; border-radius:8rpx; }
.chip .c-ico{ width:24rpx; height:24rpx; }
.chip.gold{ background:#fff7e6; color:#b45309; }
.chip.blue{ background:#e6f1ff; color:#1f5cd4; }
.actions{ display:flex; align-items:center; gap:12rpx; margin-left:8rpx; }
.a{ width:36rpx; height:36rpx; }
.msg{ position:relative; }
.badge{ position:absolute; right:-6rpx; top:-6rpx; background:#e11d48; color:#fff; font-size:18rpx; padding:0 6rpx; border-radius:999rpx; }

/* 统计 */
.stats{ display:flex; justify-content:space-between; margin-top:16rpx; }
.s{ align-items:center; text-align:center; flex:1; }
.s-num{ font-size:32rpx; font-weight:800; color:var(--text); }
.s-lab{ display:block; color:#666; font-size:24rpx; margin-top:4rpx; }

/* 五宫格 */
.qgrid{ display:grid; grid-template-columns:repeat(5,1fr); gap:18rpx; margin-top:16rpx;
  background:#fff; border-radius:16rpx; padding-top:16rpx;
}
.q{ display:flex; flex-direction:column; align-items:center; gap:8rpx; }
.q-ico{ width:56rpx; height:56rpx; }
.q-t{ font-size:24rpx; color:#1f2329; }

/* 资产 */
.asset .asset-hd{ display:flex; justify-content:space-between; align-items:center; }
.asset-title{ font-size:30rpx; font-weight:800; }
.eye{ width:36rpx; height:36rpx; margin-left:8rpx; }
.asset-hd .row{ display:flex; align-items:center; gap:6rpx; }
.asset-hd .i{ width:26rpx; height:26rpx; }
.asset-link{ color:#6b7280; font-size:24rpx; }

.asset-body{ display:flex; justify-content:space-between; margin-top:14rpx; }
.ab-k{ color:#6b7280; font-size:24rpx; }
.ab-v{ display:block; margin-top:8rpx; font-size:48rpx; font-weight:800; color:#111827; }
.ab-col.right{ text-align:right; }
.asset-foot{ margin-top:16rpx; display:flex; gap:12rpx; }
.gray{ color:#6b7280; font-size:24rpx; }
.gray.num{ font-weight:700; color:#111827; }

/* 收支 */
.flow .title{ font-size:30rpx; font-weight:800; }
.flow .arr{ margin-left:auto; color:#c0c4cc; }
.flow-hd{ display:flex; align-items:center; }
.flow-row{ display:flex; margin-top:12rpx; }
.flow-col{ flex:1; }
.flow-col.right{ text-align:right; }
.f-k{ color:#6b7280; font-size:24rpx; }
.f-v{ display:block; font-size:36rpx; font-weight:800; color:#111827; margin-top:6rpx; }
.bar{ height:12rpx; background:#f2e6e4; border-radius:999rpx; overflow:hidden; margin-top:16rpx; }
.bar-inner{ width:40%; height:100%; background: linear-gradient(90deg,#f59e0b,#ef4444); }

/* IPC */
.promo{ display:flex; align-items:center; justify-content:space-between; }
.p-left .p-title{ font-size:30rpx; font-weight:800; }
.p-left .p-sub{ color:#6b7280; font-size:24rpx; margin:8rpx 0 12rpx; }
.btn.primary{ background:var(--red); color:#fff; border-radius:999rpx; padding:14rpx 26rpx; }
.p-img{ width:140rpx; height:110rpx; opacity:.9; }

/* 行外资产 / 网点 */
.list .item{ display:flex; align-items:center; justify-content:space-between; padding:6rpx 0; }
.l{ display:flex; align-items:center; gap:6rpx; }
.i-title{ font-size:30rpx; font-weight:800; }
.i-ico{ width:26rpx; height:26rpx; }
.i-link{ color:var(--blue); font-size:26rpx; }
.divider{ height:1rpx; background:var(--line); margin:12rpx 0; }

/* 分行 */
.branch{ position:relative; padding-right:96rpx; }
.b-title{ font-size:30rpx; font-weight:800; }
.b-addr{ color:#6b7280; font-size:24rpx; margin-top:6rpx; }
.go{ position:absolute; right:20rpx; bottom:20rpx; display:flex; align-items:center; gap:6rpx; color:var(--blue); }
.go-ico{ width:28rpx; height:28rpx; }

/* 两列卡片 */
.two-cols{ display:grid; grid-template-columns:1fr 1fr; gap:12rpx; }
.col{ border:1rpx solid var(--line); border-radius:16rpx; padding:14rpx; }
.tc-hd{ display:flex; justify-content:space-between; align-items:center; }
.tc-title{ font-size:28rpx; font-weight:800; }
.tc-arr{ color:#c0c4cc; }
.tc-main{ margin-top:10rpx; }
.tc-line1,.tc-line2{ display:block; font-size:26rpx; color:#1f2329; }
.ribbon{ display:inline-block; margin:8rpx 0; font-size:20rpx; color:#e11d48; background:#ffe6ea; padding:4rpx 10rpx; border-radius:8rpx; }
.btn.sm{ padding:12rpx 20rpx; font-size:24rpx; }

/* 更多业务 */
.more-hd{ display:flex; align-items:center; }
.more .title{ font-size:30rpx; font-weight:800; }
.more .arr{ margin-left:auto; color:#c0c4cc; }
.more-grid{ display:grid; grid-template-columns: repeat(6,1fr); gap:16rpx; margin-top:16rpx; }
.m{ display:flex; flex-direction:column; align-items:center; gap:8rpx; }
.m-ico{ width:56rpx; height:56rpx; }
.m-t{ font-size:24rpx; }

/* VIP */
.vip-hd{ display:flex; align-items:center; }
.v-title{ font-size:30rpx; font-weight:800; }
.v-arr{ margin-left:auto; color:#c0c4cc; }
.v-sub{ display:block; color:#6b7280; font-size:24rpx; margin-top:6rpx; }
.vip-row{ display:flex; gap:24rpx; margin-top:12rpx; }
.vr-k{ color:#6b7280; font-size:24rpx; }
.vr-v{ display:block; color:#111827; font-weight:800; font-size:28rpx; }

/* 关于我们 */
.about{ display:flex; align-items:center; justify-content:space-between; }
.ab-title{ font-size:30rpx; font-weight:800; }
.ab-ver{ color:#6b7280; font-size:24rpx; }
</style>
