// 框架 请勿改动

;(function () {
  console.log('Echart 地图示例')
  $(function () {
    // 地图渲染
    var renderMap = function () {
      var mapName = '四川省'
      var uploadedDataURL = './lib/json/510000.json'
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echart_map'))

      myChart.showLoading()

      $.get(uploadedDataURL, function (geoJson) {
        myChart.hideLoading()

        echarts.registerMap(mapName, geoJson)

        var option = {
          backgroundColor: 'transparent',
          title: {
            show: false,
          },
          series: [
            {
              type: 'map',
              roam: false,
              mapType: mapName,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
                emphasis: {
                  textStyle: {
                    color: '#fff',
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: '#389BB7',
                  areaColor: '#00b7f5',
                  borderWidth: 1,
                  borderColor: '#206ee7',
                  shadowColor: '#206ee7',
                  shadowBlur: 10,
                },
                emphasis: {
                  areaColor: '#017ee2',
                  borderColor: '#017ee2',
                  borderWidth: 2,
                },
              },
            },
          ],
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      })
    }

    window.addEventListener('resize', renderMap, false)
    renderMap()
  })
})()
