<template>
  <div class="edit-user">
    <el-form ref="form"
             :model="expert"
             label-position="left"
             label-width="100px">
      <el-form-item label="在岗项目专家">
        <el-switch v-model="expert.onjob">
        </el-switch>
      </el-form-item>
      <el-form-item label="创新项目专家">
        <el-switch v-model="expert.innovation">
        </el-switch>
      </el-form-item>
      <el-form-item label="初评专家">
        <el-switch v-model="expert.juniorExpert"></el-switch>
      </el-form-item>
      <el-form-item label="终评专家">
        <el-switch v-model="expert.finalExpert"></el-switch>
      </el-form-item>
      <el-form-item label="技术专家">
        <el-switch v-model="expert.technology">
        </el-switch>
      </el-form-item>
      <el-form-item label="效益专家">
        <el-switch v-model="expert.benefit">
        </el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="_addExpert">添加到专家库</el-button>
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
      expert: {
        juniorExpert: 0,
        finalExpert: 0,
        benefit: 0,
        technology: 0,
        innovation: 0,
        onjob: 0,
        userId: '',
      },
    }
  },
  methods: {
    _addExpert() {
      console.log(this.expert)
      if (this.expert.juniorExpert) {
        this.expert.juniorExpert = 1;
      } else {
        this.expert.juniorExpert = 0;
      }
      if (this.expert.finalExpert) {
        this.expert.finalExpert = 1;
      } else {
        this.expert.finalExpert = 0;
      }
      if (this.expert.onjob) {
        this.expert.onjob = 1;
      } else {
        this.expert.onjob = 0;
      }
      if (this.expert.innovation) {
        this.expert.innovation = 1;
      } else {
        this.expert.innovation = 0;
      }
      if (this.expert.technology) {
        this.expert.technology = 1;
      } else {
        this.expert.technology = 0;
      }
      if (this.expert.benefit) {
        this.expert.benefit = 1;
      } else {
        this.expert.benefit = 0;
      }
      addExpert(this.expert).then(res => {
        if (res.successSign) {
          this.$message.success('添加成功！');
          this.$router.push({ path: '/expertManage' });
        }
      })
    }
  },
  mounted() {
    this.expert.userId = this.$route.query.id;
  }
}
</script>

<style lang="scss" scoped>
.edit-user {
  padding: 40px;
  width: 300px;
}
</style>



