<template>
  <div class="user-manage">
    <el-form :inline="true"
             :model="searchParams"
             class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="searchParams.search"
                  placeholder="用户名，姓名，部门"></el-input>
      </el-form-item>
      <el-form-item label="专家类型">
        <el-select clearable
                   v-model="searchParams.expertType"
                   placeholder="专家类型">
          <el-option label="初评专家"
                     value="0"></el-option>
          <el-option label="终评专家"
                     value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专家领域">
        <el-select clearable
                   v-model="searchParams.expertField"
                   placeholder="专家领域">
          <el-option label="技术专家"
                     value="0"></el-option>
          <el-option label="效益专家"
                     value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专家所属项目类型">
        <el-select clearable
                   v-model="searchParams.expertProject"
                   placeholder="专家所属项目类型">
          <el-option label="在岗项目专家"
                     value="0"></el-option>
          <el-option label="创新项目专家"
                     value="1"></el-option>
        </el-select>
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
      <el-table-column prop="user.name"
                       label="姓名"
                       align="center">
      </el-table-column>
      <el-table-column prop="user.department"
                       align="center"
                       label="部门">
      </el-table-column>
      <el-table-column prop="user.mobile"
                       align="center"
                       label="手机号">
      </el-table-column>
      <el-table-column prop="juniorExpert"
                       align="center"
                       :formatter="formatJuniorExpert"
                       label="初评专家">
      </el-table-column>
      <el-table-column prop="finalExpert"
                       align="center"
                       :formatter="formatFinalExpert"
                       label="终评专家">
      </el-table-column>
      <el-table-column prop="technology"
                       :formatter="formatTechnology"
                       align="center"
                       label="技术专家">
      </el-table-column>
      <el-table-column prop="benefit"
                       align="center"
                       :formatter="formatBenefit"
                       label="效益专家">
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="200">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editUser(scope.row)"
                     type="text"
                     size="small">
            修改
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
import { getExpertList } from '@/api/api';
export default {
  name: 'firstTrial',
  components: {
  },
  data() {
    return {
      userList: [],
      listLoading: false,
      searchParams: {
        expertType: '',
        expertField: '',
        expertProject: '',
        search: '',
        pageNo: 1
      },
      total: 0
    }
  },
  methods: {
    search() {
      this.listLoading = true;
      getExpertList(this.searchParams).then(res => {
        this.listLoading = false;
        if (res.result) {
          this.userList = res.result.slice(res.pageVo.pageStartRow, res.pageVo.pageEndRow);
          console.log(this.userList)
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
      this.$router.push({ path: '/editExpert', query: { id: row.id } });
    },
    formatJuniorExpert(data) {
      if (data.juniorExpert === 1) {
        return '是';
      } else {
        return '否';
      }
    },
    formatFinalExpert(data) {
      if (data.finalExpert === 1) {
        return '是';
      } else {
        return '否';
      }
    },
    formatTechnology(data) {
      if (data.technology === 1) {
        return '是';
      } else {
        return '否';
      }
    },
    formatBenefit(data) {
      if (data.benefit === 1) {
        return '是';
      } else {
        return '否';
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
