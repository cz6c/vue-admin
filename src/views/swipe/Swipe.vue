<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播管理</el-breadcrumb-item>
      <el-breadcrumb-item>轮播列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片主体 -->
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="updated_at" label="更新日期"> </el-table-column>
        <el-table-column label="轮播图" width="120">
          <template #default="scope">
            <img :src="scope.row.img_url" alt="" style="width: 100%" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="seq" label="播放排序">
          <template #default="scope">
            <el-input-number
              v-model="scope.row.seq"
              controls-position="right"
              @change="handleChange(scope.row)"
              :min="1"
              :max="10"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="is_locked" label="是否禁用">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click="isStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button type="primary" @click="deleteClick(scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑轮播图" v-model="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="标题：" label-width="120px" prop="title">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传轮播图：" label-width="120px" prop="img">
          <el-input v-model="ruleForm.img" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="offClick">重 置</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSwipe,
  editSwipe,
  deleteSwipe,
  seqSwipe,
  isSwipe,
} from "@/network/swipe";
import { toBoolean, debounce } from "@/methods";

export default {
  name: "",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      id: 0,
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
  computed: {},
  watch: {},
  methods: {
    //获取分类列表
    getList() {
      getSwipe().then((res) => {
        this.tableData = res.data;
        //转换布尔型;
        toBoolean(this.tableData, "status");
      });
    },

    //是否禁用
    isStatus(e) {
      isSwipe(e.id).then((res) => {
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
        }
        this.getList();
      });
    },

    //编辑弹窗
    handleEdit(e) {
      this.ruleForm.title = e.title;
      this.ruleForm.img = e.img;
      this.id = e.id;
      this.dialogFormVisible = true;
    },

    offClick() {
      this.dialogFormVisible = false;
      //清空表单
      this.$refs.ruleForm.resetFields();
    },

    //请求修改排序
    //不管body请求参数是几个，都要以对象的形式传递
    //事件名：debounce(事件执行函数,防抖时间)
    //事件执行函数不能写箭头函数，不然会拿不到this
    handleChange: debounce(function (e) {
      seqSwipe(e.id, { seq: e.seq }).then((res) => {
        this.$message({
          showClose: true,
          message: "排序修改成功",
          type: "success",
        });
        this.getList();
      });
    }, 1000),

    //提交修改分类
    edit() {
      this.$refs.ruleForm.validate((vali) => {
        //预验证为假就返回
        if (!vali) return;
        //为真就提交修改;
        editSwipe(this.id, this.ruleForm).then((res) => {
          //如果res为假说明不能修改
          if (!res) {
            this.$message({
              showClose: true,
              message: "系统数据禁止编辑, 请自行创建数据",
              type: "error",
            });
          } else {
            this.$message({
              showClose: true,
              message: "轮播图修改成功",
              type: "success",
            });
          }
          this.getList();
        });
        //隐藏弹窗
        this.dialogFormVisible = false;
        //清空表单
        this.$refs.ruleForm.resetFields();
      });
    },

    //删除轮播图
    deleteClick(e) {
      this.$confirm("此操作将永久删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteSwipe(e.id).then((res) => {
            //如果res为假说明不能修改
            if (!res) {
              this.$message({
                showClose: true,
                message: "系统数据禁止编辑, 请自行创建数据",
                type: "error",
              });
            } else {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success",
              });
            }
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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

