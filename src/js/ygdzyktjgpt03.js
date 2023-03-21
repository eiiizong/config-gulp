// 框架 请勿改动

;(function () {
  console.log('四川省以工代赈劳务报酬“一卡通”监管平台')
  $(function () {
    console.log('123')

    var recalc = function () {
      // 解决 125%，150%缩放，1366*768分辨率兼容问题
      // domEl为需要缩放的页面的根元素
      const domEl = document.getElementById('app')
      if (!domEl) return
      const { clientWidth, clientHeight } = document.documentElement || document.body || {}
      const scaleX = clientWidth / 1920 // 分母是设计稿的宽度
      const scaleY = clientHeight / 1080
      domEl.style.transform = `scale(${scaleX})`
      domEl.style.transformOrigin = 'top left'
      const _h = (1080 * clientWidth) / 1920

      // 按照宽度的比例缩放后底部会出现空白，再用marginBottom解决这个空白问题 存在问题
      // 实际高度大于缩放后的高度
      if (clientHeight > _h) {
        const space = clientHeight - _h
        // console.log('=======', clientHeight, _h, space, space / scaleX)
        // domEl.style.paddingBottom = (scaleY - scaleX) * 1080 + 'px'
        // domEl.style.paddingBottom = `${space / scaleX + 28}px`
      } else {
        // domEl.style.paddingBottom = `${20}px`
      }
    }

    window.addEventListener('resize', recalc, false)
    recalc()
  })
})()
