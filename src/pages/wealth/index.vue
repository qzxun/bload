<template>
  <view class="page">
    <AppHeader color="red" placeholder="智能闲钱宝" />
    <view style="margin:-24rpx 24rpx 0;">
      <view class="card">
        <view class="grid grid-4">
          <view class="c" v-for="i in topIcons" :key="i.text">
            <image :src="i.icon" class="icon-56" />
            <text>{{ i.text }}</text>
          </view>
        </view>
      </view>

      <view class="h-gap" />

      <view class="card">
        <view class="row" style="gap:20rpx;">
          <text class="title-lg">华兴优选</text>
          <view class="tag">闲钱理财</view>
          <view class="tag">稳健增值</view>
        </view>

        <view class="grid" style="grid-template-columns: repeat(2,1fr); margin-top: 16rpx;">
          <view class="col" v-for="item in rates" :key="item.name">
            <text style="color:#8a8f99">{{ item.name }}</text>
            <view style="margin-top:8rpx"><text class="r">{{ item.value }}</text><text class="u">%</text></view>
            <text class="tag">近一年年化收益率</text>
          </view>
        </view>
      </view>

      <view class="card" style="margin-top:16rpx">
        <view class="row space-between">
          <text class="title-lg">行情</text>
          <text style="color:#8a8f99">上证指数 3960.19  -0.41%</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
const topIcons = [
  {icon:'/static/func/deposit.png', text:'存款'},
  {icon:'/static/func/wealth.png',  text:'理财'},
  {icon:'/static/func/fund.png',    text:'基金'},
  {icon:'/static/func/insurance.png',text:'保险'},
  {icon:'/static/func/big.png',     text:'大额存单'},
  {icon:'/static/func/idle.png',    text:'智能闲钱宝'},
  {icon:'/static/func/gold.png',    text:'黄金'},
  {icon:'/static/func/usd.png',     text:'美元专区'},
  {icon:'/static/func/all.png',     text:'全部'}
]
const rates = [
  { name:'日兴', value:'2.42' }, { name:'周兴', value:'5.51' },
  { name:'月兴', value:'4.05' }, { name:'季兴', value:'9.47' },
  { name:'半年', value:'5.63' }, { name:'年年', value:'4.00' }
]
</script>

<style scoped>
.c{ display:flex; align-items:center; flex-direction:column; gap: 10rpx; font-size: 24rpx; }
.r{ color:#e1251b; font-size: 40rpx; font-weight:700; }
.u{ color:#e1251b; margin-left:4rpx; }
.col{ background:#fff; border-radius: 16rpx; padding: 20rpx; }
</style>
