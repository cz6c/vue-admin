<template>
  <div class="home">
    <el-container>
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
        <el-aside width="200px">
          <el-menu
            :uniqueOpened="true"
            class="el-menu-vertical-demo"
            background-color="#d3dce6"
            text-color="#333"
            active-text-color="red"
            router
          >
            <!-- 一级 -->
            <el-submenu
              :index="items.id + ''"
              v-for="items in menusList"
              :key="items.id + ''"
            >
              <template #title>
                <i class="el-icon-location"></i>
                <span>{{ items.name }}</span>
              </template>
              <!-- 二级 -->
              <el-menu-item
                :index="'/' + item.id"
                v-for="item in items.children"
                :key="item.id + ''"
              >
                <template #title>
                  <!-- <i class="el-icon-location"></i> -->
                  <span>{{ item.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
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
</style>
