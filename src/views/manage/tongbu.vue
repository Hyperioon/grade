<template>
  <div class="status-manage">
    <el-button @click="tongbu">同步用户信息</el-button>
  </div>
</template>

<script>
import {insertUserList} from '@/api/api'
export default {
  name: 'firstTrial',
  components: {
  },
  methods: {
    tongbu() {
      insertUserList().then(res => {
        if (res.successSign) {
          this.$message.success(res.message);
        }
      })
    }
  }

};
</script>

<style>
.status-manage{
  padding: 40px;
}
</style>
