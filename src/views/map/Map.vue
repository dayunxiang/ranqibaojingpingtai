<style lang="scss">
  .map{
    height:100%;
    width:100%;
    #map{
      height:100%;
      width:100%;
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
      point:[]
    }
  },

  mounted(){
    // 百度地图API功能
  	var map = new BMap.Map("map",{enableMapClick:false});    // 创建Map实例
  	map.centerAndZoom(new BMap.Point(118.823513,32.020812),14);  // 初始化地图,设置中心点坐标和地图级别
  	// map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
  	// map.setCurrentCity("南京");          // 设置地图显示的城市 此项是必须设置的
  	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.setMapStyle({
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
    makePoint(map){
      map.clearOverlays();        //清除地图覆盖物
      this.axios('http://58.213.47.166:8990/area/devices?aid=2086&pageNumber=1&pageSize=10000')
      .then(res=>{
        this.point=res.data.rows;
        this.point.forEach((item,index)=>{
          let pt = new BMap.Point(item.x,item.y);
          let myIcon = new BMap.Icon("../../img/marker1.png", new BMap.Size(20,20));
          let marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
          map.addOverlay(marker);
        })

      })
    }
  },
  created(){
      // axios({
      //   method:''
      // })

  }
}
</script>
