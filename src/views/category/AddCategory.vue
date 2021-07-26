<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form
        :model="category"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
      >
        <el-form-item label="新建分类名称" prop="name">
          <el-input v-model="category.name"></el-input>
        </el-form-item>
        <el-form-item label="所属一级分类" prop="pid">
          <el-select v-model="category.pid" placeholder="请选择">
            <el-option label="创建新的一级分类" value="0"> </el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        pid: [{ required: true, message: "请选择一级分类", trigger: "blur" }],
      },
    };
  },
  methods: {
    //创建分类
    onSubmit() {
      console.log(this.category);
      this.$refs.ruleForm.validate((vali) => {
        //预验证为假就返回
        if (!vali) return;
        //为真就创建分类
        addCategory(this.category).then((res) => {
          this.$message({
            showClose: true,
            message: "创建成功",
            type: "success",
          });
        });
        //清空表单
        this.$refs.ruleForm.resetFields();
      });
    },
    //重置
    reset() {
      //清空表单
      this.$refs.ruleForm.resetFields();
    },
  },
  created() {
    //获取分类数据给下拉菜单
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
