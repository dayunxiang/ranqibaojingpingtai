<style lang="scss">
*{
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select:none;
  -khtml-user-select:none;
  -webkit-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
body,
html {
    height: 100%;
    width: 100%;

}
// body > div {
//     height: 100%;
//     width: 100%;
// }
.ivu-notice{
  top: 90px!important;
  overflow: hidden;
  height:auto!important;
}
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
        top: 0;
    }
}
</style>
<template>
<div>
  <router-view></router-view>
</div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {

  }
};
</script>
