<style lang="scss">
.index {
    height:100%;
    .mainHeader {
        position: fixed;
        top: 0;
        z-index: 100000;
        width: 100%;
        background: #3a6ce7;
        &.ivu-row {
            .ivu-col {
                height: 60px!important;
            }
        }
        .mainLogo {
            // width: 100px;
            position: relative;
            height: 100%;
            img {
                display: block;
                position: absolute;
                top: 0;
                left: 20px;
                bottom: 0;
                margin: auto;
            }
        }
        .mainNav {
            background: #3a6ce7;
            .ivu-menu-item {
                &.ivu-menu-item-active.ivu-menu-item-selected {
                    background: #3a6ce7;
                }
                height: 100%;
                // margin:0 20px;
                &:hover {
                    background: #3a6ce7;
                }
                a {
                    display: inline-block;
                    height: 38px;
                    border-radius: 38px;
                    line-height: 38px;
                    position: relative;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    padding: 0 20px;
                    color: #fff;
                    text-align: center;
                    &:hover {
                        background: #fff;
                        color: #2d8cf0;
                    }
                    &.router-link-exact-active {
                        background: #fff;
                        color: #2d8cf0;
                    }
                }

            }
        }
        .mainUser {
            height: 100%;
            float: right;
            margin-right: 30px;
            .ivu-dropdown-rel {
                height: 100%;
                & > i {
                    display: inline-block;
                    position: relative;
                    float: left;
                    width: 60px;
                    height: 100%;
                    img {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                    }
                }

                a {
                    display: inline-block;
                    position: relative;
                    top: 0;
                    height: 100%;
                    line-height: 60px;
                    color: #fff;
                    font-size: 18px;
                    img {
                        position: absolute;
                        display: inline-block;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                    }
                }
            }
        }
    }

    .mainContent {
        position: absolute;
        top: 60px;
        bottom: 0;
        width: 100%;

    }

}
</style>
<template>
<div class="index">
  <Row class="mainHeader">
    <Col :sm="{ span:3}" :md="{ span:4}" :lg="{ span:4}">
    <div class="mainLogo">
      <img src="../img/home_logo.png" alt="">
    </div>
    </Col>
    <Col :sm="{ span:12, offset:4}" :md="{ span:12, offset:2}" :lg="{ span:12,offset:1}">
    <Menu class="mainNav" mode="horizontal" theme="primary" active-name="1">
      <Menu-item name="1">
        <router-link to="/map" active-class="router-link-exact-active">实时监控</router-link>
      </Menu-item>
      <Menu-item name="2">
        <!-- <Icon type="ios-keypad"></Icon> -->
        <router-link to="/deviceListMain" active-class="router-link-exact-active">设备列表</router-link>
      </Menu-item>
      <Menu-item name="3">
        <!-- <Icon type="ios-analytics"></Icon> -->
        <router-link to="/dataCount" active-class="router-link-exact-active">数据统计</router-link>
      </Menu-item>
    </Menu>
    </Col>
    <Col :sm="{ span:5}" :md="{ span:6}" :lg="{ span:7}">
    <Dropdown class="mainUser" trigger="click" placement="bottom-end">

      <i><img src="../img/userimg.jpg" alt=""></i>
      <a href="javascript:void(0)">

                    <span>admin</span>
                    <Icon type="arrow-down-b"></Icon>
                </a>
      <Dropdown-menu slot="list">
        <router-link to="/login">
          <Dropdown-item @click.native="signOut">退出</Dropdown-item>
        </router-link>

      </Dropdown-menu>
    </Dropdown>
    </Col>
  </Row>


  <div class="mainContent">
    <router-view></router-view>
  </div>
</div>
</template>
<script>
export default {
  methods: {
    signOut() {
      localStorage.removeItem('loginStatus');
    }
  }
};
</script>
