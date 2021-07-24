<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="商品名称搜索"
              prefix-icon="el-icon-search"
              @change="searchgoods"
              v-model="params.title"
            >
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column label="商品图片" width="120">
          <template #default="scope">
            <img
              :src="scope.row.cover_url"
              alt=""
              style="width: 88px; height: 88px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建日期"> </el-table-column>
        <el-table-column prop="title" label="商品名称"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="sales" label="销量"> </el-table-column>
        <el-table-column prop="stock" label="库存"> </el-table-column>
        <el-table-column prop="is_on" label="是否上架">
          <template #default="scope">
            <el-switch
              v-model="scope.row.is_on"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click="ison(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="is_recommend" label="是否推荐">
          <template #default="scope">
            <el-switch
              v-model="scope.row.is_recommend"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click="isrecommend(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="currentchange"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog title="修改用户信息" v-model="dialogFormVisible" width="50%">
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
          <el-input v-model="goods.details"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editTure">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getGoods,
  GoodsIsOn,
  GoodsIsRecommend,
  editGoods,
} from "@/network/goods";

export default {
  name: "",
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        current: "",
        title: "",
      },
      dialogFormVisible: false,
      id: "",
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
    //获取跳转页的商品
    currentchange(page) {
      this.params.current = page;
      this.getGoodsList();
    },
    //获取搜索商品
    searchgoods() {
      this.getGoodsList();
    },
    //获取商品列表
    getGoodsList() {
      getGoods(this.params).then((res) => {
        this.tableData = res.data;
        //转换布尔值
        this.tableData.forEach((item) => {
          if (item.is_on == 1) {
            item.is_on = true;
          } else if (item.is_on == 0) {
            item.is_on = false;
          }
        });
        this.tableData.forEach((item) => {
          if (item.is_recommend == 1) {
            item.is_recommend = true;
          } else if (item.is_recommend == 0) {
            item.is_recommend = false;
          }
        });
        this.total = res.meta.pagination.total;
      });
    },
    ison(e) {
      GoodsIsOn(e.id).then((res) => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
      });
    },
    isrecommend(e) {
      GoodsIsRecommend(e.id).then((res) => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
      });
    },
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
      editGoods(this.id, this.goods).then((res) => {
        console.log(res);
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
        this.dialogFormVisible = false;
      });
    },
  },
  created() {
    this.getGoodsList();
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 30px;
}
.el-row {
  margin: 20px 0 30px 0;
}
</style>
