<template>
  <view class="page">
    <AppHeader color="red" placeholder="智能闲钱宝">
      <template #right>
        <image src="/static/icons/bell.png" style="width:40rpx;height:40rpx" />
      </template>
    </AppHeader>

    <view class="wrap" style="margin: -24rpx 24rpx 0;">
      <view class="card banner">
        <image src="/static/images/home_top_bg.jpg" mode="widthFix" style="width:100%" />
      </view>

      <view class="h-gap" />

      <!-- 顶部功能九宫格 -->
      <view class="card">
        <view class="grid grid-4">
          <view class="c" v-for="i in icons1" :key="i.text" @click="tap(i)">
            <image :src="i.icon" class="icon-72" />
            <text>{{ i.text }}</text>
          </view>
        </view>
      </view>

      <view class="h-gap" />

      <!-- 横版广告条 -->
      <view class="card banner">
        <image src="/static/images/rate_ad.png" mode="widthFix" style="width:100%" />
      </view>

      <view class="h-gap" />

      <!-- 为您推荐：两列卡片 -->
      <view class="card">
        <view class="title-lg">为您推荐</view>
        <view class="grid" style="grid-template-columns:1fr 1fr; margin-top:16rpx;">
          <view class="rec" v-for="p in recList" :key="p.id" @click="go(p)">
            <view class="title">{{ p.title }} <text class="arr">›</text></view>
            <view class="sub tag">{{ p.sub }}</view>
            <view class="rate"><text class="r">{{ p.rate }}</text><text class="u">%</text></view>
            <button class="btn-primary" size="mini">去购买</button>
          </view>
        </view>
      </view>
    </view>

    <view style="height: 24rpx" />
  </view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'

const icons1 = [
  { icon:'/static/func/account.png', text:'账户查询' },
  { icon:'/static/func/detail.png',  text:'明细查询' },
  { icon:'/static/func/transfer.png',text:'转账' },
  { icon:'/static/func/asset.png',   text:'资产总览' },
  { icon:'/static/func/deposit.png', text:'存款' },
  { icon:'/static/func/wealth.png',  text:'理财' },
  { icon:'/static/func/market.png',  text:'转让市场' },
  { icon:'/static/func/fund.png',    text:'基金' },
  { icon:'/static/func/insurance.png',text:'保险' },
  { icon:'/static/func/link.png',    text:'一键多绑' },
  { icon:'/static/func/event.png',   text:'活动中心' },
  { icon:'/static/func/video.png',   text:'视频银行' },
  { icon:'/static/func/vip.png',     text:'贵宾权益' },
  { icon:'/static/func/all.png',     text:'全部' }
]
const recList = [
  { id:1, title:'臻选理财', sub:'1.00元起购 最短持有18…', rate:'3.95' },
  { id:2, title:'热销基金', sub:'近一年收益率', rate:'25.90' }
]
const tap = (i:any)=> uni.showToast({ title: i.text, icon:'none' })
const go  = (p:any)=> uni.showToast({ title: p.title, icon:'none' })
</script>

<style scoped>
.wrap{ }
.c{ display:flex; align-items:center; flex-direction:column; gap: 10rpx; font-size: 24rpx; }
.rec{ background:#fff; border-radius: 16rpx; padding: 20rpx; }
.rec .title{ font-weight:600; margin-bottom: 8rpx; }
.rec .sub{ margin-bottom: 14rpx; display:inline-block; }
.rate{ margin: 8rpx 0 16rpx; }
.r{ color:#e1251b; font-size: 40rpx; font-weight:700; }
.u{ color:#e1251b; margin-left: 4rpx; }
.arr{ color:#c0c4cc; }
</style>
