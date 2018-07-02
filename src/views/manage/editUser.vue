<template>
  <div class="edit-user">
    <el-form ref="form"
             :model="userInfo"
             label-position="left"
             label-width="80px">
      <el-form-item label="用户名">
        <span>{{userInfo.username}}</span>
      </el-form-item>
      <el-form-item label="密码"
                    v-show="havePassword">
        <el-input v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <span>{{userInfo.name}}</span>
      </el-form-item>
      <el-form-item label="部门">
        <span>{{userInfo.department}}</span>
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{userInfo.mobile}}</span>
      </el-form-item>
      <div>
        <el-form-item label="是否禁用">
          <el-switch v-model="userInfo.forbidden"></el-switch>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userInfo.role">
            <el-option label="普通员工"
                       :value="0"></el-option>
            <el-option label="部门审批人"
                       :value="1"></el-option>
            <el-option label="公司领导"
                       :value="2"></el-option>
            <el-option label="管理员"
                       :value="3"></el-option>
            <el-option label="其他"
                       :value="4"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">确定</el-button>
        <el-button @click="$router.push('/userManage')">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { queryUserInfo, updateUser, updateExpert, addExpert } from '@/api/api';
export default {
  data() {
    return {
      userId: '',
      havePassword: false,
      userInfo: {},
    }
  },
  methods: {
    getUserInfo() {
      queryUserInfo({ id: this.userId }).then(res => {
        this.userInfo = res.result;
        if (this.userInfo.password) {
          this.havePassword = true;
        }
        if (this.userInfo.forbidden === 1) {
          this.userInfo.forbidden = true;
        }

      })
    },

    onSubmit() {
      if (this.userInfo.forbidden) {
        this.userInfo.forbidden = 1;
      } else {
        this.userInfo.forbidden = 0;
      }
      delete this.userInfo.expert;
      updateUser(this.userInfo).then(res => {
        if (res.successSign) {
          this.$router.push('/userManage');
          this.$message.success('修改成功！');
        }
      })
    }
  },
  mounted() {
    this.userId = this.$route.query.id;
    this.getUserInfo();
  }
}
</script>

<style lang="scss" scoped>
.edit-user {
  padding: 40px;
  width: 300px;
}
</style>



