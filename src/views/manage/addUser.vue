<template>
  <div class="edit-user">
    <el-form ref="form"
             :model="userInfo"
             label-position="left"
             label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="userInfo.department"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userInfo.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">确定添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { queryUserInfo, addUser } from '@/api/api';
export default {
  data() {
    return {
      userId: '',
      userInfo: {
        role: 4,
        forbidden: 0,
        username: '',
        password: '',
        name: '',
        department: '',
        mobile: ''
      }
    }
  },
  methods: {
    onSubmit() {
      addUser(this.userInfo).then(res => {
        if (res.successSign) {
          this.$router.push('/userManage');
        }
      })
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.edit-user {
  padding: 40px;
  width: 400px;
}
</style>



