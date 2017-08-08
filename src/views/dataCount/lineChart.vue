<style lang="scss">
  #main{
    height:100%;
  }
</style>
<template lang="html">
  <div id="main"></div>
</template>
<script>

export default {
  name:'lineChart',
  data(){
    return{
      option : {
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
                top:'18%',
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
  mounted(){
    this.echartInit()
    window.onresize=function(){
      this.echartInit()
    }.bind(this)


  },
  methods:{
    echartInit(){
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(this.option,true);
    }
  },
  created(){

  }
}
</script>
