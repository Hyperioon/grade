<template>
  <div class="status-manage">
    <el-button :loading="tongbuLoding"
               @click="tongbu">同步用户信息</el-button>
    <el-button :loading="fasongLoding"
               @click="fasong">发送部门审批短信</el-button>
  </div>
</template>

<script>
import { insertUserList, sendDepartmentLeader } from '@/api/api'
export default {
  name: 'firstTrial',
  components: {
  },
  data() {
    return {
      fasongLoding: false,
      tongbuLoding: false
    }
  },
  methods: {
    tongbu() {
      this.$confirm('确认同步用户信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tongbuLoding = true;
        insertUserList().then(res => {
          if (res.successSign) {
            this.$message.success(res.message);
            this.tongbuLoding = false;
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消同步'
        });
      });
    },
    fasong() {
      this.$confirm('确认发送部门审批短信?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fasongLoding = true;
        sendDepartmentLeader().then(res => {
          if (res.successSign) {
            this.$message.success(res.message);
            this.fasongLoding = false;
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        });
      });
    }
  }

};
</script>

<style>
.status-manage {
  padding: 40px;
}
</style>
