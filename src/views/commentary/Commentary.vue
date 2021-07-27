<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片主体 -->
    <el-card class="box-card">
      <el-table :data="comments" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="created_at" label="评论日期"> </el-table-column>
        <el-table-column prop="goods.title" label="商品名称"> </el-table-column>
        <el-table-column prop="content" label="评价内容"> </el-table-column>
        <el-table-column prop="rate" label="评论的级别">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.rate == 1">好评</el-tag>
            <el-tag type="warning" v-if="scope.row.rate == 2">中评</el-tag>
            <el-tag type="danger" v-if="scope.row.rate == 3">差评</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="star" label="评论星级">
          <template #default="scope">
            <el-rate
              v-model="scope.row.star"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="reply" label="回复的内容"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              >回复</el-button
            >
          </template></el-table-column
        >
      </el-table>
    </el-card>
    <!-- 回复弹窗 -->
    <el-dialog title="回复" v-model="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="回复内容" label-width="100px" prop="reply">
          <el-input v-model="form.reply" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reset">取 消</el-button>
          <el-button type="primary" @click="replyClick">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getComments, reply } from "network/commentary";

export default {
  data() {
    return {
      comments: [],
      dialogFormVisible: false,
      id: 0,
      form: {
        reply: "",
      },
      rules: {
        reply: [{ required: true, message: "请输入回复内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取评论列表
    getList() {
      const params = { include: "goods" };
      getComments(params).then((res) => {
        console.log(1);
        this.comments = res.data;
        console.log(res.data[0].reply);
        console.log(this.comments[0].reply);
      });
    },
    //回复弹窗
    handleEdit(e) {
      this.id = e.id;
      this.form.reply = e.reply;
      this.dialogFormVisible = true;
    },
    //取消
    reset() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
    },
    //提交
    replyClick() {
      this.$refs.ruleForm.validate((vali) => {
        if (!vali) return;
        reply(this.id, this.form).then((res) => {
          this.$message.success({
            message: "回复成功",
            type: "success",
          });
          this.getList();
        });
        this.dialogFormVisible = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
</style>
