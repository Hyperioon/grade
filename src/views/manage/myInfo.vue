<template>
  <div class="edit-user">
    <el-form ref="form"
             :model="userInfo"
             label-position="left"
             label-width="80px">
      <el-form-item label="用户名">
        <span>{{userInfo.username}}</span>
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

      <el-form-item label="初评专家">
        <span>{{juniorExpert}}</span>
      </el-form-item>
      <el-form-item label="终评专家">
        <span>{{finalExpert}}</span>
      </el-form-item>
      <el-form-item label="技术专家">
        <span>{{technology}}</span>
      </el-form-item>
      <el-form-item label="效益专家">
        <span>{{benefit}}</span>
      </el-form-item>
      <el-form-item label="是否禁用">
        <span>{{forbidden}}</span>
      </el-form-item>
      <el-form-item label="角色">
        <span>{{role}}</span>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { queryUserInfo, updateUser } from '@/api/api';
export default {
  data() {
    return {
      userId: '',
      forbidden: '',
      juniorExpert: '',
      finalExpert: '',
      technology: '',
      benefit: '',
      role: '',
      userInfo: {}
    }
  },
  methods: {
    getUserInfo() {
      queryUserInfo({ id: this.userId }).then(res => {
        this.userInfo = res.result;
        console.log(this.userInfo.expert.juniorExpert)
        if (this.userInfo.expert.juniorExpert === 1) {
          this.juniorExpert = '是';
        } else {
          this.juniorExpert = '否';
        }
        if (this.userInfo.expert.finalExpert === 1) {
          this.finalExpert = '是';
        } else {
          this.finalExpert = '否';
        }
        if (this.userInfo.forbidden === 1) {
          this.forbidden = '是';
        } else {
          this.forbidden = '否';
        }
        if (this.userInfo.expert.benefit === 1) {
          this.benefit = '是';
        } else {
          this.benefit = '否';
        }
        if (this.userInfo.expert.technology === 1) {
          this.technology = '是';
        } else {
          this.technology = '否';
        }
        switch (this.userInfo.role) {
          case 0:
            this.role = '普通员工';
            break;
          case 1:
            this.role = '部门审批人';
            break;
          case 2:
            this.role = '公司领导';
            break;
          case 3:
            this.role = '管理员';
            break;
          default:
            this.role = '其他';
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



