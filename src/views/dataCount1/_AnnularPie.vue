<template lang="html">
  <div id="main" style="width:300px;height:300px;"></div>
</template>

<script>
import 'echarts';
export default {
  props:[
    
  ],
  data() {
    return {

    }
  },
  mounted() {
    this.echartInit()
  },
  methods: {
    echartInit() {
      let mychart = echarts.init(document.getElementById('main'));
      var labelTop = {
        normal: {
          formatter: '{d}',
          textStyle: {
            color: '#fff',
            fontSize: 20
          }
        }
      };
      var itemStyle = {
        normal: {
          color: function(params) {
            if (params.percent >= 60) {
              return '#5ea1d6'
            } else {
              return '#ff5170'
            }
          }
        }
      }
      var labelBottom = {
        normal: {
          textStyle: {
            color: '#7f8eaf'
          },
          formatter: function(a, b) {
            return '\n' + a.seriesName
          }
        }
      };
      var radius = ['60%', '64%'];
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c}分"
        },
        backgroundColor: '#1b2a47',
        series: [{
            name: "网络核查",
            type: 'pie',
            center: [
              '12.5%', '50%'
            ],
            radius: radius,
            label: {
              normal: {
                position: 'center'
              }
            },
            itemStyle: {
              normal: {
                color: '#57ade0'
              }
            },
            symbolSize: 14,
            data: [{
                value: 25.67,
                name: '网络核查',
                label: labelTop
              }, {
                value: 74.33,
                name: '占位',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#2a385b'
                  }
                },
                label: labelBottom
              }

            ]
          }, {
            name: "XX核查",
            type: 'pie',
            center: [
              '37.5%', '50%'
            ],
            radius: radius,
            label: {
              normal: {
                position: 'center'
              }
            },
            itemStyle: {
              normal: {
                color: '#a459da'
              }
            },
            symbolSize: 14,
            data: [{
                value: 62.34,
                name: 'XX核查',
                label: labelTop
              }, {
                value: 37.66,
                name: '占位',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#2a385b'
                  }
                },
                label: labelBottom
              }

            ]
          }, {
            name: "XX核查",
            type: 'pie',
            center: [
              '62.5%', '50%'
            ],
            radius: radius,
            label: {
              normal: {
                position: 'center'
              }
            },
            itemStyle: {
              normal: {
                color: '#f25975'
              }
            },
            symbolSize: 14,
            data: [{
                value: 89.60,
                name: 'XX核查',
                label: labelTop
              }, {
                value: 10.40,
                name: '占位',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#2a385b'
                  }
                },
                label: labelBottom
              }

            ]
          }, {
            name: "XX核查",
            type: 'pie',
            center: [
              '87.5%', '50%'
            ],
            radius: radius,
            label: {
              normal: {
                position: 'center'
              }
            },
            itemStyle: {
              normal: {
                color: '#5feaa7'
              }
            },
            symbolSize: 14,
            data: [{
                value: 96.60,
                name: 'XX核查',
                label: labelTop
              }, {
                value: 3.40,
                name: '占位',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#2a385b'
                  }
                },
                label: labelBottom
              }

            ]
          }

        ]
      };
      mychart.setOption(option)
    }
  }
}
</script>

<style lang="css">
</style>
