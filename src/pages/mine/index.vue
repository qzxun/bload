<template>
  <view class="page">
    <AppHeader color="red" placeholder="我的" />
    <view style="margin:-24rpx 24rpx 0;">
      <view class="card">
        <view class="row space-between">
          <view>
            <text style="font-weight:700">**莲女士，下午好！</text>
            <view class="row" style="gap:10rpx;margin-top:8rpx;">
              <view class="tag">黄金会员</view>
              <view class="tag">安全保护中</view>
            </view>
          </view>
          <image src="/static/icons/setting.png" style="width:44rpx;height:44rpx" />
        </view>

        <view style="margin-top:20rpx" class="row space-between">
          <view class="cell"><text class="num">1</text><text class="lab">银行卡</text></view>
          <view class="cell"><text class="num">0</text><text class="lab">优惠券</text></view>
          <view class="cell"><text class="num">7</text><text class="lab">权益星</text></view>
          <view class="cell"><text class="num">14.5</text><text class="lab">积分(万)</text></view>
        </view>
      </view>

      <view class="h-gap" />

      <view class="card">
        <text class="title-lg">我的资产</text>
        <view style="margin-top:12rpx">
          <text>总资产（元）</text>
          <view style="margin-top:6rpx"><text style="font-size:44rpx;font-weight:700">948.93</text></view>
        </view>
      </view>

      <view class="h-gap" />

      <view class="card">
        <view class="grid grid-4">
          <view class="c" v-for="i in mineIcons" :key="i.text">
            <image :src="i.icon" class="icon-56" />
            <text>{{ i.text }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { onShow } from '@dcloudio/uni-app'
import { isGestureSet, isAuthedNow } from '@/utils/auth'


const mineIcons = [
  {icon:'/static/func/bigdep.png', text:'大额存单'},
  {icon:'/static/func/easydep.png', text:'安兴存'},
  {icon:'/static/func/treasure.png', text:'兴安宝'},
  {icon:'/static/loan/hxloan.png',  text:'华兴快贷'},
  {icon:'/static/func/all.png',     text:'全部'}
]

onShow(() => {
  // 仅在进入“我的”页时检查
  if (!isGestureSet()) {
    // 未设置过手势：跳去设置页，设置成功再回我的
    uni.navigateTo({ url: `/pages/lock/index?mode=set&redirect=${encodeURIComponent('/pages/mine/index')}` })
    return
  }
  if (!isAuthedNow()) {
    // 已设置手势但已过期：去验证
    uni.navigateTo({ url: `/pages/lock/index?mode=verify&redirect=${encodeURIComponent('/pages/mine/index')}` })
    return
  }
  // 已认证且在有效期：正常展示“我的”页内容
})

</script>

<style scoped>
.cell{ display:flex; flex-direction:column; align-items:center; }
.num{ font-size: 36rpx; font-weight: 700; }
.lab{ color:#8a8f99; font-size: 24rpx; }
.c{ display:flex; align-items:center; flex-direction:column; gap: 10rpx; font-size: 24rpx; }
</style>
