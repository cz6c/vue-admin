<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片主体 -->
    <el-card class="box-card">
      <el-table
        :data="tableData1"
        style="width: 100%"
        row-key="id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="分类"> </el-table-column>
        <el-table-column prop="level" label="层级">
          <template #default="scope">
            <el-tag v-if="scope.row.level == 1">一级分类</el-tag>
            <el-tag type="success" v-if="scope.row.level == 2">二级分类</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否启用">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click="status(scope.row)"
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
    </el-card>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑分类" v-model="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="分类名称：" label-width="100px" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="offClick">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCategory, editCategory, isStatus } from "@/network/category";
import { toBoolean } from "@/methods";

export default {
  name: "",
  data() {
    return {
      tableData1: [],
      dialogFormVisible: false,
      id: 0,
      pid: "",
      ruleForm: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    //获取分类列表
    getList() {
      getCategory().then((res) => {
        this.tableData1 = res;
        //转换布尔型
        toBoolean(this.tableData1, "status");
        this.tableData1.forEach((item) => {
          toBoolean(item.children, "status");
        });
      });
    },
    //是否启用
    status(e) {
      isStatus(e.id).then((res) => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
        this.getList();
      });
    },
    //编辑弹窗
    handleEdit(e) {
      this.pid = e.pid;
      this.ruleForm.name = e.name;
      this.id = e.id;
      this.dialogFormVisible = true;
    },
    offClick() {
      this.dialogFormVisible = false;
      //清空表单
      this.$refs.ruleForm.resetFields();
    },
    //提交修改分类
    edit() {
      this.$refs.ruleForm.validate((vali) => {
        //预验证为假就返回
        if (!vali) return;
        //为真就提交修改
        const form = {
          pid: this.pid,
          name: this.ruleForm.name,
        };
        editCategory(this.id, form).then((res) => {
          //如果res为假说明修改不能修改
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
        });
        //隐藏弹窗 重新请求分类列表数据
        this.dialogFormVisible = false;
        this.getList();
        //清空表单
        this.$refs.ruleForm.resetFields();
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
