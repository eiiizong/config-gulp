
var hnhm0102 = new Vue(
  {
    el: '#big_data_portrait',
    data() {
      return {

      }
    },
    created() {
      console.log('hnhm0101 created');
    },
    mounted() {
      console.log('hnhm0101 mounted');
      this.initData()
    },
    methods: {
      // 初始化数据
      initData() {
        console.log('hnhm0101 initData');
      }
    }
  }
)
console.log('hnhm0101',hnhm0101);