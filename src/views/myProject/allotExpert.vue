<template>
  <div>
    <div class="my-project">
      <!-- el-form :inline="true"
               :model="project"
               class="demo-form-inline">
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
                       value="0"></el-option>
            <el-option label="部门经历审核"
                       value="1"></el-option>
            <el-option label="企发专员审核"
                       value="2"></el-option>
            <el-option label="初评"
                       value="3"></el-option>
            <el-option label="终评"
                       value="4"></el-option>
            <el-option label="出局"
                       value="5"></el-option>
            <el-option label="获奖"
                       value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getMyProjectList">查询</el-button>
          <el-button type="primary"
                     @click="onExport">导出表格</el-button>
        </el-form-item>
      </el-form -->
      <el-button type="primary"
                 style="margin-bottom: 30px;"
                 @click="onExport">导出表格</el-button>
      <el-table :data="myProjectList"
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
        <el-table-column prop="applyUser"
                         align="center"
                         width="340"
                         label="申报人">
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
            <el-button @click.native.prevent="edit(scope.row)"
                       type="text"
                       v-show="scope.row.status === 0 "
                       size="small">
              编辑
            </el-button>
            <el-button @click.native.prevent="onSubmit(scope.row)"
                       type="text"
                       v-show="scope.row.status === 0"
                       size="small">
              提交
            </el-button>
            <el-button @click.native.prevent="download(scope.row)"
                       type="text"
                       size="small">
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { getMyProjectList, updateProject } from '@/api/api';
export default {
  name: 'allotExpert',
  components: {
  },
  data() {
    return {
      rejectReason: '',
      listLoading: false,
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
        status: '',
        pageNo: 1
      },
      projectList: [],
      myProjectList: []
    };
  },
  methods: {
    onExport() {
      window.open(`/api/project/exportMyProjectExcel?applyDepartment=${this.project.applyDepartment}&projectClass=${this.project.projectClass}&status=${this.project.status}`);
    },
    onSubmit(row) {
      row.action = 1;
      updateProject(row).then(res => {
        if (res.successSign) {
          Message({
            message: '操作成功',
            type: 'success'
          });
          this.getMyProjectList();
        } else {
          Message({
            message: res.message,
            type: 'error'
          });

        }
      })
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
          return '部门经理审核';
          break;
        case 2:
          return '企发专员审核';
          break;
        case 3:
          return '初评';
          break;
        case 4:
          return '终评';
          break;
        case 5:
          return '出局';
          break;
        default:
          return '获奖'
      }
    },
    getMyProjectList() {
      getMyProjectList().then(res => {
        if (res.successSign) {
          this.myProjectList = res.result;
        } else {
          Message({
            message: res.message,
            type: 'error'
          });
        }
      })
    },
    edit(row) {
      this.$router.push({ name: '创建项目', params: { projectId: row.id, projectClass: row.projectClass } });
    },
    detail(row) {
      this.$router.push({ path: '/projectDetail', query: { id: row.id } });
    },
    download(row) {
      let data1 = encodeURI(row.application);
      let data2 = encodeURI(row.material);
      window.open(`/api/project/zipfileDownload?fileNames=${data1},${data2}`);
    },
  },
  mounted() {
    this.getMyProjectList();
  }
};
</script>

<style lang='scss'>
.my-project {
  padding: 40px;
}
</style>
