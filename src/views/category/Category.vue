<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table
        :data="tableData1"
        style="width: 100%"
        row-key="id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="分类"> </el-table-column>
        <el-table-column prop="level" label="层级"></el-table-column>
        <el-table-column prop="status" label="是否启用"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getCategory } from "@/network/category";

export default {
  name: "",
  data() {
    return {
      tableData1: [],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    getCategory().then((res) => {
      console.log(res);
      this.tableData1 = res;
    });
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 30px;
}
</style>
