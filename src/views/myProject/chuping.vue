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
                         label="申报部门">
        </el-table-column>
        <el-table-column align="left"
                         width="360"
                         label="主要完成人">
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
                       v-show="scope.row.juniorStatus !==1 && scope.row.juniorStatus !==2"
                       size="small">
              打分
            </el-button>
            <el-button @click.native.prevent="grade(scope.row)"
                       type="text"
                       v-show="scope.row.juniorStatus === 1"
                       size="small">
              修改
            </el-button>
            <el-button @click.native.prevent="gradeDetail(scope.row)"
                       type="text"
                       v-show="scope.row.juniorStatus === 2"
                       size="small">
              打分情况
            </el-button>
            <el-button @click.native.prevent="download(scope.row)"
                       type="text"
                       size="small">
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分数弹窗 -->
      <el-dialog title="打分情况"
                 v-show="fenshu.projectClass === 1"
                 :visible.sync="fenshuShow"
                 width="30%">
        <el-form ref="form"
                 :model="fenshu"
                 label-position="left"
                 label-width="100px">
          <el-form-item label="实用性">
            <span>{{fenshu.firstScore}}分</span>
          </el-form-item>
          <el-form-item label="效益性">
            <span>{{fenshu.secondScore}}分</span>
          </el-form-item>
          <el-form-item label="先进性">
            <span>{{fenshu.thirdScore}}分</span>
          </el-form-item>
          <el-form-item label="示范性">
            <span>{{fenshu.forthScore}}分</span>
          </el-form-item>
          <el-form-item label="总分">
            <span>{{fenshu.totalScore}}分</span>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="fenshuShow = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="打分情况"
                 v-show="fenshu.projectClass === 2"
                 :visible.sync="fenshuShow"
                 width="30%">
        <el-form ref="form"
                 :model="fenshu"
                 label-position="left"
                 label-width="100px">
          <el-form-item label="创新性">
            <span>{{fenshu.firstScore}}分</span>
          </el-form-item>
          <el-form-item label="自主性">
            <span>{{fenshu.secondScore}}分</span>
          </el-form-item>
          <el-form-item label="效益性">
            <span>{{fenshu.thirdScore}}分</span>
          </el-form-item>
          <el-form-item label="可推广性">
            <span>{{fenshu.forthScore}}分</span>
          </el-form-item>
          <el-form-item label="总分">
            <span>{{fenshu.totalScore}}分</span>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="fenshuShow = false">确 定</el-button>
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
import { getExpertProjectListByCondition, getDepartment, approve, getUserInfo } from '@/api/api';
export default {
  name: 'approve',
  components: {
  },
  data() {
    return {
      userRole: 0,
      rejectReason: '',
      listLoading: false,
      fenshuShow: false,
      allDepartment: [],
      total: 0,
      fenshu: {},
      approveParam: {
        projectId: '',
        mark: 0,
        view: ''
      },
      project: {
        projectClass: '',
        projectName: '',
        applyDepartment: '',
        pageNo: 1,
        action: 2
      },
      projectList: [],
    };
  },
  methods: {
    onExport() {
      if (this.projectList.length > 0) {
        window.open(`/api/expert/getExpertProjectListByCondition?projectClass=${this.project.projectClass}&projectName=${this.project.projectName}&applyDepartment=${this.project.applyDepartment}&action=1&pageNo=1`);
      } else {
        this.$message.error('暂无文件');
      }
    },
    downResourse() {
      if (this.projectList.length > 0) {
        window.open(`/api/expert/getExpertProjectListByCondition?projectClass=${this.project.projectClass}&action=3`);
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
    grade(row) {
      console.log(row)
      this.$router.push({ path: '/expertRating', query: { id: row.projectId } })
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
      getExpertProjectListByCondition(this.project).then(res => {
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
