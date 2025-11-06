<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
	onLaunch(()=>{
	  const pat = uni.getStorageSync('gesture_pattern')
	  if (pat && pat.length) {
	    // 已设置：去验证
	    uni.reLaunch({ url: '/pages/lock/index' })
	  } else {
	    // 未设置：首次让用户设置
	    uni.reLaunch({ url: '/pages/lock/index' })
	  }
	})
	
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
</style>
