<template>
  <view class="page">
    <!-- 顶部导航 -->
    <view class="nav">
      <text class="nav-back" @click="goBack">‹</text>
      <view class="nav-title-box">
        <text class="nav-title">{{ loanTitle }}</text>
        <text class="nav-sub fontdefault">{{ loanNo }}</text>
      </view>
      <text class="nav-holder"></text>
    </view>

    <!-- 总金额 + 本金利息汇总 -->
    <view class="summary">
      <view class="sum-title">总金额</view>
      <view class="sum-amount fontdigit">
        <text class="yen"></text>
        <text class="sum-num fontdigit">¥{{ fmt(totalAmount) }}</text>
      </view>
      <view class="sum-row">
        <view class="sum-col">
          <text class="sum-col-num fontdigit">{{ fmt(totalPrincipal) }}</text>
          <text class="sum-col-label">本金</text>
        </view>
        <view class="sum-col">
          <text class="sum-col-num fontdigit">{{ fmt(totalInterest) }}</text>
          <text class="sum-col-label">利息</text>
        </view>
      </view>
    </view>

    <!-- 还款计划列表 -->
    <scroll-view scroll-y class="list">
      <view
        v-for="item in plans"
        :key="item.period"
        class="plan-card"
      >
        <!-- 金额 + 状态 -->
        <view class="plan-row1">
          <text class="plan-amount fontdigit">¥{{ fmt(item.amount) }}</text>
          <view class="status-tag" v-if="item.status === 'PAID'">已还款</view>
        </view>

        <!-- 本金 / 利息 -->
        <view class="plan-row2" style="display: flex;flex-direction: row;">
			<view style="flex:1;">
				<text class="label">本金：</text>
				<text class="value fontmdefault">{{ fmt(item.principal) }}</text>
			</view>
         <view  style="flex:1;">
			 <text class="label">利息：</text>
			 <text class="value fontmdefault">{{ fmt(item.interest) }}</text>
		 </view>
         
        </view>

        <!-- 应还日期 + 期次 -->
        <view class="plan-row3">
          <view class="row3-left">
            <text class="label">应还日期：</text>
            <text class="value ">{{ item.dueDate }}</text>
          </view>
          <view class="period-tag ">
            {{ item.period }}/{{ totalPeriods }}期
          </view>
        </view>
      </view>

      <view style="height:120rpx;"></view>
    </scroll-view>

    <!-- 底部：还款计划 / 还款记录 -->
    <view class="bottom-tabs">
      <view class="b-tab b-tab-active">
        <view class="b-icon b-icon-yuan">¥</view>
        <text class="b-text b-text-active">还款计划</text>
      </view>
      <view class="b-tab">
        <view class="b-icon b-icon-record">↻</view>
        <text class="b-text">还款记录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type PlanStatus = 'PAID' | 'UNPAID'

interface PlanItem {
  period: number
  amount: number
  principal: number
  interest: number
  dueDate: string
  status: PlanStatus
}

const loanTitle = ref('华兴快贷（住宅）经营')
const loanNo = ref('50230512000056001')

const totalAmount = ref(3400500.00)
const totalPrincipal = ref(3500000.00)
const totalInterest = ref(624917.76)
const totalPeriods = ref(36)

/** 严格按照截图里的样例数据（前几期） */
const plans = ref<PlanItem[]>([
  {
    period: 1,
    amount: 12619.44,
    principal: 0.0,
    interest: 12619.44,
    dueDate: '2023-06-21',
    status: 'PAID'
  },
  {
    period: 2,
    amount: 17208.33,
    principal: 0.0,
    interest: 17208.33,
    dueDate: '2023-07-21',
    status: 'PAID'
  },
  {
    period: 3,
    amount: 17781.94,
    principal: 0.0,
    interest: 17781.94,
    dueDate: '2023-08-21',
    status: 'PAID'
  },
  {
    period: 4,
    amount: 17781.94,
    principal: 0.0,
    interest: 17781.94,
    dueDate: '2023-09-21',
    status: 'PAID'
  }
])

function fmt(n: number) {
  return (n || 0).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

function goBack() {
  uni.navigateBack({
    fail() {
      uni.switchTab({ url: '/pages/loan/index' })
    }
  })
}

// onLoad(() => {
//   // 这里以后可以接收 loanId 等参数
// })
</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: #f5f5f7;
  display: flex;
  flex-direction: column;
  font-family: 'default';
}

