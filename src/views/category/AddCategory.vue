<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form label-width="120px">
        <el-form-item label="新建分类名称">
          <el-input v-model="category.name"></el-input>
        </el-form-item>
        <el-form-item label="所属一级分类">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="text">* 此处不选择默认创建一级分类</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCategory, addCategory } from "network/category";

export default {
  name: "",
  data() {
    return {
      category: {
        name: "",
        pid: "",
      },
      options: [],
      value: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    //创建分类
    onSubmit() {
      this.value !== ""
        ? (this.category.pid = this.value)
        : (this.category.pid = 0);
      const data = this.category;
      addCategory(this.category).then((res) => {
        this.$message({
          showClose: true,
          message: "创建成功",
          type: "success",
        });
        this.value = "";
        this.category.name = "";
      });
    },
    //重置
    reset() {
      this.value = "";
      this.category.name = "";
    },
  },
  created() {
    getCategory().then((res) => {
      this.options = res.map((item) => {
        return { value: item.id, label: item.name };
      });
    });
  },
};
</script>

<style scoped>
</style>
