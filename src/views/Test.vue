<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="昵称" prop="userName">
      <el-input v-model="ruleForm.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="userPassword" autocomplete="off">
      <el-input type="password" v-model="ruleForm.userPassword"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword" autocomplete="off">
      <el-input type="password" v-model="ruleForm.confirmPassword"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="userEmail">
      <el-input v-model="ruleForm.userEmail"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="userIdCard">
      <el-input v-model="ruleForm.userIdCard"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="userPhone">
      <el-input v-model="ruleForm.userPhone"></el-input>
    </el-form-item>
    <el-form-item label="上传头像">
      <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="ruleForm.userAvatar" :src="ruleForm.userAvatar" class="avatar">
        <i v-else class="el-icon-upload" id="avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="goAbout()">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Test',
  data() {
    var validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      if (this.ruleForm.userPassword !== '') {
        this.$refs.ruleForm.validateField('checkPass');
      }
      callback();
    }
  };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (this.ruleForm.userPassword !== this.ruleForm.confirmPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      data: {
        id: 1
      },
      ruleForm: {
        userName: '',
        userPassword: '',
        confirmPassword: '',
        userAvatar: '',
        userEmail: '',
        userIdCard: '',
        userPhone: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        userIdCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: "请输入合法身份证号", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.$feng.post('/queryUserById', this.data).then(res => {
      console.log(res)
    })
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.ruleForm.userAvatar = URL.createObjectURL(file.raw);
      this.Base64(file.raw).then(res => {
        console.log(res)
        this.ruleForm.userAvatar = res
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    Base64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$feng.post('/addUser', this.ruleForm).then(res => {
            console.log(res);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    goAbout(){
      this.$router.push('/about');
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #avatar-uploader-icon {
    text-align: center;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 178px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>