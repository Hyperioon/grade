<template>
  <div>
    <div class="my-project">
      <el-form :inline="true"
               :model="project"
               class="demo-form-inline">
        <el-form-item label="部门"
                      v-show="userRole === 2 || userRole === 3">
          <el-select clearable
                     v-model="project.applyDepartment"
                     placeholder="请选择申报部门">
            <el-option v-for="item in allDepartment"
                       :key="item.description"
                       :label="item.description"
                       :value="item.description">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select clearable
                     v-model="project.projectClass"
                     placeholder="类型">
            <el-option label="创新项目奖"
                       value="2"></el-option>
            <el-option label="在岗技术革新奖"
                       value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select clearable
                     v-model="project.status"
                     placeholder="状态">
            <el-option label="草稿"
                       :value="0"></el-option>
            <el-option label="部门审批"
                       :value="1"></el-option>
            <el-option label="形式审查"
                       :value="2"></el-option>
            <el-option label="待分配专家"
                       :value="3"></el-option>
            <el-option label="待初评"
                       :value="4"></el-option>
            <el-option label="已初评"
                       :value="5"></el-option>
            <el-option label="待终评"
                       :value="6"></el-option>
            <el-option label="已终评"
                       :value="7"></el-option>
            <el-option label="评奖"
                       :value="8"></el-option>
            <el-option label="驳回"
                       :value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="project.projectName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getAllProjectList">查询</el-button>
          <el-button type="primary"
                     @click="onExport">导出表格</el-button>
          <!-- <el-button type="primary"
                     @click="downResourse">下载所有材料</el-button> -->
        </el-form-item>
      </el-form>
      <el-table :data="projectList"
                border
                v-loading="listLoading"
                style="width: 100%">
        <el-table-column prop="name"
                         label="项目名称"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="projectClass"
                         align="center"
                         label="类型"
                         :formatter="formatClass"
                         width="140">
        </el-table-column>
        <el-table-column prop="applyDepartment"
                         align="center"
                         width="180"
                         label="部门">
        </el-table-column>
        <el-table-column align="left"
                         width="360"
                         label="申报人">
          <template scope="scope">
            <div v-for="item in scope.row.applyUser">
              <div>{{item}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="field"
                         align="center"
                         width="140"
                         label="领域">
        </el-table-column>

        <el-table-column prop="status"
                         align="center"
                         :formatter="formatStatus"
                         width="140"
                         label="状态">
        </el-table-column>
        <el-table-column prop="expertFinalScore"
                         align="center"
                         width="180"
                         label="初评得分">
        </el-table-column>
        <el-table-column prop="leaderFinalScore"
                         align="center"
                         width="180"
                         label="终评得分">
        </el-table-column>
        <el-table-column prop="finalScore"
                         :formatter="formatFinal"
                         align="center"
                         width="180"
                         label="结果">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         align="center"
                         width="200">
          <template slot-scope="scope">
            <el-button @click.native.prevent="detail(scope.row)"
                       type="text"
                       size="small">
              详情
            </el-button>
            <!-- <el-button @click.native.prevent="edit(scope.row)"
                       type="text"
                       size="small">
              编辑
            </el-button> -->
            <el-button @click.native.prevent="download(scope.row)"
                       type="text"
                       size="small">
              下载
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
  </div>
</template>

<script>
import { getProjectList, getDepartment, approve, getUserInfo } from '@/api/api';
export default {
  name: 'allProject',
  components: {
  },
  data() {
    return {
      userRole: 0,
      rejectReason: '',
      listLoading: false,
      rejectShow: false,
      allDepartment: [],
      total: 0,
      approveParam: {
        projectId: '',
        mark: 0,
        view: ''
      },
      project: {
        applyDepartment: '',
        projectClass: '',
        projectName: '',
        status: '',
        pageNo: 1
      },
      projectList: [],
    };
  },
  methods: {
    onExport() {
      if (this.projectList.length > 0) {
        window.open(`/api/project/exportMyProjectExcel?applyDepartment=${this.project.applyDepartment}&projectClass=${this.project.projectClass}&projectName=${this.project.projectName}&status=${this.project.status}`);
      } else {
        this.$message.error('暂无文件');
      }
    },
    downResourse() {
      if (this.projectList.length > 0) {
        window.open(`/api/project/downZip?applyDepartment=${this.project.applyDepartment}&projectClass=${this.project.projectClass}&status=${this.project.status}&myProject=1`);
      } else {
        this.$message.error('暂无文件');
      }
    },
    handleCurrentChange(val) {
      this.project.pageNo = val;
      this.getAllProjectList();
    },
    formatFinal(data) {
      if (data.finalScore === 1) {
        return '一等奖';
      } else if (data.finalScore === 2) {
        return '二等奖';
      } else if (data.finalScore === 3) {
        return '三等奖';
      } else if (data.finalScore === 0) {
        return '淘汰';
      } else {
        return '';
      }
    },
    formatClass(data) {
      if (data.projectClass === 1) {
        return '在岗技术革新奖';
      } else {
        return '创新项目奖';
      }
    },
    formatStatus(data) {
      switch (data.status) {
        case 0:
          return '草稿';
          break;
        case 1:
          return '部门审批';
          break;
        case 2:
          return '形式审查';
          break;
        case 3:
          return '待分配专家';
          break;
        case 4:
          return '待初评';
          break;
        case 5:
          return '已初评';
          break;
        case 6:
          return '待终评';
          break;
        case 7:
          return '已终评';
          break;
        case 8:
          return '评奖';
          break;
        case 9:
          return '驳回';
          break;
        default:
          return ''
      }
    },
    getAllDepartment() {
      getDepartment().then(res => {
        this.allDepartment = res.result;
      })
    },
    getAllProjectList() {
      getProjectList(this.project).then(res => {
        if (res.successSign && res.result) {
          this.projectList = res.result.slice(res.pageVo.pageStartRow, res.pageVo.pageEndRow);
          for (let item of this.projectList) {
            item.role = this.userRole;
            item.applyUser = item.applyUser.split(',');
          }
          this.total = res.pageVo.totalCount;
        } else {
          this.projectList = [];
        }
      })
    },
    detail(row) {
      this.$router.push({ path: '/projectDetail', query: { id: row.id } });
    },
    edit(row) {
      this.$router.push({ name: '编辑项目', params: { projectId: row.id, projectClass: row.projectClass } });
    },
    reject(row) {
      this.approveParam.view = '';
      this.approveParam.projectId = row.id;
      this.approveParam.mark = 0;
      this.rejectShow = true;
    },
    // download(row) {
    //   if (row.material) {
    //     let data = encodeURI(row.material);
    //     window.open(`/api/project/zipfileDownload?fileNames=${data}`);
    //   } else {
    //     this.$message.error('无证明材料');
    //   }
    // },
    // 下载
    download(row) {
      let data1 = encodeURIComponent(row.application);
      let data2 = encodeURIComponent(row.material);
      window.open(`/api/project/zipfileDownload?fileNames=${data1},${data2}`);
    },
    ensuerReject() {
      approve(this.approveParam).then(res => {
        if (res.successSign) {
          Message({
            message: res.message,
            type: 'success'
          });
          this.rejectShow = false;
        }
      })
    }
  },
  mounted() {
    getUserInfo().then(res => {
      this.userRole = res.result.role
    });
    this.getAllProjectList();
    this.getAllDepartment();
  }
};
</script>

<style lang='scss'>
.my-project {
  padding: 40px;
}
</style>
