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
          <el-button @click="getProjectList">查询</el-button>
          <el-button type="primary"
                     @click="onExport">导出表格</el-button>
          <el-button type="primary"
                     @click="downResourse">下载所有材料</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="myProjectList"
                border
                v-loading="listLoading"
                style="width: 100%">
        <el-table-column prop="name"
                         label="项目名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="projectClass"
                         align="center"
                         label="类型"
                         :formatter="formatClass">
        </el-table-column>
        <el-table-column prop="applyDepartment"
                         align="center"
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
                         label="领域">
        </el-table-column>

        <el-table-column prop="status"
                         align="center"
                         :formatter="formatStatus"
                         label="状态">
        </el-table-column>
        <el-table-column prop="departView"
                         align="center"
                         label='部门审批人意见'>
        </el-table-column>
        <el-table-column prop="managerView"
                         align="center"
                         label='管理员意见'>
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
                       v-show="scope.row.status === 0 || scope.row.status === 8"
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
  name: 'myProject',
  components: {
  },
  data() {
    return {
      rejectReason: '',
      active: false,
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
      myProjectList: []
    };
  },
  methods: {
    onExport() {
      window.open(`/api/project/exportMyProjectExcel?applyDepartment=${this.project.applyDepartment}&projectClass=${this.project.projectClass}&status=${this.project.status}&myProject=0`);
    },
    downResourse() {
      if (this.myProjectList.length > 0) {
        window.open(`/api/project/downZip?applyDepartment=${this.project.applyDepartment}&projectClass=${this.project.projectClass}&status=${this.project.status}&myProject=1`);
      } else {
        this.$message.error('暂无文件');
      }
    },
    onSubmit(row) {
      row.action = 1;
      row.applyUser = row.applyUser.join(',');
      updateProject(row).then(res => {
        if (res.successSign) {
          Message({
            message: '操作成功',
            type: 'success'
          });
          this.getProjectList();
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
          return '删除'
      }
    },
    getProjectList() {
      getMyProjectList({ projectClass: this.project.projectClass }).then(res => {
        if (res.successSign && res.result) {
          this.myProjectList = res.result;
          for (let item of this.myProjectList) {
            item.applyUser = item.applyUser.split(',');
          }
        } else {
          this.myProjectList = [];

        }
      })
    },
    edit(row) {
      this.$router.push({ name: '创建项目', params: { projectId: row.id, projectClass: row.projectClass } });
    },
    detail(row) {
      this.$router.push({path: '/projectDetail', query: {id: row.id}});
    },
    download(row) {
      let data1 = encodeURI(row.application);
      let data2 = encodeURI(row.material);
      window.open(`/api/project/zipfileDownload?fileNames=${data1},${data2}`);
    },
  },
  mounted() {
    this.getProjectList();
  }
};
</script>

<style lang='scss'>
.my-project {
  padding: 40px;
  .active {
    cursor: pointer;
    color: #000;
  }
}
</style>
