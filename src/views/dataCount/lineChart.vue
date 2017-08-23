<style lang="scss">
#main {
    height: 100%;
}
</style>
<template lang="html">
  <div id="main"></div>
</template>
<script>
export default {
  name: 'lineChart',
  props: ['aid'],
  data() {
    return {
      date: [],
      echartData: [],
      option: {
        title: {
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '6%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        //	    legend: {
        //	        icon: 'rect',
        //	        itemWidth: 14,
        //	        itemHeight: 5,
        //	        itemGap: 13,
        //	        data: ['移动', '电信', '联通'],
        //	        right: '4%',
        //	        textStyle: {
        //	            fontSize: 12,
        //	            color: '#F1F1F3'
        //	        }
        //	    },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          top: '25%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',

          boundaryGap: false,
          axisLine: {
            //	        	show:false,
            lineStyle: {
              color: '#57617B'
            }
          },
          name: '日期',
          data: ['7-11', '7-13', '7-15', '7-17', '7-19', '7-21', '7-23']
        }],
        yAxis: [{
          type: 'value',
          name: '报警数',
          axisTick: {
            show: false
          },
          axisLine: {

            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: '报警',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(0,136,212)',
              borderColor: 'rgba(0,136,212,0.2)',
              borderWidth: 12

            }
          },
          data: [5, 10, 2, 5, 7, 3, 1]
        }]
      }
    }
  },
  watch: {
    aid(newAid) {
      // console.log(newAid)
      this.echartInit()
    }
  },
  mounted() {
    // let data = res.data.data
    // let xAxisData = []
    // let seriesData = []
    // console.log(this.getNowDate())
    //
    // for (let i = 0; i < data.length; i++) {
    //   xAxisData.push(data[i].date)
    //   seriesData.push(data[i].count)
    // }
    // // console.log(this.option.xAxis[0].data)
    // // console.log(this.option.series[0].data)
    // this.option.xAxis[0].data = xAxisData
    // this.option.series[0].data = seriesData
    // var myChart = echarts.init(document.getElementById('main'));
    // myChart.setOption(this.option, true);
  },
  methods: {
    echartInit() {
      let xAxisData = []
      let seriesData = []
      new Promise((resolve)=>{
        this.axios('alarm/statDateAndCount?regionId=' + this.aid)
        .then((res) => {
          if(res.data.data.length<1){
            this.sectionDate('2017-08-15',this.getNowDate())
          }else{
            this.sectionDate(res.data.data[0].date,this.getNowDate())
          }

          resolve(res.data.data)

        })

      }).then((data)=>{
        // console.log(data)
        // debugger

          outer:
          for(let i=0;i<this.date.length;i++){
            inter:
            for(let j=0;j<data.length;j++){
              if(this.date[i]==data[j].date){
                // console.log(data[j])
                xAxisData.push(this.date[i])
                seriesData.push(data[j].count)
                continue outer;
              }
            }
            xAxisData.push(this.date[i])
            seriesData.push('0')
          }

        // console.log(xAxisData)
        // console.log(seriesData)
        this.option.xAxis[0].data = xAxisData
        this.option.series[0].data = seriesData
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(this.option, true);
      })

    },
    sectionDate(startTime, endTime) {
      var start_time = startTime;
      var end_time = endTime;
      var bd = new Date(start_time),
        be = new Date(end_time);
      var bd_time = bd.getTime(),
        be_time = be.getTime(),
        time_diff = be_time - bd_time;
      var d_arr = [];
      for (var i = 0; i <= time_diff; i += 86400000) {
        var ds = new Date(bd_time + i);
        d_arr.push(ds.getFullYear() + '-' + month(ds.getMonth()) + '-' + ds.getDate())
      }
      this.date=d_arr

      function month(data) {
        var month = data + 1;
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        return month
      }
    },
    getNowDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var Hours = date.getHours();
      var Minutes = date.getMinutes();
      var Seconds = date.getSeconds();

      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      return currentdate;
    }
  },
  created() {

  }
}
</script>
