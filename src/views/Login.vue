<template>
  <div class="login">
    <div class="form">
      <div class="text">login</div>
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">login</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "network/user";

export default {
  name: "",
  data() {
    return {
      form: {
        email: "super@a.com",
        password: "123123",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    login() {
      login(this.form).then((res) => {
        //将token保存在本地window.localStorage.setItem()
        window.localStorage.setItem("token", res.access_token);
        this.$message({
          showClose: true,
          message: "登录成功",
          type: "success",
        });
        //跳到首页
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(../assets/img/login.png) no-repeat;
  background-size: cover;
}
.form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  background-color: #fff;
  opacity: 0.6;
  border-radius: 10px;
}
.text {
  margin-top: 26px;
  text-align: center;
  font-size: 2em;
  font-weight: 700;
}
.el-form {
  margin-top: 40px;
  padding: 0 20px;
}
.el-button {
  margin: 10px 36px;
  width: 80%;
}
</style>
