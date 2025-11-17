<template>
  <view class="page">
    <!-- 顶部搜索 + 功能图标 -->
    <view class="top">
      <view class="search" @click="tap('搜索')">
        <image src="/static/liyu/ic_search_new.png" class="t-i" mode="aspectFit" />
        <text class="s-ph">搜索</text>
      </view>
      <view class="t-icons">
        <image src="/static/liyu/cart.png" class="t-i" mode="aspectFit" />
        <image src="/static/liyu/wallet.png" class="t-i" mode="aspectFit" />
        <image src="/static/liyu/user.png" class="t-i" mode="aspectFit" />
      </view>
    </view>

    <!-- 顶部 banner（可一张或轮播） -->
    <view class="banner">
      <swiper class="swiper" indicator-dots autoplay circular interval="3000" duration="500">
        <swiper-item v-for="(b,i) in banners" :key="i">
          <image :src="b.src" class="banner-img" mode="aspectFill" @click="tap(b.title)" />
        </swiper-item>
      </swiper>
    </view>

    <!-- 10 宫格功能入口 -->
    <view class="card navs">
      <view class="grid grid-5">
        <view class="gitem" v-for="f in features" :key="f.text" @click="tap(f.text)">
          <image :src="f.icon" class="gicon" />
          <text class="gtext">{{ f.text }}</text>
        </view>
      </view>
    </view>

    <!-- 特惠生活 -->
    <!-- <view class="card">
      <view class="sec-head">
        <text class="sec-title">特惠生活</text>
        <text class="sec-arrow">→</text>
      </view> -->
	 <view class="home1">
		  <image src="/static/liyu/tehui.jpeg" mode="widthFix"></image>
		  <image src="/static/liyu/goods1.jpeg"  mode="widthFix"></image>
		  <image src="/static/images/goods2.jpeg"  mode="widthFix"></image>
	  </view>
      <!-- 我的积分卡片 + 横滑商品 -->
      <!-- <view class="points-card">
        <view class="p-title">我的积分 *****</view>
        <scroll-view scroll-x class="p-scroll">
          <view class="p-item" v-for="(p,i) in pointsGoods" :key="i" @click="tap(p.title)">
            <image :src="p.img" class="p-img" mode="aspectFit" />
            <text class="p-name line2">{{ p.title }}</text>
            <text class="p-score">{{ p.score }}积分</text>
          </view>
        </scroll-view>
      </view>
    </view> -->

    <!-- 今日爆款 / 最低折扣 / 惊喜专区 Tab + 商品瀑布（两列栅格） -->
    <!-- <view class="card">
      <view class="tabs">
        <text
          v-for="t in tabs"
          :key="t"
          :class="['tab', activeTab===t && 'active']"
          @click="activeTab=t"
        >{{ t }}</text>
      </view>

      <view class="goods-grid">
        <view class="good" v-for="(g,i) in goods[activeTab]" :key="i" @click="tap(g.title)">
          <image :src="g.img" class="g-img" mode="aspectFit" />
          <text class="g-name line2">{{ g.title }}</text>
          <text class="g-score">{{ g.score }}积分</text>
        </view>
      </view>
    </view> -->

    <view style="height: 48rpx" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tap = (msg:string) => uni.showToast({ title: msg, icon: 'none' })

// 顶部 banner（可用单张，也可多张轮播）
const banners = [
  { src: '/static/liyu/banner_1.jpg', title: '摩飞专场' },
  { src: '/static/liyu/banner_2.jpg', title: '家电专场' }
]

// 10 宫格功能
const features = [
  { icon:'/static/liyu/jd.png',        text:'京东' },
  { icon:'/static/liyu/milk.png',      text:'乳品专区' },
  { icon:'/static/liyu/grain.png',     text:'粮油米面' },
  { icon:'/static/liyu/waimai.png',    text:'美团外卖' },
  { icon:'/static/liyu/didi.png',      text:'滴滴出行' },
  { icon:'/static/liyu/pick.png',      text:'华兴精选' },
  { icon:'/static/liyu/hotbrand.png',  text:'热门品牌' },
  { icon:'/static/liyu/coupon.png',    text:'卡券兑换' },
  { icon:'/static/liyu/appliance.png', text:'家用电器' },
  { icon:'/static/liyu/all.png',       text:'全部' }
]

// 我的积分横滑三卡
const pointsGoods = [
  { img:'/static/liyu/p1.png', title:'舒客+ 防蛀清新牙膏套装', score:35000 },
  { img:'/static/liyu/p2.png', title:'清风 AR33LS 抽纸 18包', score:9900 },
  { img:'/static/liyu/p3.png', title:'茶花 优致棉球 200支', score:9900 }
]

