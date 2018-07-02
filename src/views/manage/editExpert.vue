<template>
  <div class="edit-user">
    <el-form ref="form">
      <div>
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
        <el-form-item label="从专家库删除">
          <el-switch v-model="expert.deleted">
          </el-switch>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">确定</el-button>
        <el-button @click="$router.push('/expertManage')">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { getExpertInfo, updateExpert } from '@/api/api';
export default {
  data() {
    return {
      userId: '',
      expert: {
        juniorExpert: 0,
        finalExpert: 0,
        deleted: 0,
        benefit: 0,
        technology: 0,
        innovation: 0,
        onjob: 0,
        userId: '',
      },
    }
  },
  methods: {
    getUserInfo() {
      getExpertInfo({ id: this.userId }).then(res => {
        this.expert = res.result[0];
        if (this.expert.juniorExpert === 1) {
          this.expert.juniorExpert = true;
        }
        if (this.expert.finalExpert === 1) {
          this.expert.finalExpert = true;
        }
        if (this.expert.onjob === 1) {
          this.expert.onjob = true;
        }
        if (this.expert.innovation === 1) {
          this.expert.innovation = true;
        }
        if (this.expert.technology === 1) {
          this.expert.technology = true;
        }
        if (this.expert.benefit === 1) {
          this.expert.benefit = true;
        }
        if (this.expert.deleted === 1) {
          this.expert.deleted = true;
        }
      })
    },
    onSubmit() {
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
      if (this.expert.deleted) {
        this.expert.deleted = 1;
      } else {
        this.expert.deleted = 0;
      }
      delete this.expert.user;
      updateExpert(this.expert).then(res => {
        if (res.successSign) {
          this.$router.push('/expertManage');
          this.$message.success('修改成功！');
        }
      })
    }
  },
  mounted() {
    this.userId = this.$route.query.id;
    this.expert.userId = this.userId;
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



