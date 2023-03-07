// 框架 请勿改动

;(function () {
  console.log('Echart 柱状图示例')
  $(function () {
    // 地图渲染
    var renderMap = function () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echart_bar'))

      var option = {
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter:
            '<span style="font-weight:700">{b}</span> 区域<br/>数量：<span style="font-weight:700">{c}</span>人',
        },

        legend: {
          show: true,
          data: ['项目个数'],
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
        },
        //图标离容器的距离
        grid: {
          left: '3%',
          top: 40,
          right: 40,
          bottom: 10,
          //是否包含坐标轴
          containLabel: true,
        },
        xAxis: {
          name: '月',
          nameTextStyle: {
            color: '#b3b3b3',
            fontSize: 12,
          },

          axisLabel: {
            show: true,
            color: '#fff',
            fontSize: 12,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#0040a1',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        },
        yAxis: {
          name: '项目（个）',
          nameTextStyle: {
            color: '#b3b3b3',
            fontSize: 12,
          },
          min: 0,
          splitNumber: 1,
          axisLabel: {
            show: true,
            color: '#fff',
            fontSize: 12,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#0040a1',
            },
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: '项目个数',
            type: 'bar',
            barWidth: 6,

            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#24c9ff', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#007eff', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290],
          },
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }

    window.addEventListener('resize', renderMap, false)
    renderMap()
  })
})()
