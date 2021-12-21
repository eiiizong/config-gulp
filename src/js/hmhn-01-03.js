var hnhm0103 = new Vue({
  el: '#personal_timeline',
  data() {
    return {
      processData: [
        {
          id: '1',
          time: '2021年3月8日',
          unit: '阳光发放系统',
          unitType: '01',
          desc: '第一次领取“残疾人机动轮椅车燃油补贴”，共计365元。',
        },
        {
          id: '2',
          time: '2021年3月8日',
          unit: '阳光审批系统',
          unitType: '02', // 控制 tag
          desc: '“残疾人机动轮椅车燃油补贴”享受资格审批通过。',
        },
        {
          id: '3',
          time: '2021年3月8日',
          unit: '残疾人联合会',
          unitType: '03', // 控制 tag
          desc: '由成都市高新区残疾人联合会认定为肢体三级残疾，并发放残疾证',
        },
        {
          id: '4',
          time: '2021年3月8日',
          unit: '阳光发放系统',
          unitType: '01',
          desc: '第一次领取“残疾人机动轮椅车燃油补贴”，共计365元。',
        },
        {
          id: '5',
          time: '2021年3月8日',
          unit: '阳光审批系统',
          unitType: '02', // 控制 tag
          desc: '“残疾人机动轮椅车燃油补贴”享受资格审批通过。',
        },
        {
          id: '6',
          time: '2021年3月8日',
          unit: '残疾人联合会',
          unitType: '03', // 控制 tag
          desc: '由成都市高新区残疾人联合会认定为肢体三级残疾，并发放残疾证',
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
  },
})
console.log('hnhm0101', hnhm0101)
