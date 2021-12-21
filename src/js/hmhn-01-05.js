var hnhm0104 = new Vue({
  el: '#subsidy_details',
  data() {
    return {
      tabData: [
        {
          id: '1',
          name: '补贴发放详情',
          checked: true,
        },
        {
          id: '2',
          name: '补贴申报详情',
          checked: false,
        },
      ],
    }
  },
  created() {
    console.log('hnhm0101 created')
  },
  mounted() {
    console.log('hnhm0101 mounted')
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      console.log('hnhm0101 initData')
    },
    handleClickTab(id) {
      const tabData = this.tabData
      tabData.map(item => {
        item.checked = false
        if(item.id===id) {
          item.checked = true
        }
      })
    }
  },
})
console.log('hnhm0101', hnhm0101)
