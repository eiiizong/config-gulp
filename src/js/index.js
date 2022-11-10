// 框架 请勿改动

;(function () {
  console.log(123)
  var app = new Vue({
    el: '#app',
    data() {
      return { dialogVisibleMessage: true, bsMessageList: null }
    },
    mounted() {
      this.$nextTick(() => {
        this.initScrollMessageList()
      })
    },
    methods: {
      initScrollMessageList() {
        this.bsMessageList = BetterScroll.createBScroll(
          this.$refs.ref_message_list,
          {
            bounce: false,
            click: true,
            scrollY: true,
            scrollX: false,
            scrollbar: {
              fade: true,
              interactive: true,
              // 以下配置项 v2.2.0 才支持
              customElements: [],
              minSize: 4,
              scrollbarTrackClickable: true,
              scrollbarTrackOffsetType: 'step',
              scrollbarTrackOffsetTime: 300,
              // 以下配置项 v2.4.0 才支持
              fadeInTime: 250,
              fadeOutTime: 500,
            },
            mouseWheel: {
              speed: 10,
              invert: false,
              easeTime: 300,
              discreteTime: 400,
              throttleTime: 0,
              dampingFactor: 0.1,
            },
          }
        )
      },
    },
  })
})()
