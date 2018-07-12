<template>
  <div>
    <div class="my-project">
      <el-form :inline="true"
               :model="project"
               class="demo-form-inline">
        <el-form-item label="类型">
          <el-select clearable
                     v-model="project.projectClass"
                     placeholder="类型">
            <el-option label="创新项目奖"
                       :value="2"></el-option>
            <el-option label="在岗技术革新奖"
                       :value="1"></el-option>
          </el-select>
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
                         label="申报部门">
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
        <el-table-column prop="expertFinalScore"
                         align="center"
                         width="180"
                         label="初评得分">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         align="center"
                         width="240">
          <template slot-scope="scope">
            <el-button @click.native.prevent="detail(scope.row)"
                       type="text"
                       size="small">
              详情
            </el-button>
            <el-button @click.native.prevent="download(scope.row)"
                       type="text"
                       size="small">
              下载
            </el-button>
            <el-button @click.native.prevent="fenpei(scope.row)"
                       type="text"
                       size="small">
              分配终评专家
            </el-button>
            <el-button @click.native.prevent="pingjiang(scope.row)"
                       type="text"
                       size="small">
              评奖
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="随机分配专家"
                 :visible.sync="fenpeiShow">
        <el-table :data="expertList"
                  v-loading="loading">
          <el-table-column property="name"
                           label="姓名"
                           width="150"></el-table-column>
          <el-table-column property="department"
                           label="部门"
                           width="200"></el-table-column>
          <el-table-column property="mobile"
                           label="手机"></el-table-column>
        </el-table>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button @click="getExpert">重新随机分配</el-button> -->
          <el-button type="primary"
                     @click="sure">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 评奖 -->
      <el-dialog title="评奖"
                 :visible.sync="pingjiangShow">
        <el-radio v-model="finalScore"
                  label="1">一等奖</el-radio>
        <el-radio v-model="finalScore"
                  label="2">二等奖</el-radio>
        <el-radio v-model="finalScore"
                  label="3">三等奖</el-radio>
        <el-radio v-model="finalScore"
                  label="0">淘汰</el-radio>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button @click="getExpert">重新随机分配</el-button> -->
          <el-button type="primary"
                     @click="sureGrade">确 定</el-button>
        </div>
      </el-dialog>
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
import { getProjectList, updateFinalScore, chooseFinalExpert, getAllFinalReviewExpert, getDepartment, approve, getUserInfo } from '@/api/api';
export default {
  name: 'approve',
  components: {
  },
  data() {
    return {
      fenpeiShow: false,
      finalScore: '',
      pingjiangShow: false,
      userRole: 0,
      loading: false,
      expertList: [],
      rejectReason: '',
      listLoading: false,
      fenshuShow: false,
      allDepartment: [],
      total: 0,
      fenshu: {},
      projectId: '',
      approveParam: {
        projectId: '',
        mark: 0,
        view: ''
      },
      project: {
        applyDepartment: '',
        projectClass: '',
        status: 5,
        pageNo: 1
      },
      projectList: [],
    };
  },
  methods: {
    onExport() {
      if (this.projectList.length > 0) {
        window.open(`/api/project/exportMyProjectExcel/?applyDepartment=${this.project.applyDepartment}&projectClass=${this.project.projectClass}&status=${this.project.status}`);
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
    formatClass(data) {
      if (data.projectClass === 1) {
        return '在岗技术革新奖';
      } else {
        return '创新项目奖';
      }
    },
    fenpei(row) {
      this.projectId = row.id;
      this.getExpert();
      this.fenpeiShow = true;
    },
    sureGrade() {
      let param = {
        id: this.projectId,
        finalScore: this.finalScore
      }
      updateFinalScore(param).then(res => {
        if (res.successSign) {
          this.pingjiangShow = false;
          this.$message.success('操作成功');

        }
      })
    },
    getExpert() {
      this.loading = true;
      getAllFinalReviewExpert({ projectId: this.projectId }).then(res => {
        this.expertList = res.result;
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      })
    },
    sure() {
      let arr = [];
      for (let item of this.expertList) {
        arr.push(item.id);
      }
      arr = arr.join(',');
      let param = {
        projectId: this.projectId,
        userIds: arr
      }
      chooseFinalExpert(param).then(res => {
        if (res.resultCode === '200') {
          this.$message.success("成功");
          this.getAllProjectList();
          this.fenpeiShow = false;
        }
      })
    },
    pingjiang(row) {
      this.projectId = row.id;
      this.pingjiangShow = true;
    },
    grade(row) {
      this.$router.push({ path: '/expertRating', query: { id: row.id } })
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
            item.applyUser = item.applyUser.split(',');
          }
          this.total = res.pageVo.totalCount;
        } else {
          this.projectList = [];
        }
      })
    },
    gradeDetail(row) {
      console.log(row)
      this.fenshu = row;
      this.fenshuShow = true;
    },
    reject(row) {
      this.approveParam.view = '';
      this.approveParam.projectId = row.id;
      this.approveParam.mark = 0;
      this.rejectShow = true;
    },
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
          this.getAllProjectList();
          this.rejectShow = false;
        }
      })
    },
    detail(row) {
      this.$router.push({ path: '/projectDetail', query: { id: row.id } });
    },
    agree(row) {
      let param = {
        mark: 1,
        projectId: row.id,
        view: ''
      }
      approve(param).then(res => {
        if (res.successSign) {
          Message({
            message: res.message,
            type: 'success'
          });
          this.getAllProjectList();

        }
      })
    },

  },
  mounted() {
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