/* 顶部导航条 */
.nav {
  height: 92rpx;
  padding: 0 20rpx;
  background-color: white;
  flex-direction: row;
  align-items: center;
  display: flex;
}
.nav-back {
  width: 80rpx;
  font-size: 44rpx;
  color: #ffffff;
}
.nav-title-box {
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.nav-title {
  font-size: 30rpx;
  color: inherit;
}
.nav-sub {
  margin-top: 4rpx;
  font-size:  0.7875rem;
  color: #c0c0c0;
}
.nav-holder {
  width: 80rpx;
}

/* 汇总区域 */
.summary {
  background-color: #ffffff;
  padding: 26rpx 20rpx 18rpx;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.sum-title {
  font-size: 24rpx;
  color: #666666;
}
.sum-amount {
  margin-top: 0rpx;
  flex-direction: row;
  display: flex;
  align-items: baseline;
}
.yen {
  font-size: 30rpx;
  color: #111111;
}
.sum-num {
  font-size: 44rpx;
  font-weight: 700;
  color: #111111;
  margin-left: 4rpx;
}
.sum-row {
  margin-top: 18rpx;
  flex-direction: row;
  display: flex;
  width: 100%;
  justify-content: center;
}
.sum-col {
  flex: 1;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.sum-col-num {
  font-size: 30rpx;
  color: #111111;
  font-weight: 600;
}
.sum-col-label {
  margin-top: 4rpx;
  font-size: 22rpx;
  color: #999999;
}

/* 列表 */
.list {
  flex: 1;
  /* padding-top: 10rpx; */
}

/* 单条计划卡片 */
.plan-card {
background-color: #ffffff;
    margin: 0;
    padding: 0.725rem 0.725rem 0.6375rem;
    border-top: 0.03125rem solid #f0f0f0;
    margin-top: 0.95rem;
}
.plan-row1 {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.plan-amount {
  font-size: 30rpx;
  color: #111111;
  font-weight: 600;
}
.status-tag {
  padding: 6rpx 16rpx;
  border-radius: 6rpx;
  background-color: #f7f7f7;
  font-size: 22rpx;
  color: #999999;
}
.plan-row2 {
  margin-top: 12rpx;
  flex-direction: row;
  display: flex;
  align-items: center;
}
.label {
  font-size: 24rpx;
  color: #b0b0b0;
}
.value {
  font-size: 24rpx;
  color: #b0b0b0;
}
.space {
  width: 40rpx;
}
.plan-row3 {
  margin-top: 8rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.row3-left {
  flex-direction: row;
  display: flex;
  align-items: center;
}
.period-tag {
  padding: 6rpx 18rpx;
  border-radius: 50rpx;
  background-color: #b0b0b059;
  color: #111111;
  font-size: 22rpx;
}

/* 底部 tabs */
.bottom-tabs {
  height: 96rpx;
  background-color: #ffffff;
  border-top: 1px solid #eeeeee;
  flex-direction: row;
  display: flex;
}
.b-tab {
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.b-icon {
  width: 40rpx;
  height: 40rpx;
  border-radius: 20rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 26rpx;
}
.b-icon-yuan {
  background-color: #000000;
  color: #ffffff;
}
.b-icon-record {
  border-width: 2rpx;
  border-style: solid;
  border-color: #999999;
  color: #999999;
}
.b-text {
  margin-top: 2rpx;
  font-size: 24rpx;
  color: #999999;
}
.b-text-active {
  color: #111111;
  font-weight: 600;
}
.b-tab-active .b-icon-yuan {
  background-color: #000000;
}
.defualt {
	 font-family: 'default' !important;
	 letter-spacing: 0.03925rem;
}
.nav-title{
	font-size:1.175rem;
}
.sum-title {
    font-size: 0.8875rem ;
}
.sum-num {
    font-size: 1.675rem;
   font-weight: inherit;
    color: #111111;
    margin-left: 0.125rem;
}

.sum-row  {
      margin-top: 1.625rem;
      flex-direction: row;
      display: flex;
      width: 100%;
      justify-content: center;
      margin-bottom: 0.9625rem;
}
.sum-col-num  {
    font-size: 1.3rem;
    color: #111111;
    font-weight: inherit;
}
.sum-col-label  {
    margin-top: 0.125rem;
    font-size: 0.8875rem;
    color: #999999;
}
.plan-amount {
    font-size: 1.3rem;
    color: #111111;
    font-weight: inherit;
}

.status-tag {
    padding: 0.1875rem 0.5rem;
    border-radius: 0.1875rem;
    background-color: #f7f7f7;
    font-size: 0.8875rem;
    color: #999999;
}

.plan-row1  {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.9625rem;
}

.value {
    font-size: 0.9575rem;
    color: #b0b0b0;
}
.label  {
    font-size: 0.8875rem;
    color: #b0b0b0;
}
.period-tag {
    padding: 0.1875rem 0.5625rem;
    border-radius: 1.5625rem;
    background-color: #b0b0b059;
    color: #111111;
    font-size: 0.7875rem;
}
.fontmdefault {
	font-family: 'fontmdigit' !important;
}
@font-face {
  font-family: 'fontmdigit';
  src: url('@/static/fonts/HarmonyOS_Sans_TC_Regular.ttf');
}

</style>
