<template>
  <div class="user-manage">
    <el-form :inline="true"
             :model="searchParams"
             class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="searchParams.search"
                  placeholder="用户名，姓名，部门"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList"
              border
              v-loading="listLoading"
              style="width: 100%">
      <el-table-column prop="username"
                       label="用户名"
                       align="center">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       align="center">
      </el-table-column>
      <el-table-column prop="department"
                       align="center"
                       label="部门">
      </el-table-column>
      <el-table-column prop="mobile"
                       align="center"
                       label="手机号">
      </el-table-column>
      <el-table-column prop="role"
                       align="center"
                       :formatter="formatRole"
                       label="角色">
      </el-table-column>
      <el-table-column prop="forbidden"
                       align="center"
                       :formatter="formatForbidden"
                       label="账号是否可用">
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="200">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editUser(scope.row)"
                     type="text"
                     size="small">
            修改信息
          </el-button>
          <el-button @click.native.prevent="addExpert(scope.row)"
                     type="text"
                     v-show="!scope.row.expert"
                     size="small">
            添加到专家库
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
                     layout="total, prev, pager, next"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { queryUserList } from '@/api/api';
export default {
  name: 'firstTrial',
  components: {
  },
  data() {
    return {
      userList: [],
      listLoading: false,
      searchParams: {
        search: '',
        pageNo: 1
      },
      total: 0
    }
  },
  methods: {
    search() {
      this.listLoading = true;
      queryUserList(this.searchParams).then(res => {
        this.listLoading = false;
        if (res.result) {
          this.userList = res.result.slice(res.pageVo.pageStartRow, res.pageVo.pageEndRow);
          this.total = res.pageVo.totalCount;
        } else {
          this.userList = [];
        }
      })
    },
    handleCurrentChange(val) {
      this.searchParams.pageNo = val;
      this.search();
    },
    editUser(row) {
      this.$router.push({ path: '/editUser', query: { id: row.id } });
    },
    addExpert(row) {
      this.$router.push({ path: '/addExpert', query: { id: row.id } });
    },
    formatForbidden(data) {
      if (data.forbidden === 0) {
        return '可用';
      } else {
        return '禁用';
      }
    },
    formatRole(data) {
      switch (data.role) {
        case 0:
          return '普通员工';
          break;
        case 1:
          return '部门审批人';
          break;
        case 2:
          return '公司领导';
          break;
        case 3:
          return '管理员';
          break;
        case 4:
          return '外部人员';
          break;
      }
    }
  },
  mounted() {
    this.search();
  }
};
</script>

<style>
.user-manage {
  padding: 40px;
}
</style>
