<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :uniqueOpened="true"
            default-active="/25"
            class="el-menu-vertical-demo"
            background-color="#d3dce6"
            text-color="#333"
            active-text-color="red"
            router
          >
            <!-- 一级 -->
            <el-submenu
              :index="items.id"
              v-for="items in menusList"
              :key="items.id"
            >
              <template #title>
                <i class="el-icon-location"></i>
                <span>{{ items.name }}</span>
              </template>
              <!-- 二级 -->
              <el-menu-item
                :index="'/' + item.id"
                v-for="item in items.children"
                :key="item.id"
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

export default {
  name: "",
  data() {
    return {
      menusList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    getMenus().then((res) => {
      this.menusList = res;
      console.log(res);
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
