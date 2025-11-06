<script lang="ts">
import { markBackgroundNow, maybeInvalidateAfterBackground } from '@/utils/auth'

export default {
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
    maybeInvalidateAfterBackground()
  },
  onHide() {
    console.log('App Hide')
    markBackgroundNow()
  },
}
</script>

<style>
/*每个页面公共css */
</style>
