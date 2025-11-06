<template>
  <view class="page">
    <AppHeader color="red" placeholder="搜索" />
    <view style="margin: -24rpx 24rpx 0;">
      <view class="card banner">
        <image src="/static/images/gift_banner.jpg" mode="widthFix" style="width:100%"/>
      </view>

      <view class="h-gap" />

      <view class="card">
        <view class="grid grid-4">
          <view class="c" v-for="i in giftIcons" :key="i.text">
            <image :src="i.icon" class="icon-72" />
            <text>{{ i.text }}</text>
          </view>
        </view>
      </view>

      <view class="h-gap" />

      <view class="card">
        <view class="title-lg">特惠生活</view>
        <view class="grid" style="grid-template-columns: repeat(3, 1fr); margin-top:16rpx;">
          <view class="goods" v-for="g in goods" :key="g.id">
            <image :src="g.cover" style="width:100%;height:180rpx;border-radius:12rpx" mode="aspectFill" />
            <text style="font-size:24rpx">{{ g.title }}</text>
            <text class="tag">{{ g.points }} 积分</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
const giftIcons = [
  { icon:'/static/gift/jd.png', text:'京东' }, { icon:'/static/gift/milk.png', text:'乳品专区' },
  { icon:'/static/gift/food.png', text:'粮油米面' }, { icon:'/static/gift/wm.png', text:'美团外卖' },
  { icon:'/static/gift/ride.png', text:'滴滴出行' }, { icon:'/static/gift/brand.png', text:'热门品牌' },
  { icon:'/static/gift/coupon.png', text:'卡券兑换' }, { icon:'/static/gift/appliance.png', text:'家用电器' },
  { icon:'/static/gift/all.png', text:'全部' }
]
const goods = [
  { id:1, title:'舒客+防蛀清新牙膏', points:'35000', cover:'/static/images/goods1.jpg' },
  { id:2, title:'清风纸巾', points:'9900', cover:'/static/images/goods2.jpg' },
  { id:3, title:'棉球', points:'9900', cover:'/static/images/goods3.jpg' }
]
</script>

<style scoped>
.c{ display:flex; align-items:center; flex-direction:column; gap: 10rpx; font-size: 24rpx; }
.goods{ display:flex; flex-direction:column; gap: 8rpx; }
</style>
