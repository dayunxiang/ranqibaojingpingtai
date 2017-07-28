<style lang="scss">

  @font-face {font-family: "Ionicons";
    src: url('../../iconfont/mapIconfont.eot?t=1501226686963'); /* IE9*/
    src: url('../../iconfont/mapIconfont.eot?t=1501226686963#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../../iconfont/mapIconfont.woff?t=1501226686963') format('woff'), /* chrome, firefox */
    url('../../iconfont/mapIconfont.ttf?t=1501226686963') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('../../iconfont/mapIconfont.svg?t=1501226686963#iconfont') format('svg'); /* iOS 4.1- */
  }
  .icon-dingwei:before { content: "\e62f"; }
  .icon-tanhao:before { content: "\e67f"; }
  .icon-device:before { content: "\e602"; }
  .icon-dianhua:before { content: "\e604"; }
  .icon-user:before { content: "\e838"; }

  .map{
    height:100%;
    width:100%;
    #map{
      height:100%;
      width:100%;
    }
    .BMap_pop{
      div{
        border:0!important;
      }
      &>div:nth-of-type(8){
        display: none;
      }
      &:before{
        content: '';
        display: block;
        position: absolute;
        top:0;bottom:0;
        left:0;right:0;
      }
      .BMap_bottom{
        overflow: initial!important;
        &:after{
          content: '';
          display: block;
          width: 0;
          height: 0;
          position: absolute;
          top:24px;bottom:0;
          left:274px;right:0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-top: 20px solid #fff;
        }
      }

    }
    .BMap_bubble_content{
      width:100%!important;
      height:100%!important;
    }
    .deviceInfor{
      position: absolute;
      top:20px;bottom:20px;
      left:20px;right:20px;
      .deviceUserInfor{
        &>p{
          font-size: 16px;
          line-height: 28px;
          i{
            display: inline-block;
            width:28px;
            height:28px;
            float: left;
            position: relative;
            color:#3b6ceb;
            &:before{
              display: block;
              position: absolute;
              width:18px;
              height:20px;
              font-size: 20px;
              top:0;bottom:0;
              left:0;
              right:0;
              margin:auto;
            }
          }
          b{
            font-weight: normal;
            display: inline-block;
            width:80px;
            text-align: justify;
            text-align-last:justify;
          }
          span{
            color:#3b6ceb;
          }
        }

      }
      .deviceAlarmInfor{
        margin-top: 20px;
        &>h3{
          b{
            font-weight: normal;
          }
          i{
            display: inline-block;
            width:28px;
            height:28px;
            float: left;
            position: relative;
            color:#f44f60;
            &:before{
              display: block;
              position: absolute;
              width:18px;
              height:26px;
              font-size: 20px;
              top:0;bottom:0;
              left:0;
              right:0;
              margin:auto;
            }
          }
          font-size: 16px;
        }
        .alarmTable{
          width:100%;
          height:100%;
          border-top:1px solid #333;
          border-bottom:1px solid #333;
          tr{
            border-top:1px solid #333;
            border-bottom:1px solid #333;
            td{
              line-height: 36px;
              font-size: 14px;
              text-align: center;
              &.time{
                text-align: left;
                width:90px;
              }
              &.tel{
                text-align: center;
                width:296px;
              }
            }
          }
        }
      }
    }
  }
