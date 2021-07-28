<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加轮播</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片主体 -->
    <el-card class="box-card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
      >
        <el-form-item label="标题：" prop="title">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传轮播图：" prop="img">
          <el-input v-model="ruleForm.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="reset">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addSwipe } from "@/network/swipe";

export default {
  name: "",
  data() {
    return {
      ruleForm: {
        title: "",
        img: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        img: [{ required: true, message: "请上传轮播图", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((vali) => {
        if (!vali) return;
        addSwipe(this.ruleForm).then((res) => {
          this.$message({
            showClose: true,
            message: "创建成功",
            type: "success",
          });
          this.reset();
        });
      });
    },
    reset() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style scoped>
</style>

