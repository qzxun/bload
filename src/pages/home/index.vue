<template>
  <view class="page">
    <!-- 顶部：蓝色渐变 + 搜索与快捷图标 -->
    <view class="hero">
      <view class="status"  />
      <view class="topbar">
        <view class="badge">个人版 <image class="i" src="/static/icons/convert.png" mode="aspectFit"/></view>
        <view class="search" @click="tap('搜索')">
          <text class="icon">🔍</text>
          <text class="ph">智能闲钱宝</text>
        </view>
        <view class="icons">
          <image class="i" src="/static/icons/bell.png" mode="aspectFit"/>
          <image class="i" src="/static/icons/msg.png"  mode="aspectFit"/>
          <image class="i" src="/static/icons/add.png"  mode="aspectFit"/>
        </view>
      </view>

      <!-- 四个横向快捷入口 -->
      <view class="quick">
        <view class="qitem" v-for="q in quicks" :key="q.text" @click="tap(q.text)">
          <image :src="q.icon" class="qicon"/>
          <text class="qtext">{{ q.text }}</text>
        </view>
      </view>

      <!-- 顶部宣传语 + 按钮 -->
      <view class="slogan">
       <!-- <text class="line1">市场波动加剧，</text>
        <text class="line2">投资者该如何应对？</text>
        <button class="btn white" size="mini">查收配置策略</button> -->
      </view>
    </view>
	
	<view class="navs card">
	  <view class="grid grid-5">
	    <view class="gitem" v-for="f in features" :key="f.text" @click="tap(f.text)">
	      <image :src="f.icon" class="gicon"/>
	      <text class="gtext">{{ f.text }}</text>
	    </view>
	  </view>
	</view>
	
    <view class="wrap">
      <!-- 功能宫格 -->
     

      <!-- 轮播图（替换原固定图片） -->
      <view class="banner card">
        <swiper class="swiper" indicator-dots autoplay circular interval="3000" duration="500">
          <swiper-item v-for="(item, i) in banners" :key="i">
            <image :src="item.src" mode="widthFix" class="banner-img" @click="tap(item.title)" />
          </swiper-item>
        </swiper>
      </view>
</view>
      <!-- 为您推荐 -->
	  <view class="home1">
		  <image src="/static/images/home1.jpeg" mode="widthFix"></image>
		  <image src="/static/images/home2.jpeg"  mode="widthFix"></image>
		  <image src="/static/images/home3.jpeg"  mode="widthFix"></image>
	  </view>
      <!-- <view class="card tuijian">
        <view class="section-title">为您推荐</view>
        <view class="rec-grid">
          <view class="rec big" @click="tap('臻选理财')">
            <view class="r-title">臻选理财</view>
			<view class="r-sub">民生理财贵竹固...</view>
            <view class="r-ssub">
				<view class="ssubtip">1.00元起购</view>
				<view class="ssubtip">最短持有182天</view>
			</view>
            <view class="r-rate"><text class="val">4.55</text><text class="unit">%</text></view>
            <view class="r-sub">自产品成立以来...</view>
			<button class="btn primary buybtn" size="mini">去购买</button>
          </view>
		  <view class="rec-right">
			  <view class="rec small" v-for="s in recSmall" :key="s.title" @click="tap(s.title)">
			    <view class="sr-top row ">
			      <text class="sr-title">{{ s.title }}</text>
			      <text class="arrow">›</text>
			    </view>
				<view class="sr-stitle">{{ s.stitle }}</view>
			    <text class="sr-sub">{{ s.sub }}</text>
			  </view>
		  </view>
          
        </view>
      </view> -->

      <!-- 特色专区 -->
     <!-- <view class="card">
        <view class="section-title">特色专区</view>
        <view class="zone-grid">
          <view class="zone" v-for="z in zones" :key="z.title" @click="tap(z.title)">
            <image :src="z.icon" class="zicon"/>
            <view class="z-meta">
              <text class="z-title">{{ z.title }}</text>
              <text class="z-sub">{{ z.sub }}</text>
            </view>
          </view>
        </view>
      </view> -->

      <!-- 企业服务 -->
     <!-- <view class="card">
        <view class="section-title">企业服务</view>
        <scroll-view scroll-x class="hlist">
          <view class="hitem" v-for="e in enterprise" :key="e.title" @click="tap(e.title)">
            <text class="h-title">{{ e.title }}</text>
            <text class="h-sub">{{ e.sub }}</text>
          </view>
        </scroll-view>
      </view> -->

      <!-- 百宝箱 -->
      <!-- <view class="card">
        <view class="section-title">百宝箱</view>
        <view class="grid grid-4">
          <view class="tool" v-for="t in toolbox" :key="t.text" @click="tap(t.text)">
            <image :src="t.icon" class="ticon"/>
            <text class="ttext">{{ t.text }}</text>
          </view>
        </view>
      </view> -->

      <!-- 今日资讯 -->
      <!-- <view class="card">
        <view class="section-title">今日资讯</view>
        <view class="news" v-for="n in news" :key="n.id" @click="tap(n.title)">
          <text class="n-title">{{ n.title }}</text>
          <view class="n-meta">{{ n.time }} · {{ n.src }}</view>
        </view>
      </view> -->

      <!-- 遇见问题 -->
      <!-- <view class="card">
        <view class="section-title">遇见问题</view>
        <view class="faq-grid">
          <view class="faq" v-for="f in faqs" :key="f" @click="tap(f)">{{ f }}</view>
        </view>
      </view> -->

      <!-- 底部广告条 -->
     <!-- <view class="footer-ad">
        <image src="/static/images/ad_footer.png" mode="widthFix"/>
      </view> -->

      <view style="height: 40rpx"/>
    
  </view>
