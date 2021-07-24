<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form :model="goods" label-width="60px">
        <el-form-item label="所属分类">
          <el-input v-model="goods.category_id"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="goods.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="goods.description"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="goods.price"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="goods.stock"></el-input>
        </el-form-item>
        <el-form-item label="封面图">
          <el-input v-model="goods.cover"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input type="textarea" v-model="goods.details"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addGoods } from "@/network/goods";

export default {
  name: "",
  data() {
    return {
      goods: {
        category_id: "",
        title: "",
        description: "",
        price: "",
        stock: "",
        cover: "",
        details: "",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    //初始化商品数据
    handleEdit(e) {
      console.log(e);
      this.dialogFormVisible = true;
      this.id = e.id;
      this.goods.category_id = e.category_id;
      this.goods.title = e.title;
      this.goods.description = e.description;
      this.goods.price = e.price;
      this.goods.stock = e.stock;
      this.goods.cover = e.cover;
      this.goods.details = e.details;
      console.log(this.goods);
    },
    //修改商品数据   ******************************
    editTure() {
      addGoods(this.goods).then((res) => {
        console.log(res);
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
      });
    },
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 30px;
}
</style>
