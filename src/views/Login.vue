<template>
  <el-form :model="ruleForm2"
           :rules="rules2"
           ref="ruleForm2"
           label-position="left"
           label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">创新奖申报系统</h3>
    <el-form-item prop="username">
      <el-input type="text"
                v-model="ruleForm2.username"
                auto-complete="off"
                placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password"
                v-model="ruleForm2.checkPass"
                auto-complete="off"
                placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button type="primary"
                 style="width:100%;"
                 @click.native.prevent="handleSubmit2"
                 >登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';
import { requestLogin } from '@/api/api';
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      ruleForm2: {
        username: '',
        checkPass: ''
      },
      rules2: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      }
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          //_this.$router.replace('/table');
          //NProgress.start();
          var param = {
            username: this.ruleForm2.username,
            password: this.ruleForm2.checkPass
          };
          requestLogin(param).then(res => {
            let user = res.result;
            if (!res.successSign) {
              Message({
                message: res.message,
                type: 'error'
              });
            } else {
              this.$router.push({ path: '/index' });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
}

</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
