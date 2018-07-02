<template>
  <div>
    <div class="my-project">
      <el-form :inline="true"
               :model="project"
               class="demo-form-inline">
        <el-form-item label="类型">
          <el-select clearable
                     @change="getAllProjectList"
                     v-model="project.projectClass"
                     placeholder="类型">
            <el-option label="创新项目奖"
                       :value="2"></el-option>
            <el-option label="在岗技术革新奖"
                       :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onExport">导出表格</el-button>
          <el-button type="primary"
                     @click="downResourse">下载所有材料</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="projectList"
                border
                v-show="project.projectClass === 2"
                v-loading="listLoading"
                style="width: 100%">
        <el-table-column prop="realname"
                         label="专家姓名"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="department"
                         label="专家部门"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="专家电话"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="benefit"
                         label="效益专家"
                         align="center"
                         :formatter="formatBenefit"
                         width="180">
        </el-table-column>
        <el-table-column prop="technology"
                         label="技术专家"
                         :formatter="formatTec"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="projectname"
                         label="项目名称"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="applyDepartment"
                         align="center"
                         width="180"
                         label="申报部门">
        </el-table-column>
        <el-table-column prop="field"
                         align="center"
                         width="140"
                         label="领域">
        </el-table-column>
        <el-table-column prop="firstScore"
                         align="center"
                         label="创新性"
                         width="180">
        </el-table-column>
        <el-table-column prop="secondScore"
                         align="center"
                         label="自主性"
                         width="180">
        </el-table-column>
        <el-table-column prop="thirdScore"
                         align="center"
                         label="效益性"
                         width="180">
        </el-table-column>
        <el-table-column prop="forthScore"
                         align="center"
                         label="可推广性"
                         width="180">
        </el-table-column>
        <el-table-column prop="totalScore"
                         align="center"
                         label="总分"
                         width="100">
        </el-table-column>
        <el-table-column prop="juniorStatus"
                         :formatter="formatJuniorStatus"
                         align="center"
                         label="状态"
                         width="100">
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
            <el-button @click.native.prevent="grade(scope.row)"
                       type="text"
                       v-show="scope.row.expertFinalScore === null"
                       size="small">
              打分
            </el-button>
            <el-button @click.native.prevent="download(scope.row)"
                       type="text"
                       size="small">
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="projectList"
                border
                v-show="project.projectClass === 1"
                v-loading="listLoading"
                style="width: 100%">
        <el-table-column prop="realname"
                         label="专家姓名"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="department"
                         label="专家部门"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="专家电话"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="benefit"
                         label="效益专家"
                         align="center"
                         :formatter="formatBenefit"
                         width="180">
        </el-table-column>
        <el-table-column prop="technology"
                         label="技术专家"
                         :formatter="formatTec"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="projectname"
                         label="项目名称"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="applyDepartment"
                         align="center"
                         width="180"
                         label="申报部门">
        </el-table-column>
        <el-table-column prop="field"
                         align="center"
                         width="140"
                         label="领域">
        </el-table-column>
        <el-table-column prop="firstScore"
                         align="center"
                         label="实用性"
                         width="180">
        </el-table-column>
        <el-table-column prop="secondScore"
                         align="center"
                         label="效益性"
                         width="180">
        </el-table-column>
        <el-table-column prop="thirdScore"
                         align="center"
                         label="先进性"
                         width="180">
        </el-table-column>
        <el-table-column prop="forthScore"
                         align="center"
                         label="示范性"
                         width="180">
        </el-table-column>
        <el-table-column prop="totalScore"
                         align="center"
                         label="总分"
                         width="100">
        </el-table-column>
        <el-table-column prop="juniorStatus"
                         :formatter="formatJuniorStatus"
                         align="center"
                         label="状态"
                         width="100">
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
            <el-button @click.native.prevent="grade(scope.row)"
                       type="text"
                       v-show="scope.row.expertFinalScore === null"
                       size="small">
              打分
            </el-button>
            <el-button @click.native.prevent="download(scope.row)"
                       type="text"
                       size="small">
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 驳回弹窗 -->
      <el-dialog title="驳回意见"
                 :visible.sync="rejectShow"
                 width="30%">
        <el-form-item label="创新性">
        </el-form-item>
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
import { getAdminProjectListByCondition, getDepartment, approve, getUserInfo } from '@/api/api';
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
      allDepartment: [],
      total: 0,
      approveParam: {
        projectId: '',
        mark: 0,
        view: ''
      },
      project: {
        projectClass: 2,
        pageNo: 1,
        action: 2
      },
      projectList: [],
    };
  },
  methods: {
    onExport() {
      window.open(`/api/project/getAdminProjectListByCondition?projectClass=${this.project.projectClass}&action=1&pageNo=1`);
    },
    downResourse() {
      if (this.projectList.length > 0) {
        window.open(`/api/project/getAdminProjectZip?projectClass=${this.project.projectClass}`);
      } else {
        this.$message.error('暂无文件');
      }
    },
    handleCurrentChange(val) {
      this.project.pageNo = val;
      this.getAllProjectList();
    },
    formatJuniorStatus(data) {
      if (data.juniorStatus === 2) {
        return '提交';
      } else if (data.juniorStatus === 1) {
        return '保存';
      } else {
        return '未打分';
      }
    },
    formatClass(data) {
      if (data.projectClass === 1) {
        return '在岗技术革新奖';
      } else {
        return '创新项目奖';
      }
    },
    grade(row) {
      this.$router.push({ path: '/expertRating', query: { id: row.id } })
    },
    formatBenefit(data) {
      if (data.benefit === 1) {
        return '是';
      } else {
        return '否';
      }
    },
    formatTec(data) {
      if (data.technology === 1) {
        return '是';
      } else {
        return '否';
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
          return '初评';
          break;
        case 5:
          return '已初评';
          break;
        case 6:
          return '终评';
          break;
        case 7:
          return '结果';
          break;
        case 8:
          return '驳回';
          break;
        default:
          return '获奖'
      }
    },
    getAllDepartment() {
      getDepartment().then(res => {
        this.allDepartment = res.result;
      })
    },
    getAllProjectList() {
      this.listLoading = true;
      getAdminProjectListByCondition(this.project).then(res => {
        if (res.successSign && res.result) {
          this.projectList = res.result.slice(res.pageVo.pageStartRow, res.pageVo.pageEndRow);
          setTimeout(() => {
            this.listLoading = false;
          }, 500)
          this.total = res.pageVo.totalCount;
        } else {
          this.projectList = [];
          this.listLoading = false;
        }
      })
    },
    reject(row) {
      this.approveParam.view = '';
      this.approveParam.projectId = row.id;
      this.approveParam.mark = 0;
      this.rejectShow = true;
    },
    download(row) {
      let data1 = encodeURI(row.application);
      let data2 = encodeURI(row.material);
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
      this.$router.push({ path: '/projectDetail', query: { id: row.projectId } });
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
