// 框架 请勿改动

;(function () {
  console.log(123)
  var app = new Vue({
    el: '#app',
    data() {
      return {
        dialogVisibleMessage: true,
        bsMessageList: null,
        bsMessageContentList: null,
        bsMailList: null,
        messageTabActive: 'mailList', // message mailList
        mailListData: [
          {
            label: '一级 1',
            children: [
              {
                label: '二级 1-1',
                children: [
                  {
                    label: '三级 1-1-1',
                  },
                ],
              },
            ],
          },
          {
            label: '一级 2',
            children: [
              {
                label: '二级 2-1',
                children: [
                  {
                    label: '三级 2-1-1',
                  },
                ],
              },
              {
                label: '二级 2-2',
                children: [
                  {
                    label: '三级 2-2-1',
                  },
                ],
              },
            ],
          },
          {
            label: '一级 3',
            children: [
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
            ],
          },
        ],
        mailListDataDefaultProps: {
          children: 'children',
          label: 'label',
        },
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },

          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1517 弄',
            zip: 200333,
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1519 弄',
            zip: 200333,
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1516 弄',
            zip: 200333,
          },
        ],
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.messageTabActive == 'message') {
          this.initScrollMessageList()
          this.initScrollMessageConentList()
        } else {
          this.initScrollMailList()
        }
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
      initScrollMessageConentList() {
        this.bsMessageContentList = BetterScroll.createBScroll(
          this.$refs.ref_message_content_list,
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
      initScrollMailList() {
        this.bsMailList = BetterScroll.createBScroll(this.$refs.ref_mail_list, {
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
        })
      },
      handleClickMailListNode(data) {
        this.bsMailList.refresh()
        console.log(data)
      },
      handleClickTableCell(row) {
        console.log(row)
      },
    },
  })
})()