// Tabs + 商品数据（示例 8 个）
const tabs = ['今日爆款', '最低折扣', '惊喜专区']
const goods = {
  '今日爆款': [
    { img:'/static/liyu/g1.png', title:'十月稻田 五常大米 5kg', score:143000 },
    { img:'/static/liyu/g2.png', title:'十月稻田 五常大米 礼盒', score:134000 },
    { img:'/static/liyu/g3.png', title:'十月稻田 东北大米 5kg', score:82000 },
    { img:'/static/liyu/g4.png', title:'金龙鱼 鲜萃稻米油 5L', score:161000 },
    { img:'/static/liyu/g5.png', title:'金龙鱼 至尊礼遇稻米油 5L（香）', score:125000 },
    { img:'/static/liyu/g6.png', title:'金龙鱼 至尊礼遇稻米油 5L（原）', score:125000 }
  ],
  '最低折扣': [
    { img:'/static/liyu/g2.png', title:'五常大米 礼盒', score:120000 },
    { img:'/static/liyu/g1.png', title:'五常大米 5kg', score:110000 },
    { img:'/static/liyu/g4.png', title:'稻米油 5L', score:150000 },
    { img:'/static/liyu/g3.png', title:'东北大米 5kg', score:78000 }
  ],
  '惊喜专区': [
    { img:'/static/liyu/g5.png', title:'至尊礼遇 稻米油（香）', score:125000 },
    { img:'/static/liyu/g6.png', title:'至尊礼遇 稻米油（原）', score:125000 },
    { img:'/static/liyu/g1.png', title:'五常大米 5kg', score:143000 },
    { img:'/static/liyu/g3.png', title:'东北大米 5kg', score:82000 }
  ]
} as Record<string, Array<{img:string,title:string,score:number}>>

const activeTab = ref<'今日爆款'|'最低折扣'|'惊喜专区'>('今日爆款')
</script>

<style scoped>
.page { background:#f7f8fa; min-height:100vh; }

/* 顶部搜索区 */
.top { display:flex; align-items:center; padding: 16rpx 20rpx 8rpx; gap: 16rpx; 
	position:relative;
	z-index: 999;
}
.search{
flex: 4;
    height: 2rem;
    border-radius: 31.21875rem;
    background: inherit;
    display: flex;
    align-items: center;
    padding: 0 0.625rem;
    gap: 0.3125rem;
    border: 0.5px solid white;
	  
}
.s-icon{ font-size: 18rpx; color:white; }

.s-ph{ color:white; font-size: 26rpx; }
.t-icons{ display:flex; gap: 14rpx; flex:2;justify-content: space-around;}
.t-i{ width: 40rpx; height: 40rpx; }

/* 卡片容器通用 */
.card{ background:#fff; border-radius: 16rpx; padding: 20rpx; margin: 12rpx 20rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,.04); }

/* Banner / Swiper */
.swiper{ width:100%; height: 480rpx; border-radius: 0rpx; overflow: hidden; }
.banner-img{ width:100%; height:100%; }
.banner{
	    border-radius: 0;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    width: 100%;
}
/* 宫格 */
.grid{ display:grid; gap: 20rpx; }
.grid-5{ grid-template-columns: repeat(5,1fr); }
.gitem{ display:flex; align-items:center; flex-direction:column; gap: 8rpx;margin-top: 40rpx; }
.gicon{ width: 72rpx; height: 72rpx; }
.gtext{ font-size: 24rpx; color:#1f2329; }

/* 特惠生活 */
.sec-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom: 12rpx; }
.sec-title{ font-weight: 700; font-size: 30rpx; }
.sec-arrow{ color:#c0c4cc; }

.points-card{
  background: #fff; border-radius: 12rpx; padding: 16rpx; border: 1rpx solid #f0f2f5;
}
.p-title{ font-size: 26rpx; font-weight: 600; margin-bottom: 12rpx; }
.p-scroll{ white-space: nowrap; }
.p-item{
  display:inline-flex; flex-direction:column; width: 200rpx; margin-right: 16rpx;
}
.p-img{ width: 200rpx; height: 160rpx; border-radius: 12rpx; background:#fafafa; }
.p-name{ margin-top: 8rpx; font-size: 24rpx; }
.p-score{ margin-top: 4rpx; color:#8a8f99; font-size: 22rpx; }

/* Tabs + 商品网格 */
.tabs{ display:flex; gap: 24rpx; padding: 6rpx 0 12rpx; }
.tab{ font-size: 28rpx; color:#6b7280; }
.tab.active{ color:#111827; font-weight: 700; position: relative; }
.tab.active::after{
  content:''; position:absolute; left:0; right:0; bottom:-8rpx; margin:auto;
  width: 60rpx; height: 6rpx; background:#111827; border-radius: 3rpx;
}

.goods-grid{ display:grid; grid-template-columns: repeat(2, 1fr); gap: 14rpx; }
.good{ background:#fff; border: 1rpx solid #f0f2f5; border-radius: 14rpx; padding: 16rpx; }
.g-img{ width: 100%; height: 220rpx; border-radius: 12rpx; background:#fafafa; }
.g-name{ margin-top: 10rpx; font-size: 26rpx; }
.g-score{ margin-top: 6rpx; color:#8a8f99; font-size: 22rpx; }

/* 两行省略 */
.line2{
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;
  overflow:hidden; text-overflow:ellipsis;
}
.navs {
	position:relative;
	top:320rpx;
	z-index: 99;
}
.home1 {
	width: 100%; /* 或者使用百分比等 */
	height: auto; /* 或者根据需要设置为固定值 */
	    background-color: #F8F8F8;
		
	position: relative;
	top: 340rpx;
}
.home image {
	width:100%;
}
.home1 uni-image {
	width:100% !important;
	display: block !important; 
}
.home2 image {
	width:100%;
	height:auto;
}
.home3 image {
	width:100%;
	height:auto;
}
</style>
