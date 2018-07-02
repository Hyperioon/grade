<template>
  <el-row class="container">
    <el-col :span="24"
            class="header">
      <el-col :span="10"
              class="logo"
              :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="10">
        <div class="tools"
             @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4"
              class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"> {{this.user.username}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="myInfo">个人信息</el-dropdown-item>
            <el-dropdown-item divided
                              @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24"
            class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 @open="handleopen"
                 @close="handleclose"
                 @select="handleselect"
                 unique-opened
                 router
                 v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes"
                    v-if="!item.hidden">
            <el-submenu :index="index+''"
                        v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children"
                            :index="child.path"
                            :key="child.path"
                            v-if="!child.hidden">{{child.name}}</el-menu-item>
              <!-- 部门领导 -->
              <el-menu-item v-if="user.role === 1"
                            index="/approve"
                            @click="$router.push('/approve')">待审批项目</el-menu-item>
              <el-menu-item v-if="user.role === 1"
                            index="/allProject"
                            @click="$router.push('/allProject')">部门全部项目</el-menu-item>
              <!-- 公司领导 -->

              <el-menu-item v-if="user.role === 2"
                            index="/zhongping"
                            @click="$router.push('/zhongping')">终评</el-menu-item>
              <el-menu-item v-if="user.role === 2"
                            index="/allProject"
                            @click="$router.push('/allProject')">公司全部项目</el-menu-item>

              <!-- 管理员 -->
              <el-menu-item v-if="user.role === 3"
                            index="/manageApprove"
                            @click="$router.push('/manageApprove')">待审批项目</el-menu-item>
              <el-menu-item v-if="user.role === 3"
                            index="./fenpei"
                            @click="$router.push('/fenpei')">待分配专家项目</el-menu-item>
              <!-- 专家 -->
              <el-menu-item v-if="user.expert && user.expert.juniorExpert === 1"
                            index="/chuping"
                            @click="$router.push('/chuping')">初评项目</el-menu-item>
              <el-menu-item v-if="user.role === 3"
                            index="/expertDafen"
                            @click="$router.push('/expertDafen')">专家打分情况</el-menu-item>
              <!-- <el-menu-item v-if="user.role === 3"
                            index="./alloted"
                            @click="$router.push('/alloted')">已分配专家项目</el-menu-item> -->
              <el-menu-item v-if="user.role === 3 || user.expert && user.expert.juniorExpert === 1"
                            index="/yichuping"
                            @click="$router.push('/yichuping')">已初评项目</el-menu-item>
              <el-menu-item v-if="user.role === 3"
                            index="/zhongping"
                            @click="$router.push('/zhongping')">待终评项目</el-menu-item>
              <el-menu-item v-if="user.role === 3"
                            index="/pingjiang"
                            @click="$router.push('/pingjiang')">待评奖项目</el-menu-item>
              <el-menu-item v-if="user.role === 3"
                            index="/allProject"
                            @click="$router.push('/allProject')">所有项目</el-menu-item>

            </el-submenu>

            <el-menu-item v-if="item.leaf&&item.children.length>0"
                          :index="item.children[0].path">
              <i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
          <template v-for="(item,index) in $router.options.routes"
                    v-if="item.hidden && user.role === 3 && item.manage">
            <el-submenu :index="index+''"
                        v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children"
                            :index="child.path"
                            :key="child.path"
                            v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed"
            v-show="collapsed"
            ref="menuCollapsed">
          <li v-for="(item,index) in $router.options.routes"
              v-if="!item.hidden"
              class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title"
                   style="padding-left: 20px;"
                   @mouseover="showMenu(index,true)"
                   @mouseout="showMenu(index,false)">
                <i :class="item.iconCls"></i>
              </div>
              <ul class="el-menu submenu"
                  :class="'submenu-hook-'+index"
                  @mouseover="showMenu(index,true)"
                  @mouseout="showMenu(index,false)">
                <li v-for="child in item.children"
                    v-if="!child.hidden"
                    :key="child.path"
                    class="el-menu-item"
                    style="padding-left: 40px;"
                    :class="$route.path==child.path?'is-active':''"
                    @click="$router.push(child.path)">{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div class="el-submenu__title el-menu-item"
                     style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                     :class="$route.path==item.children[0].path?'is-active':''"
                     @click="$router.push(item.children[0].path)">
                  <i :class="item.iconCls"></i>
                </div>
              </li>
            </template>
          </li>
        </ul>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24"
                  class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/"
                           class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched"
                                  :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24"
                  class="content-wrapper">
            <transition name="fade"
                        mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
import Cookies from 'js-cookie';
import { getUserName, getUserInfo } from '@/api/api';

export default {
  data() {
    return {
      sysName: '创新奖申报系统',
      collapsed: false,
      user: {},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
    },
    handleopen() {
    },
    handleclose() {
    },
    handleselect: function (a, b) {
    },
    //退出登录
    logout: function () {
      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      }).then(() => {
        Cookies.remove('JSESSIONID');
        this.$router.push({ path: '/login' });
      })
    },
    myInfo() {
      this.$router.push({ path: '/myInfo', query: { id: this.user.id } });
    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    }
  },
  mounted() {
    if (this.$route.path === '/') {
      this.$router.push('/index');
    }
    getUserInfo().then(res => {
      this.user = res.result;
      console.log(this.user);
    })
  }
}

</script>

<style scoped lang="scss">
@import "~scss_vars";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 60px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      display: none;
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
