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
                       value="2"></el-option>
            <el-option label="在岗技术革新奖"
                       value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="project.projectName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getAllProjectList">查询</el-button>
          <el-button type="primary"
                     style="margin-bottom: 30px;"
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

        <el-table-column prop="expertFinalScore"
                         align="center"
                         width="140"
                         label="评初得分">
        </el-table-column>
        <el-table-column prop="leaderFinalScore"
                         align="center"
                         width="140"
                         label="终评得分">
        </el-table-column>
        <el-table-column prop="finalScore"
                         align="center"
                         :formatter="formatFinal"
                         width="140"
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
            <el-button @click.native.prevent="agree(scope.row)"
                       type="text"
                       v-show="scope.row.status === 1 && scope.row.role !== 0"
                       size="small">
              同意
            </el-button>
            <el-button @click.native.prevent="reject(scope.row)"
                       type="text"
                       v-show="scope.row.status === 1 && scope.row.role !== 0"
                       size="small">
              驳回
            </el-button>
            </el-button>
            <el-button @click.native.prevent="download(scope.row)"
                       type="text"
                       size="small">
              下载
            </el-button>
            <el-button @click.native.prevent="pingjiang(scope.row)"
                       type="text"
                       size="small">
              评奖
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <!-- 驳回弹窗 -->
      <el-dialog title="驳回意见"
                 :visible.sync="rejectShow"
                 width="30%">
        <el-input type="textarea"
                  v-model="approveParam.view"></el-input>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="rejectShow = false">取 消</el-button>
          <el-button type="primary"
                     @click="ensuerReject">确 定</el-button>
        </span>
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
import { getProjectList, getDepartment, approve, updateFinalScore, getUserInfo } from '@/api/api';
export default {
  name: 'approve',
  components: {
  },
  data() {
    return {
      userRole: 0,
      rejectReason: '',
      listLoading: false,
      rejectShow: false,
      pingjiangShow: false,
      allDepartment: [],
      finalScore: '',
      total: 0,
      projectId: '',
      approveParam: {
        projectId: '',
        projectName: '',
        mark: 0,
        view: ''
      },
      project: {
        applyDepartment: '',
        projectClass: '',
        status: 7,
        pageNo: 1
      },
      projectList: [],
    };
  },
  methods: {
    onExport() {
      if (this.projectList.length > 0) {
        window.open(`/api/project/exportMyProjectExcel/?projectClass=${this.project.projectClass}&projectName=${this.project.projectName}&status=${this.project.status}`);
      } else {
        this.$message.error('暂无文件');
      }
    },
    downResourse() {
      if (this.projectList.length > 0) {
        window.open(`/api/project/downZip?projectClass=${this.project.projectClass}&status=${this.project.status}&myProject=1`);
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
      console.log(param)
      chooseFinalExpert(param).then(res => {
        if (res.resultCode === '200') {
          this.$message.success("成功");
          this.getAllProjectList();
          this.fenpeiShow = false;
        }
      })
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
          this.getAllProjectList();
        }
      })
    },
    getUser() {
      getUserInfo().then(res => {
        this.userRole = res.result.role;
      })
    },
    edit(row) {
      this.$router.push({ name: '创建项目', params: { projectId: row.id, projectClass: row.projectClass } });
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
    detail(row) {
      this.$router.push({ path: '/projectDetail', query: { id: row.id } });
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
    pingjiang(row) {
      this.projectId = row.id;
      this.pingjiangShow = true;
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
    this.getUser();
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
