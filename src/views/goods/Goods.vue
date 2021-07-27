<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片主体 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="商品名称搜索"
              prefix-icon="el-icon-search"
              @change="searchgoods"
              v-model="params.title"
              clearable
            >
            </el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 列表区 -->
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
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
      <!-- 分页区域 -->
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="currentchange"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog title="修改商品信息" v-model="dialogFormVisible" width="50%">
      <el-form label-width="160px" :model="goods" :rules="rules" ref="form">
        <el-form-item label="所属分类" prop="category_id">
          <el-cascader
            v-model="goods.category_id"
            :options="options"
            :props="props"
            clearable
            placeholder="请选择分类"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="goods.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="goods.description"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="goods.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="goods.stock" type="number"></el-input>
        </el-form-item>
        <el-form-item label="封面图" prop="cover">
          <el-input v-model="goods.cover"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="details">
          <el-input type="textarea" v-model="goods.details"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reset">取 消</el-button>
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
  GoodsDetails,
} from "@/network/goods";

import { Category } from "network/category";

import { toBoolean } from "@/methods";

export default {
  name: "",
  data() {
    //自定义检验规则
    var validatePass = (rule, value, callback) => {
      if (!value[1]) {
        callback(new Error("必须选择一个二级分类"));
      } else {
        callback();
      }
    };
    return {
      //列表数据
      tableData: [],
      total: 0,
      //query请求
      params: {
        current: "",
        title: "",
      },
      //弹窗数据
      dialogFormVisible: false,
      //商品id
      id: "",
      //编辑商品数据
      goods: {
        category_id: [],
        title: "",
        description: "",
        price: "",
        stock: "",
        cover: "",
        details: "",
      },
      //配置级联下拉的值
      props: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "id",
        label: "name",
      },
      options: [],
      //表单验证
      rules: {
        category_id: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        stock: [{ required: true, message: "请输入库存", trigger: "blur" }],
        cover: [{ required: true, message: "请导入封面图", trigger: "blur" }],
        details: [{ required: true, message: "请输入详情", trigger: "blur" }],
      },
    };
  },
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
        toBoolean(this.tableData, "is_on");
        toBoolean(this.tableData, "is_recommend");
        this.total = res.meta.pagination.total;
      });
    },
    //是否上架
    ison(e) {
      GoodsIsOn(e.id).then((res) => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
        this.getGoodsList();
      });
    },
    //是否推荐
    isrecommend(e) {
      GoodsIsRecommend(e.id).then((res) => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
        this.getGoodsList();
      });
    },
    //编辑弹窗初始化商品数据
    handleEdit(e) {
      this.dialogFormVisible = true;
      //从商品详情中拿父级分类id
      const params = { include: "category" };
      GoodsDetails(e.id, params).then((res) => {
        //如果父级分类id为0说明该分类为顶级分类
        res.category.pid == 0
          ? (this.goods.category_id = [res.category.id])
          : (this.goods.category_id = [res.category.pid, res.category.id]);
      });
      //初始化
      this.id = e.id;
      this.goods.title = e.title;
      this.goods.description = e.description;
      this.goods.price = e.price;
      this.goods.stock = e.stock;
      this.goods.cover = e.cover;
      this.goods.details = e.details;
    },
    //修改商品数据
    editTure() {
      this.$refs.form.validate((valid) => {
        //如果预校验结果为假就返回
        if (!valid) return;
        //为真就提交修改
        this.goods.category_id = this.goods.category_id[1];
        editGoods(this.id, this.goods).then((res) => {
          if (!res) {
            this.$message({
              showClose: true,
              message: "系统数据禁止编辑, 请自行创建数据",
              type: "error",
            });
          } else {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success",
            });
            this.getGoodsList();
          }
        });
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
      });
    },
    reset() {
      //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
    },
  },
  created() {
    //获取商品列表数据
    this.getGoodsList();
    //获取分类数据给级联组件
    Category().then((res) => {
      this.options = res;
    });
  },
};
</script>

<style scoped>
.el-row {
  margin: 20px 0 30px 0;
}
</style>