</template>

<script setup lang="ts">
const tap = (msg:string)=> uni.showToast({ title: msg, icon: 'none' })

const quicks = [
  { icon:'/static/quick/account.png', text:'账户查询' },
  { icon:'/static/quick/detail.png',  text:'明细查询' },
  { icon:'/static/quick/transfer.png',text:'转账' },
  { icon:'/static/quick/asset.png',   text:'资产总览' }
]

const features = [
  { icon:'/static/func/deposit.png', text:'存款' },
  { icon:'/static/func/wealth.png',  text:'理财' },
  { icon:'/static/func/market.png',  text:'转让市场' },
  { icon:'/static/func/fund.png',    text:'基金' },
  { icon:'/static/func/insurance.png', text:'保险' },
  { icon:'/static/func/link.png',    text:'一键多绑' },
  { icon:'/static/func/events.png',  text:'活动中心' },
  { icon:'/static/func/video.png',   text:'视频银行' },
  { icon:'/static/func/vip.png',     text:'贵宾权益' },
  { icon:'/static/func/all.png',     text:'全部' }
]

// 新增：轮播数据
const banners = [
  // { src: '/static/images/ad_usd_deposit.png', title: '美元存款活动' },
  { src: '/static/images/ad_fund.png',        title: '热销基金推荐' },
  { src: '/static/images/ad_loan.png',        title: '贷款优惠专享' }
]

const recSmall = [
  { title:'热销基金',stitle:'易方达纳斯达克1...', sub:'近一年收益率 23.8%...' },
  { title:'华兴快贷',stitle:'—秒审批 当天放款', sub:'最高可贷2500万' }
]

const zones = [
  { icon:'/static/zones/recommend.png', title:'推荐专区',   sub:'邂逅 有礼' },
  { icon:'/static/zones/family.png',    title:'亲子专区',   sub:'亲子乐园陪你购' },
  { icon:'/static/zones/benefit.png',   title:'普惠小微区', sub:'助小微，惠经营' }
]

const enterprise = [
  { title:'代发工资',   sub:'从“薪”出发，便捷高效' },
  { title:'兴票通',     sub:'无感贴现，轻松融资' },
  { title:'跨境电商结算', sub:'合规收款，E通全球' },
  { title:'减费让利',   sub:'减费惠企，稳商助力' }
]

const toolbox = [
  { icon:'/static/tools/house.png',    text:'房产评估' },
  { icon:'/static/tools/security.png', text:'安全中心' },
  { icon:'/static/tools/net.png',      text:'网点查询' },
  { icon:'/static/tools/calendar.png', text:'金融日历' }
]

const news = [
  { id:1, title:'险资系私募，又有新进展', time:'11-06', src:'恒润博X24快讯' },
  { id:2, title:'新联电子：理财收益/交易性金融资产公允价值变动', time:'11-06', src:'同花顺News' },
  { id:3, title:'银行间美元人民币资金面情绪指数', time:'11-06', src:'CFETSFX' }
]

const faqs = ['小米卡','投诉指南','消费金融客服']
</script>

<style scoped>
.page{ background:white; min-height:100vh; }
.status{ 
	height: var(--status-bar-height);
 }
