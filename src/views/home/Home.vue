<template>
  <div class="home">
    <el-container>
      <!-- 顶部 -->
      <el-header height="65px">
        <span class="log">MB售后产品服务管理平台</span>
        <button class="el-icon-s-operation" @click="swith"></button>
        <div class="right">
          <el-dropdown>
            <span class="el-dropdown-link">
              <span> 账号：{{ user.email }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout"> 退出登录 </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <img :src="user.avatar" alt="" />
        </div>
      </el-header>
      <el-container>
        <!-- 左侧导航
        router开启路由模式绑定导航index为跳转path后去配置路由文件
        default-active绑定活跃路由的路径后刷新页面会保持高亮
        uniqueOpened只保持一个子菜单的展开
        :动态绑定可以写三元运算符
         -->
        <el-aside :width="!isCollapse ? '200px' : '65px'">
          <el-menu
            :collapse="isCollapse"
            :uniqueOpened="true"
            :collapse-transition="false"
            background-color="#424242"
            text-color="#fff"
            active-text-color="#66b1ff"
            router
            :default-active="$route.path"
          >
            <!-- 一级 -->
            <el-submenu
              :index="items.id + ''"
              v-for="(items, index) in menusList"
              :key="index + ''"
            >
              <template #title>
                <i :class="icon[index]"></i>
                <span>{{ items.name }}</span>
              </template>
              <!-- 二级 -->
              <el-menu-item
                :index="'/' + item.id"
                v-for="item in items.children"
                :key="item.id + ''"
              >
                <template #title>
                  <i class="el-icon-menu"></i>
                  <span>{{ item.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getuser } from "network/user";
import { getMenus } from "network/home";

export default {
  name: "",
  data() {
    return {
      menusList: [],
      user: {},
      icon: [
        "el-icon-user-solid",
        "el-icon-s-grid",
        "el-icon-s-goods",
        "el-icon-s-promotion",
        "el-icon-s-order",
        "el-icon-picture",
        "el-icon-s-tools",
      ],
      isCollapse: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    logout() {
      //清除本地token
      window.localStorage.removeItem("token");
      this.$message({
        showClose: true,
        message: "退出成功",
        type: "success",
      });
      //跳转到login
      this.$router.push("/login");
    },
    swith() {
      this.isCollapse = !this.isCollapse;
    },
  },
  created() {
    //获取菜单栏信息
    getMenus().then((res) => {
      //缓存菜单数据到本地中用于路由权限配置
      window.localStorage.setItem("menuList", JSON.stringify(res));
      this.menusList = res;
      console.log(res);
    });
    //获取用户登录信息
    getuser().then((res) => {
      this.user = res;
    });
  },
};
</script>

<style scoped>
.el-header {
  position: relative;
  background-color: #212121;
  color: #fff;
  line-height: 65px;
}
.el-aside {
  background-color: #424242;
  color: #fff;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.home > .el-container {
  height: 100vh;
}
/* 去除左边导航的边框 */
.el-menu {
  border-right: 0;
}
.log {
  display: inline-block;
  width: 180px;
  font-size: 0.6em;
}
.el-icon-s-operation {
  font-size: 1.5em;
  background-color: #212121;
  border: 0;
  color: #fff;
}
.right {
  display: inline-block;
  position: absolute;
  right: 20px;
  padding: 10px 0;
  box-sizing: border-box;
  height: 65px;
}
.right img {
  margin: 0 20px;
  height: 45px;
  width: 45px;
}
.el-dropdown-link {
  color: #d6d6d6;
  font-size: 1.2em;
}
</style>
