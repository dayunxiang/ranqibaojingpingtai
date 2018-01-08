<template lang="html">
  <div class="data-count">
    <annular-pie></annular-pie>
  </div>
</template>

<script>
import AnnularPie from './_AnnularPie.vue';
export default {
  name: 'dataCount',
  components:{
    AnnularPie
  }
}
</script>

<style lang="scss" scoped>
.data-count {
    width: 100%;
    height: 100%;
    background: #1a2742;
}
</style>