.hero{
  background: url(/static/images/bgtop.jpeg);
  padding-bottom: 0.75rem;
  color: #fff;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-bottom: 24rpx; color:#fff;
  height:280px;
}
.topbar{ display:flex; align-items:center; gap:16rpx; padding: 32rpx 20rpx; }
.badge{ 
	padding: 0.25rem 0.4375rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
}
.badge .i {
	width:1.1rem;
	height:1.1rem;
}
.tuijian {
	margin-top:16rpx;
}
.tuijian .card {
	 box-shadow: 0 4rpx 12rpx rgba(0,0,0,.04);
}
.search{ flex:1; height: 64rpx; background: rgba(255,255,255,.2); border-radius: 999rpx; display:flex; align-items:center; padding:0 20rpx; gap:10rpx; }
.icon{ font-size: 26rpx; }
.ph{ color:#fff; opacity:.95; font-size:26rpx; }
.icons{ display:flex; gap:12rpx; }
.i{ width:40rpx; height:40rpx; }

.quick{ display:flex; justify-content:space-around; margin: 1rem 0.625rem 0; }
.qitem{ display:flex; flex-direction:column; align-items:center; gap:8rpx; }
.qicon{ width:72rpx; height:72rpx; }
.qtext{ font-size:24rpx; color:#fff; }

.slogan{ margin: 18rpx 20rpx 0; color:#fff; }
.slogan .line1{ font-size:28rpx; opacity:.95; }
.slogan .line2{ font-size:34rpx; font-weight:700; display:block; margin:6rpx 0 12rpx; }
.btn{ border-radius: 999rpx; padding: 12rpx 20rpx; }
.btn.white{ background:#fff; color:#2a7de1; }
.btn.primary{ background:#e1251b; color:#fff; }

.wrap{ margin: -20rpx 20rpx 0; }
.card{ background:#fff; border-radius: 16rpx; padding: 0rpx; }
.section-title{ font-weight: 600; font-size: 30rpx; margin-bottom: 16rpx; }

.grid{ display:grid; gap: 20rpx; }
.grid-5{ grid-template-columns: repeat(5,1fr); }
.gitem{ display:flex; align-items:center; flex-direction:column; gap:8rpx; }
.gicon{ width:56rpx; height:56rpx; }
.gtext{ font-size: 24rpx; color:#1f2329; }

/* 轮播样式 */
.banner{ margin-top: 16rpx; }
.swiper{ width: 100%; height: 160rpx; border-radius: 16rpx; overflow: hidden; }
.banner-img{ width: 100%; height: 100%; object-fit: cover; }

.rec-grid{ display:grid; grid-template-columns: 1.2fr 1fr; gap: 16rpx; }
.rec{ 
	background:#fff; border-radius: 14rpx; padding: 16rpx; 
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,.04);
}
.rec-right {
	display:flex;
	flex-direction: column;
	justify-content: space-between;
}
.buybtn {
	width: 70%;
}
.r-ssub {
	color: #DA7646;
	
	font-size: 12px;
}
.ssubtip {
	background: #da764617;
	width: fit-content;
	margin-bottom: 2px;
}
.rec.big{ min-height: 220rpx; }
.r-title{ font-weight:600; margin-bottom:6rpx; }
.r-sub{ font-size:28rpx; color:#8a8f99; margin-bottom:10rpx; }
.r-rate{ margin: 6rpx 0 12rpx; }
.val{ color:#e1251b; font-size: 48rpx; font-weight:700; }
.unit{ color:#e1251b; margin-left: 4rpx; }
.rec.small{ display:flex; flex-direction:column; justify-content:space-between;flex:1 ;}
.rec.small:first-child{
	margin-bottom:20rpx;
}
.sr-top{ align-items:center; }
.row{ display:flex; align-items:center; }
.between{ justify-content: space-between; }
.arrow{ color:#c0c4cc; font-size: 34rpx; }
.sr-title{ font-weight: 600; }
.sr-sub{ color:#8a8f99; margin-top: 10rpx; font-size: 24rpx; }

.zone-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 16rpx; }
.zone{ display:flex; gap: 12rpx; background:#fff; border-radius: 12rpx; padding: 14rpx; border: 1rpx solid #f0f2f5; }
.zicon{ width:64rpx; height:64rpx; border-radius: 12rpx; background:#f7f7f7; }
.z-title{ font-weight:600; }
.z-sub{ color:#8a8f99; font-size: 22rpx; }

.hlist{ white-space: nowrap; }
.hitem{ display:inline-flex; flex-direction:column; gap:6rpx; width: 360rpx; background:#f8fafc; border-radius: 12rpx; padding: 16rpx; margin-right: 12rpx; }
.h-title{ font-weight:600; }
.h-sub{ font-size: 24rpx; color:#8a8f99; }

.tool{ display:flex; align-items:center; flex-direction:column; gap:8rpx; }
.ticon{ width:56rpx; height:56rpx; }
.ttext{ font-size: 24rpx; }

.news{ padding: 14rpx 0; border-bottom: 1rpx solid #f0f2f5; }
.news:last-child{ border-bottom: 0; }
.n-title{ font-size: 28rpx; }
.n-meta{ color:#8a8f99; font-size: 22rpx; margin-top: 6rpx; }

.faq-grid{ display:grid; grid-template-columns: repeat(3,1fr); gap: 12rpx; }
.faq{ background:#f8fafc; border-radius: 10rpx; padding: 16rpx; text-align:center; }

.footer-ad{ margin: 16rpx 0; }
.footer-ad image{ width:100%; border-radius: 12rpx; }
.navs {
	padding-top:40rpx;
	padding-bottom:40rpx;
}
.sr-stitle {
	font-size: 28rpx;
	color:inherit;
}
.sr-top .arrow {
	color:inherit;
	font-weight: 600;
	margin-left:20rpx;
}
.home1 {
	width: 100%; /* 或者使用百分比等 */
	height: auto; /* 或者根据需要设置为固定值 */
	    background-color: #F8F8F8;
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
