<template>
  <div class="div">
    <img src="" width="100%">
    <div class="login_div">
      <div style="margin: 10px">
        <el-tabs v-model="activeName" style="margin-top: 40px">
          <el-tab-pane label="密码登录" name="password">
            <el-form ref="form" :model="form" class="el-form">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="form.userName" class="el-input"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" class="el-input"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="短信登录" name="note">配置管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      activeName: 'password',
      form: {
        userName: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .div {
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;
  }
  .login_div {
    width: 400px;
    height: 350px;
    background-color: white;
    position: absolute;
    top: 40%;
    right: 20%;
  }
  .el-form {
    width: 80%;
    margin-left: 10%;
  }
</style>