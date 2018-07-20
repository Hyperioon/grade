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
        <el-form-item label="部门">
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
        <el-table-column prop="projectname"
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

        <el-table-column label="操作"
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
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="打分"
                         align="center"
                         width="200">
          <template slot-scope="scope">
            <el-input placeholder="输入1-100的整数"
                      @blur="dafen(scope.row)"
                      type="email"
                      v-show="scope.row.finalStatus !== 2"
                      @keyup.native="scope.row.leaderScore =  scope.row.leaderScore.replace(/[^\d]/g, '')"
                      v-model="scope.row.leaderScore"
                      size="small"></el-input>
            <span v-show="scope.row.finalStatus === 2">{{scope.row.leaderScore}}</span>
          </template>
        </el-table-column>
      </el-table>
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
      <div class="button-wrap"
           v-show="oprerate">
        <el-button @click="submit(1)">保存</el-button>
        <el-button type="primary"
                   @click="submit(2)">提交</el-button>
      </div>
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
import { zhongpingList, getDepartment, batchGrade, getUserInfo } from '@/api/api';
export default {
  name: 'zhongping',
  components: {
  },
  data() {
    return {
      userRole: 0,
      rejectReason: '',
      listLoading: false,
      rejectShow: false,
      oprerate: false,
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
        status: 6,
        pageNo: 1,
        action: 2
      },
      projectList: [],
    };
  },
  methods: {
    onExport() {
      if (this.projectList.length > 0) {
        window.open(`/api/leader/getExpertProjectListByCondition/?projectClass=${this.project.projectClass}&projectName=${this.project.projectName}&applyDepartment=${this.project.applyDepartment}&action=1`);
      } else {
        this.$message.error('暂无文件');
      }
    },
    downResourse() {
      if (this.projectList.length > 0) {
        window.open(`/api/leader/getExpertProjectListByCondition?projectClass=${this.project.projectClass}&action=3`);
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
    getAllDepartment() {
      getDepartment().then(res => {
        this.allDepartment = res.result;
      })
    },
    detail(row) {
      this.$router.push({ path: '/projectDetail', query: { id: row.projectId } });
    },
    dafen(row) {
      if (row.leaderScore % 1 !== 0) {
        this.$message.error('请输入整数！');
      }
      let leaderScore = parseInt(row.leaderScore);
      if (leaderScore > 100 || leaderScore < 0) {
        this.$message.error('分数不符合要求！');
      }
    },
    submit(action) {
      let arr = [];
      let ids = [];
      let projectIds = [];
      for (let item of this.projectList) {
        if (!item.leaderScore) {
          item.leaderScore = 'noScore'
        }
        if (item.finalStatus !== 2) {
          arr.push(item.leaderScore);
          ids.push(item.id);
          projectIds.push(item.projectId);
        }
      }
      let param = {
        ids: ids.join(','),
        projectIds: projectIds.join(','),
        leaderScores: arr.join(','),
        finalStatus: action
      }
      batchGrade(param).then(res => {
        if (res.successSign) {
          this.$message.success('操作成功');
          this.getAllProjectList();
        }
      })
    },
    getAllProjectList() {
      zhongpingList(this.project).then(res => {
        if (res.successSign && res.result) {
          this.projectList = res.result.slice(res.pageVo.pageStartRow, res.pageVo.pageEndRow);
          for (let item of this.projectList) {
            item.role = this.userRole;
            item.applyUser = item.applyUser.split(',');
            console.log(item.finalStatus)
            if (item.finalStatus !== 2) {
              this.oprerate = true;
            }
            if (item.leaderScore === 'noScore') {
              console.log('hehe')
              item.leaderScore = '';
            }

          }
          this.total = res.pageVo.totalCount;
        } else {
          this.projectList = [];
        }
      })
    },
    getUser() {
      getUserInfo().then(res => {
        this.userRole = res.result.role;
        console.log(this.userRole)
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
    }
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
  .button-wrap {
    margin: 20px;
  }
}
</style>
