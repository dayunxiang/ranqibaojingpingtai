<style lang="scss">

    .index{
      .mainHeader{
        position: fixed;
        top:0;
        z-index: 100000;
        width:100%;
        background:#3a6ce7;
        &.ivu-row{
          .ivu-col{
            height:60px!important;
          }
        }
        .mainLogo{
          // width: 100px;
          position: relative;
          height: 100%;
          img{
            display:block;
            position: absolute;
            top:0;
            left:20px;
            bottom:0;
            margin:auto;
          }
        }
        .mainNav{
          background: #3a6ce7;
          .ivu-menu-item{
            &.ivu-menu-item-active.ivu-menu-item-selected{
              background: #3a6ce7;
            }
            height:100%;
            // margin:0 20px;
            &:hover{
              background: #3a6ce7;
            }
            a{
              display:inline-block;
              height:38px;
              border-radius:38px;
              line-height:38px;
              position:relative;
              top:0;
              bottom:0;
              left:0;right:0;
              margin:auto;
              padding:0 20px;
              color:#fff;
              text-align:center;
              &:hover{
                background:#fff;
                color:#2d8cf0;
              }
              &.router-link-exact-active {
                background:#fff;
                color:#2d8cf0;
              }
            }

          }
        }
        .mainUser{
          height:100%;
          float:right;
          margin-right: 30px;
          .ivu-dropdown-rel{
            height:100%;
            a{
              display: block;
              height:100%;
              line-height: 60px;
              color:#fff;
              font-size: 18px;
            }
          }
        }
      }

      .mainContent{
        position:absolute;
        top:60px;
        bottom:0;
        width:100%;

      }

    }

</style>
<template>
    <div class="index">
      <Row class="mainHeader">
          <Col span="4">
            <div class="mainLogo">
              <img src="../img/home_logo.png" alt="">
            </div>
          </Col>
          <Col span="12">
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
          <Col span="8">
            <Dropdown class="mainUser" trigger="click" placement="bottom-end">
                <a href="javascript:void(0)">
                    <span>admin</span>
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <Dropdown-menu slot="list">
                    <Dropdown-item>退出</Dropdown-item>
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

        }
    };
</script>
