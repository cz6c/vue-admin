<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片主体 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="通过邮箱信息查找"
              prefix-icon="el-icon-search"
              @change="searchEmail"
              v-model="params.email"
              clearable
            >
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="addDialog">新增用户</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="created_at" label="创建日期"> </el-table-column>
        <el-table-column label="用户头像" width="120">
          <template #default="scope">
            <img
              :src="scope.row.avatar_url"
              alt=""
              style="width: 50px; height: 50px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="is_locked" label="是否锁定">
          <template #default="scope">
            <el-switch
              v-model="scope.row.is_locked"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click="islocked(scope.row)"
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
            ></el-button> </template
        ></el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="currentchange"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑弹窗 -->
    <el-dialog title="修改用户信息" v-model="dialogFormVisible" width="36%">
      <el-form
        :model="editform"
        label-width="80px"
        :rules="editRules"
        ref="editRulesForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editform.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateuser">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 新增弹窗 -->
    <el-dialog title="新增用户信息" v-model="addDialogFormVisible" width="36%">
      <el-form
        :model="addform"
        label-width="80px"
        :rules="addRules"
        ref="addRulesForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="addform.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addform.password"
            placeholder="请输入密码"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="offClick">取 消</el-button>
          <el-button type="primary" @click="adduser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, editUsers, isLockUsers, addUsers } from "@/network/user";
import { toBoolean } from "@/methods";

export default {
  name: "",
  data() {
    return {
      //用户数据对象
      tableData: [],
      total: 0,
      //编辑表单
      dialogFormVisible: false,
      editform: {
        name: "",
        email: "",
      },
      //新镇表单
      addDialogFormVisible: false,
      addform: {
        name: "",
        email: "",
        password: "",
      },
      //query请求数据
      params: {
        current: 1,
        email: "",
      },
      //表单规则
      editRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        email: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
      addRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //获取用户列表
    getUserList() {
      getUsers(this.params).then((res) => {
        this.tableData = res.data;
        //转换布尔值
        toBoolean(this.tableData, "is_locked");
        this.total = res.meta.pagination.total;
      });
    },
    //弹窗编辑用户信息
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.editform.name = row.name;
      this.editform.email = row.email;
      this.editform.id = row.id;
    },
    //提交修改用户信息
    updateuser() {
      this.$refs.editRulesForm.validate((vali) => {
        //表单预验证为假就返回
        if (!vali) return;
        //为真就提交用户信息
        const data = {
          name: this.editform.name,
          email: this.editform.email,
        };
        editUsers(this.editform.id, data).then((res) => {
          if (res.status == 204) {
            this.dialogFormVisible = false;
            this.$message.success({
              message: "修改成功",
              type: "success",
            });
            this.getUserList();
          }
        });
      });
    },
    //页码改变重新去加载
    currentchange(page) {
      this.params.current = page;
      this.getUserList();
    },
    //通过邮箱进行筛选
    searchEmail() {
      this.getUserList();
    },
    //是否锁定
    islocked(e) {
      isLockUsers(e.id).then((res) => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
        this.getUserList();
      });
    },
    //新增弹窗
    addDialog() {
      this.addDialogFormVisible = true;
    },
    //取消新增弹窗
    offClick() {
      this.addDialogFormVisible = false;
      //清空表单内容
      this.$refs.addRulesForm.resetFields();
    },
    //提交新增
    adduser() {
      this.$refs.addRulesForm.validate((vali) => {
        //表单预验证为假就返回
        if (!vali) return;
        //为真就提交新增
        addUsers(this.addform).then((res) => {
          this.$message({
            showClose: true,
            message: "用户新增成功",
            type: "success",
          });
          this.getUserList();
        });
        this.addDialogFormVisible = false;

        //清空表单内容
        this.$refs.addRulesForm.resetFields();
      });
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style scoped>
.el-row {
  margin: 20px 0 30px 0;
}
</style>