</style>
<template lang="html">
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name:'map',
  data(){
    return{
      pointData:[],
      street:[],
      opts:{
				width : 640,     // 信息窗口宽度
				height: 400,     // 信息窗口高度
				// title : "信息窗口" , // 信息窗口标题
				enableMessage:true//设置允许信息窗发送短息
			}
    }
  },

  mounted(){
    // 百度地图API功能
  	var map = new BMap.Map("map",{enableMapClick:false});    // 创建Map实例
  	// map.centerAndZoom(new BMap.Point(118.823513,32.020812),14);  // 初始化地图,设置中心点坐标和地图级别
  	// map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
  	// map.setCurrentCity("南京");          // 设置地图显示的城市 此项是必须设置的
  	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.setMapStyle({             //设置地图样式
      styleJson:[
        {
          "featureType": "railway",
          "elementType": "geometry.stroke",
          "stylers": {
            "visibility": "off"
          }
        },
        {
          "featureType": "label",
          "elementType": "all",
          "stylers": {}
        }
      ]
    });
    this.getBoundary(map);
    this.makePoint(map);
    map.addEventListener("tilesloaded",function(){ //地图加载完成触发的函数

    })
  },
  methods:{
    getBoundary(map){           //添加行政区域划分
  		  var bdary = new BMap.Boundary();
  		  bdary.get("南京市秦淮区", function(rs){       //获取行政区域
    			// map.clearOverlays();        //清除地图覆盖物
    			var count = rs.boundaries.length; //行政区域的点有多少个
    			if (count === 0) {
    				alert('未能获取当前输入行政区域');
    				return ;
    			}
          var pointArray = [];
    			for (var i = 0; i < count; i++) {
    				var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#f00",fillColor:''}); //建立多边形覆盖物
    				map.addOverlay(ply);  //添加覆盖物
    				pointArray = pointArray.concat(ply.getPath());
    			}
          // console.log(pointArray)
    			map.setViewport(pointArray);    //调整视野
          // map.zoomIn()       放大一级
  		});
  	},
    makePoint(map){             //生成点
      map.clearOverlays();        //清除地图覆盖物
      this.axios('http://58.213.47.166:8990/area/devices?aid=2086&pageNumber=1&pageSize=10000')
      .then(res=>{
        this.pointData=res.data.rows;
        // console.log(this.pointData)
        this.pointData.forEach((item,index)=>{

          this.axios('http://58.213.47.166:8990/device/belong?did='+item.id)   //
          .then(resp=>{
            // console.log(resp.data.belong)
            this.$set(this.pointData[index],'name',resp.data.belong.name);
            this.$set(this.pointData[index],'tel',resp.data.belong.tel);
          })

          for(let i=0;i<this.street.length;i++){      //获取完整设备地址
            if(item.sid==this.street[i].sid){
              this.$set(this.pointData[index],'address','江苏省 南京市 秦淮区 '+this.street[i].n+ ' '+this.pointData[index].address);
            }
          }

          this.axios('http://58.213.47.166:8990/device/alarmtels?did='+item.id)
          .then(resp=>{
            this.$set(this.pointData[index],'alarmtels',resp.data)
          })
          let pt = new BMap.Point(item.x,item.y);
          let myIcon = new BMap.Icon("../../img/marker1.png", new BMap.Size(20,20));
          let marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
          marker.setTitle(item.address)
          map.addOverlay(marker);
          this.addClickHandler(map,item,marker);

        })
      })


    },
    addClickHandler(map,item,marker){
      let that=this;
      let content='';
      console.log(item)
      // let fircon='<div>';
      // let seccon='';
      // let thrcon='</div>';
      // content=fircon+seccon+thrcon;
      content=
        '<div class="deviceInfor">'+
          '<div class="deviceUserInfor">'+
            '<p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>长地万方</span></p>'+
            '<p><i class="ivu-icon icon-dianhua"></i><b>联 系 方 式</b>：<span>15652925130</span></p>'+
            '<p><i class="ivu-icon icon-device"></i><b>设 备 号</b>：<span>460000000000000</span></p>'+
            '<p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>江苏南京市秦淮区五老村街道区政府会议室演示</span></p>'+
          '</div>'+
          '<div class="deviceAlarmInfor">'+
            '<h3><i class="ivu-icon icon-tanhao"></i><b>报 警 记 录</b></h3>'+
            '<table class="alarmTable">'+
              '<tr>'+
                '<td class="time">2017-07-28 16:08:14</td>'+
                '<td class="tel">推送15652925130  15600170662  13180195130</td>'+
              '</tr>'+
              '<tr>'+
                '<td class="time">2017-07-28 16:08:14</td>'+
                '<td class="tel">推送15652925130  15600170662  13180195130</td>'+
              '</tr>'+
            '</table>'+
          '</div>'+
        '</div>';

      marker.addEventListener("click",function(e){
  			that.openInfo(map,content,e)
      });
    },
    openInfo(map,content,e){
  		let p = e.target;
  		let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
  		let infoWindow = new BMap.InfoWindow(content,this.opts);  // 创建信息窗口对象
  		map.openInfoWindow(infoWindow,point); //开启信息窗口
  	}
  },
  created(){
    this.axios.get('http://58.213.47.166:8990/area/street?aid=2086')
    .then(res=>{
      this.street=res.data
    })
  }
}
</script>
