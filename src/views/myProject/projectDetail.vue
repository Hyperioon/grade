<template>
  <div class="innovation-project">
    <el-form ref="form"
             :model="project"
             class="form"
             label-width="120px"
             label-position="left">
      <el-form-item label="申报奖项">
        <span v-show="project.projectClass === 2">创新项目奖</span>
        <span v-show="project.projectClass === 1">在岗技术革新奖</span>
      </el-form-item>
      <el-form-item label="报奖成果名称">
        <span class="lang">{{project.name}}</span>
      </el-form-item>
      <el-form-item label="申报部门">
        <span>{{project.applyDepartment}}</span>
      </el-form-item>
      <el-form-item label="联合部门1">
        <span>{{project.unionDepartment1}}</span>
      </el-form-item>
      <el-form-item label="联合部门2">
        <span>{{project.unionDepartment2}}</span>
      </el-form-item>
      <el-form-item label="主要完成人">
        <div v-for="(item, index) in applyList">
          {{item}}
        </div>

      </el-form-item>
      <el-form-item label="报奖联系人">
        <div v-for="(item, index) in contact">
          {{item}}
        </div>

      </el-form-item>
      <el-form-item label="业务线领域"
                    v-show="project.projectClass === 2">
        <span>{{project.field}}</span>
      </el-form-item>
      <el-form-item v-show="project.projectClass === 1"
                    label="专业领域">
        <span>{{project.field}}</span>
      </el-form-item>
      <el-form-item label="任务来源"
                    v-show="project.projectClass === 2">
        <span class="desc lang">{{project.relevance}}</span>
      </el-form-item>
      <el-form-item label="关联实际工作"
                    v-show="project.projectClass === 1">
        <span class="desc lang">{{project.relevance}}</span>
      </el-form-item>
      <el-form-item label="成果简介">
        <span>{{project.introduction}}</span>
      </el-form-item>
      <el-form-item label='申报书'>
        <a :href="'/api/project/zipfileDownload?fileNames='+project.application">{{project.application}}</a>
      </el-form-item>
      <el-form-item label='证明材料'
                    v-show="project.projectClass === 2">
        <a :href="'/api/project/zipfileDownload?fileNames='+project.material">{{project.material}}</a>
      </el-form-item>
    </el-form>
    <el-button class="back" @click="$router.go(-1)">返回</el-button>

  </div>
</template>

<script>
import { Message } from 'element-ui';
import { createProject, updateProject, getAllLdapUsers, getProjectInfo } from '@/api/api';
export default {
  name: 'createProject',
  components: {
  },
  data() {
    return {
      contact: [],
      project: {
        projectClass: 2,
        name: '',
        material: '',
        application: '',
        applyDepartment: '',
        unionDepartment1: '',
        unionDepartment2: '',
        applyUser: '',
        contact: '',
        field: '',
        relevance: '',
        introduction: '',
      },
      applyList: []
    };
  },
  methods: {
    getInfo(id) {
      getProjectInfo({ projectId: id }).then(res => {
        if (res.successSign) {
          Object.assign(this.project, res.result);
          this.applyList = this.project.applyUser.split(',');
          this.contact = this.project.contact.split(',');
        } else {
          Message({
            message: res.message,
            type: 'error'
          });
        }
      })
    }
  },
  mounted() {
    this.getInfo(this.$route.query.id);
  }
};
</script>

<style lang='scss'>
.innovation-project {
  padding: 40px;
  .back {
    margin-top: 40px;
    width: 140px;
  }
  .el-form-item__label {
    font-weight: 600;
  }
  .form {
    width: 700px;
    color: #606266;
    .applyUser {
      width: 322px;
    }
    .apply-list {
      margin: 10px 0;
      .el-icon-close {
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .lang {
      width: 530px;
    }
    .desc .el-textarea__inner {
      height: 140px;
    }
    .submit {
      margin-top: 100px;
    }
  }
}
</style>
