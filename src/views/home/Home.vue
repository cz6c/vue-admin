<template>
  <div class="home">
    <el-container>
      <!-- 顶部 -->
      <el-header height="65px">
        <el-dropdown size="small">
          <el-button type="primary">
            <el-avatar :src="user.avatar_url" size="medium"> </el-avatar>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>
                用户名：{{ user.name }}
              </el-dropdown-item>
              <el-dropdown-item disabled>
                账号：{{ user.email }}
              </el-dropdown-item>
              <el-dropdown-item @click="logout" icon="el-icon-switch-button">
                注销
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-container>
        <!-- 左侧导航
        router开启路由模式绑定导航index为跳转path后去配置路由文件
        default-active绑定活跃路由的路径后刷新页面会保持高亮
        uniqueOpened只保持一个子菜单的展开
         -->
        <el-aside width="200px">
          <el-menu
            :uniqueOpened="true"
            background-color="#d3dce6"
            text-color="#333"
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
import { getMenus } from "network/home";
import { getuser } from "network/user";

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
        "el-icon-s-operation",
      ],
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
  },
  mounted() {
    //获取菜单栏信息
    getMenus().then((res) => {
      this.menusList = res;
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
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 65px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
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
</style>
