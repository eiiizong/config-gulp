var hnhm0104 = new Vue({
  el: '#statistics_of_subsidy_enjoyment',
  data() {
    return {}
  },
  created() {
    console.log('hnhm0101 created')
  },
  mounted() {
    console.log('hnhm0101 mounted')
    this.initSwiper()
  },
  methods: {
    // 初始化数据
    initSwiper() {
      var mySwiper = new Swiper('.swiper', {
        direction: 'horizontal', // 垂直切换选项
        loop: false, // 循环模式选项
        slidesPerView: 2,
        spaceBetween: 12,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    },
  },
})
console.log('hnhm0101', hnhm0101)
