<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addGoods } from "network/goods";
import { Category } from "network/category";

export default {
  name: "",
  data() {
    return {
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
        expandTrigger: "hover",
        value: "id",
        label: "name",
      },
      options: [],
      //表单验证
      rules: {
        category_id: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
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
  computed: {},
  watch: {},
  methods: {
    //提交创建商品 ***************图片上传和富文本待完善**************
    onSubmit() {
      this.$refs.form.validate((valid) => {
        //如果预校验结果为假就返回
        if (!valid) return;
        //为真就提交，先拿到二级分类id
        this.goods.category_id = this.goods.category_id[1];
        addGoods(this.goods).then((res) => {
          if (res.status == 201) {
            this.$message({
              showClose: true,
              message: "新建商品成功",
              type: "success",
            });
          }
        });
      });
    },
    reset() {
      //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.form.resetFields();
    },
  },
  created() {
    //获取分类数据给级联组件
    Category().then((res) => {
      this.options = res;
    });
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 30px;
}
</style>
