<template>
<div>
  <mapDrag @drag="dragMap" lat="22.574405" lng="114.095388" class="mapbox"></mapDrag>
   <ul class="info">
          <li><span>经度：</span>{{ dragData.lng }}</li>
          <li><span>纬度：</span>{{ dragData.lat }}</li>
          <li><span>地址：</span>{{ dragData.address }}</li>
          <li><span>最近的路口：</span>{{ dragData.nearestJunction }}</li>
          <li><span>最近的路：</span>{{ dragData.nearestRoad }}</li>
          <li><span>最近的POI：</span>{{ dragData.nearestPOI }}</li>
  </ul>
  <hr/>
  <a class="w" href="http://116.211.91.230:8086/DICXZZF_Common/sso/singleLogin?keyId=5b252d1dbe754ae4b620dcf8df267816&param=089C0809FB46588E20949993EC6475C3">
      武汉市行政执法监督云平台
  </a>
</div>

</template>
<script>
// import map from '@/components/Map.vue'
 import mapDrag from '@/components/mapDrag/index.vue'
 export default {
   name: 'gd',
   data() {
     return {
       dragData: {
         lng: null,
         lat: null,
         address: null,
         nearestJunction: null,
         nearestRoad: null,
         nearestPOI: null
       }
     }
   },
   components: {
     mapDrag
   },
   methods: {
    //  See (e) {
    //     window.location.href = 'http://116.211.91.230:8086/DICXZZF_Common/sso/singleLogin?keyId=5b252d1dbe754ae4b620dcf8df267816&param=089C0809FB46588E20949993EC6475C3'
    //   },
     dragMap(data) {
       this.dragData = {
         lng: data.position.lng,
         lat: data.position.lat,
         address: data.address,
         nearestJunction: data.nearestJunction,
         nearestRoad: data.nearestRoad,
         nearestPOI: data.nearestPOI
       }
     }
   }
 }
</script>
<style>
.mapbox{ width: 600px; height: 400px; margin-bottom: 20px; float: left; }
.info{ margin: 0; padding: 0; list-style: none; line-height: 30px; margin-left: 620px; }
.info span{ display: block; color: #999; }
.w{
  display:block;
  width:200px;
  text-decoration: none;
  top:500px;
  clear: both;
  color: blueviolet
}
.w:hover{
  color:rgb(102, 17, 17);
}
</style>
