<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="通过邮箱信息查找"
              prefix-icon="el-icon-search"
              @change="searchEmail"
              v-model="search"
            >
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="created_at" label="创建日期"> </el-table-column>
        <el-table-column prop="name" label="用户名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            ></el-button> </template
        ></el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="currentchange"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog title="修改用户信息" v-model="dialogFormVisible" width="36%">
      <el-form :model="form" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateuser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, getUser, upUser, searchUser } from "@/network/user";

export default {
  name: "",
  data() {
    return {
      tableData: [],
      total: 0,
      search: "",
      dialogFormVisible: false,
      form: {
        name: "",
        email: "",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    //弹窗获取当前编辑用户信息
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.form.name = row.name;
      this.form.email = row.email;
      this.form.id = row.id;
    },
    //修改用户信息
    updateuser() {
      const data = {
        name: this.form.name,
        email: this.form.email,
      };
      upUser(this.form.id, data).then((res) => {
        if (res.status == 204) {
          this.dialogFormVisible = false;
          this.$message.success({
            message: "修改成功",
            type: "success",
          });
        }
      });
      //重新请求修改后的数据
      getUserList().then((res) => {
        this.tableData = res.data;
        this.total = res.meta.pagination.total;
      });
    },
    //页码改变重新去加载
    currentchange(page) {
      getUser(page).then((res) => {
        this.tableData = res.data;
      });
    },
    //通过邮箱进行筛选
    searchEmail() {
      searchUser(this.search).then((res) => {
        this.tableData = res.data;
        this.total = res.meta.pagination.total;
      });
    },
  },
  created() {
    getUserList().then((res) => {
      this.tableData = res.data;
      this.total = res.meta.pagination.total;
    });
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
