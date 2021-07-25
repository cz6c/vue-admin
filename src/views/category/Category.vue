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
      <el-form :model="form">
        <el-form-item label="分类名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCategory, editCategory, isStatus } from "@/network/category";

export default {
  name: "",
  data() {
    return {
      tableData1: [],
      formLabelWidth: "100px",
      dialogFormVisible: false,
      id: 0,
      form: {
        pid: "",
        name: "",
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
        this.tableData1.forEach((item) => {
          if (item.status == 1) {
            item.status = true;
          } else if (item.status == 0) {
            item.status = false;
          }
        });
        this.tableData1.forEach((item) => {
          item.children.forEach((item) => {
            if (item.status == 1) {
              item.status = true;
            } else if (item.status == 0) {
              item.status = false;
            }
          });
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
      this.form.pid = e.pid;
      this.form.name = e.name;
      this.id = e.id;
      this.dialogFormVisible = true;
    },
    //提交修改分类
    edit() {
      editCategory(this.id, this.form).then((res) => {
        this.dialogFormVisible = false;
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
        this.getList();
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
