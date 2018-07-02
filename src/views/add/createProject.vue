<template>
  <div class="innovation-project">
    <el-form ref="form"
             :model="project"
             class="form"
             label-width="100px"
             label-position="left">
      <el-form-item label="申报奖项">
        <span v-show="project.projectClass === 2">创新项目奖</span>
        <span v-show="project.projectClass === 1">在岗技术革新奖</span>
      </el-form-item>
      <el-form-item label="报奖成果名称">
        <el-input class="lang"
                  placeholder="不超过30字"
                  @change='changeName'
                  v-model="project.name"></el-input>
      </el-form-item>
      <el-form-item label="申报部门">
        <el-select class="lang"
                   v-model="project.applyDepartment"
                   placeholder="请选择申报部门">
          <el-option v-for="item in allDepartment"
                     :key="item.description"
                     :label="item.description"
                     :value="item.description">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联合部门1">
        <el-select class="lang"
                   v-model="project.unionDepartment1"
                   placeholder="没有可不选">
          <el-option v-for="item in allDepartment"
                     :key="item.description"
                     :label="item.description"
                     :value="item.description">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联合部门2">
        <el-select class="lang"
                   v-model="project.unionDepartment2"
                   placeholder="没有可不选">
          <el-option v-for="item in allDepartment"
                     :key="item.description"
                     :label="item.description"
                     :value="item.description">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主要完成人">
        <div v-for="(item, index) in applyList">
          <div class="apply-list">
            <el-select v-model="item.departmentName"
                       @change="chooseDepartment($event, index)"
                       placeholder="请先选择部门">
              <el-option v-for="(i,index) in allDepartment"
                         :key="i.description"
                         :label="i.description"
                         :value="i.description">
              </el-option>
            </el-select>
            <el-select class='applyUser'
                       v-model="item.info"
                       filterable
                       @click.native="chooseUser(index)"
                       placeholder="请选择完成人">
              <el-option v-for="j in allUsers"
                         :key="j"
                         :label="j"
                         :value="j">
              </el-option>
            </el-select>
            <i class="el-icon-close"
               @click="deleteApply(index)"></i>
          </div>
        </div>
        <el-button @click="addApply"
                   type="primary">添加</el-button>
        <p>完成人是对项目做出实质贡献的人，是实际项目组成员，请认真核对，以免申报无效</p>
      </el-form-item>
      <el-form-item label="报奖联系人">
        <el-select v-model="contactDep"
                   @change="baojiang($event)"
                   placeholder="请先选择部门">
          <el-option v-for="item in allDepartment"
                     :key="item.description"
                     :label="item.description"
                     :value="item.description">
          </el-option>
        </el-select>
        <el-select class='applyUser'
                   v-model="contactInfo"
                   filterable
                   default-first-option
                   placeholder="评奖过程中日常事务的联系人，1人即可">
          <el-option v-for="item in baojiangren"
                     :key="item"
                     :label="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务线领域"
                    v-show="project.projectClass === 2">
        <el-select class="lang"
                   v-model="project.field"
                   placeholder="请选择业务线领域">
          <el-option label="数字家庭"
                     value="数字家庭"></el-option>
          <el-option label="能力开放"
                     value="能力开放"></el-option>
          <el-option label="智慧政企"
                     value="智慧政企"></el-option>
          <el-option label="安全保障"
                     value="安全保障"></el-option>
          <el-option label="其他"
                     value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="project.projectClass === 1"
                    label="专业领域">
        <el-select class="lang"
                   v-model="project.field"
                   placeholder="请选择专业领域">
          <el-option label="数字家庭"
                     value="数字家庭"></el-option>
          <el-option label="能力开放"
                     value="能力开放"></el-option>
          <el-option label="智慧政企"
                     value="智慧政企"></el-option>
          <el-option label="安全保障"
                     value="安全保障"></el-option>
          <el-option label="质量测试"
                     value="质量测试"></el-option>
          <el-option label="运营支撑"
                     value="运营支撑"></el-option>
          <el-option label="市场拓展"
                     value="市场拓展"></el-option>
          <el-option label="职能管理"
                     value="职能管理"></el-option>
          <el-option label="其他"
                     value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务来源"
                    v-show="project.projectClass === 2">
        <el-input class="desc lang"
                  type="textarea"
                  placeholder="按“年份，项目类别，研发计划内项目名称”格式填写。多个项目联合报奖的，请列出全部项目，项目名称要求来源项目管理系统"
                  v-model="project.relevance"></el-input>
      </el-form-item>
      <el-form-item label="关联实际工作"
                    v-show="project.projectClass === 1">
        <el-input class="desc lang"
                  :maxlength="30"
                  placeholder="描述本在岗革新依托的实际工作领域，不超过30字"
                  v-model="project.relevance"></el-input>
      </el-form-item>
      <el-form-item label="成果简介">
        <el-input class="desc lang"
                  type="textarea"
                  placeholder="简要描述该革新成果拟解决的实际工作问题、交付物及创新点、应用效果等，不超过300字"
                  v-model="project.introduction"></el-input>
      </el-form-item>
      <!-- el-form-item label="状态">
        <el-select v-model="project.region"
                   placeholder="请选择状态">
          <el-option label="草稿"
                     value="shanghai"></el-option>
          <el-option label="部门经历审核"
                     value="beijing"></el-option>
          <el-option label="企发专员审核"
                     value="beijing"></el-option>
          <el-option label="初评"
                     value="beijing"></el-option>
          <el-option label="终评"
                     value="beijing"></el-option>
          <el-option label="出局"
                     value="beijing"></el-option>
          <el-option label="获奖"
                     value="beijing"></el-option>
        </el-select>
      </el-form-item -->
      <el-form-item label='申报书上传'>
        <el-upload class="upload-demo"
                   v-show="project.name"
                   ref="upload"
                   :data="uploadData"
                   action="/api/fileUpload"
                   :on-remove="removeShenbao"
                   :on-success="shenbaoUpload"
                   :on-error='uploadError'
                   :before-upload="beforeUpload"
                   :file-list="shenbaoFile">
          <el-button size="small"
                     type="primary">点击上传</el-button>
        </el-upload>
        <el-tooltip v-show="!project.name"
                    content="请先填写报奖名称再上传证明材料"
                    placement="top">
          <el-button>请先填写报奖名称</el-button>
        </el-tooltip>

        <p>请按模版填写并上传申报书，文档名称为“申报书-报奖成果名称”</p>

      </el-form-item>
      <el-form-item label='证明材料'
                    v-show="project.projectClass === 2">
        <el-upload class="upload-demo"
                   v-show="project.name"
                   ref="upload"
                   action="api/fileUpload/"
                   accept=".java,.bmp,.jpg,.jpeg,.png,.gif,.ppt,.pptx,.PPT,.PPTX,.doc,.DOC,.docx,.DOCX,.xls,.xlsx,.XLS,.XLSX,.pdf,.PDF,.txt,.TXT,.zip,.ZIP,.rar,.RAR"
                   :data="uploadData"
                   :on-remove="handleRemove"
                   :on-success='fileUpload'
                   :on-error='uploadError'
                   :before-upload="beforeUpload"
                   :file-list="uploadFiles">
          <el-button size="small"
                     type="primary">点击上传</el-button>
        </el-upload>
        <el-tooltip v-show="!project.name"
                    content="请先填写报奖名称再上传证明材料"
                    placement="top">
          <el-button>请先填写报奖名称</el-button>
        </el-tooltip>
        <p>上传获奖证书、专利证书等扫描件，没有可不传</p>

      </el-form-item>

      <el-form-item class="submit">
        <el-button @click="onSubmit(0)">保存草稿</el-button>
        <el-button type="primary"
                   @click="onSubmit(1)">提交审核</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { createProject, updateProject, getAllLdapUsers, getDepartment, getUsersByDepartment, getProjectInfo } from '@/api/api';
export default {
  name: 'createProject',
  components: {
  },
  data() {
    return {
      userList: [],
      applyUser: [],
      shenbaoFile: [],
      uoloadUrl: '',
      department: '',
      department1: '',
      contactDep: '',
      contactInfo: '',
      uploadData: {
        projectName: '',
        random: ''
      },
      changename: false,
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
        action: 0
      },
      allUsers: [],
      baojiangren: [],
      applyList: [],
      departmentList: [],
      allDepartment: [],
      nextId: 0,
      uploadFiles: []
    };
  },
  methods: {
    getAllUser() {
      getAllLdapUsers().then(res => {
        for (let item of res.result) {
          let user = `${item.realName}-${item.userMobile}`;
          this.allUsers.push(user);
        }
      })
    },
    uploadError(error) {
      this.$message.error(error);
    },
    addApply() {
      if (this.project.projectClass === 1 && this.applyList.length > 4) {
        this.$message.error('最多5人！')
      } else {
        this.applyList.push({
          id: ++this.nextId
        })
      }
    },
    deleteApply(index) {
      this.applyList.splice(index, 1)
    },
    chooseUser(index) {
      this.allUsers = [];
      let params = {
        department: this.departmentList[index]
      }
      let arr = [];
      getUsersByDepartment(params).then(res => {
        if (res.successSign) {
          for (let item of res.result) {
            let user = `${item.name}-${item.mobile}`;
            arr.push(user);
          }
          this.allUsers = arr;
        } else {
          Message({
            message: data.response.message,
            type: 'error'
          })
        }
      })
    },
    chooseDepartment($event, index) {
      // 报奖联系人
      if (index === -1) {
        this.contactInfo = '';
      } else { // 完成人
        // this.applyList[index].info = '';
        // console.log($event)
        this.departmentList[index] = $event;
      }
    },
    baojiang($event) {
      this.contactInfo = '';
      let params = {
        department: $event
      }
      let arr = [];
      getUsersByDepartment(params).then(res => {
        if (res.successSign) {
          for (let item of res.result) {
            let user = `${item.name}-${item.mobile}`;
            arr.push(user);
          }
          this.baojiangren = arr;
        } else {
          Message({
            message: data.response.message,
            type: 'error'
          })
        }
      })
    },
    getAllDepartment() {
      getDepartment().then(res => {
        this.allDepartment = res.result;
      })
    },
    beforeUpload(file) {
      this.uploadData.projectName = this.project.name;
      let index = file.name.lastIndexOf('.');
      let type = file.name.substring(index + 1);
      let reg = "java,bmp,jpg,jpeg,png,gif,ppt,pptx,PPT,PPTX,doc,DOC,docx,DOCX,xls,xlsx,XLS,XLSX,pdf,PDF,txt,TXT,zip,ZIP,rar,RAR";
      let checked = reg.indexOf(type) !== -1;
      if (reg.indexOf(type) === -1) {
        this.$message.error('文件类型不正确！');
      }
      const isLt2M = file.size / 1024 / 1024 < 1024;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1GB!');
      }
      return isLt2M && checked;
    },
    fileUpload(file, fileList) {
      if (file.successSign) {
        this.uploadFiles.push(fileList);
        this.changename = false;
      } else {
        this.uploadError(file.message);
      }
    },
    shenbaoUpload(file, fileList) {
      if (file.successSign) {
        this.shenbaoFile.push(fileList);
        this.changename = false;
      } else {
        this.uploadError(file.message);
      }
    },

    handleRemove(file, fileList) {
      this.uploadFiles = fileList;
    },
    removeShenbao(file, fileList) {
      this.shenbaoFile = fileList;
    },
    changeName() {
      this.changename = true;
      this.uploadFiles = [];
      this.shenbaoFile = [];
    },
    getInfo(id) {
      getProjectInfo({ projectId: id }).then(res => {
        if (res.successSign) {
          Object.assign(this.project, res.result);
          // this.applyUser = this.project.applyUser.split(',');
          let index = this.project.contact.indexOf('-');
          // 报奖联系人信息拼接
          this.contactDep = this.project.contact.substring(0, index);
          this.contactInfo = this.project.contact.substring(index + 1);
          // 完成人拼接
          let arr = this.project.applyUser.split(',');
          let indexList = [];
          for (let item of arr) {
            indexList.push(item.indexOf('-'));
          }
          for (let i = 0; i < arr.length; i++) {
            this.applyList.push({
              departmentName: arr[i].substring(0, indexList[i]),
              info: arr[i].substring(indexList[i] + 1),
              id: i
            });
          }
          // 文件
          if (this.project.material.length > 0) {
            let fileArr = this.project.material.split(',');
            let obj = {};
            for (let i = 0; i < fileArr.length; i++) {
              obj.name = fileArr[i];
              obj.url = fileArr[i];
              this.uploadFiles.push(obj);
            }
          } else {
            this.uploadFiles = [];
          }

          let shenbaoArr = this.project.application.split(',');
          let shenbaoObj = {}
          for (let i = 0; i < shenbaoArr.length; i++) {
            shenbaoObj.name = shenbaoArr[i];
            shenbaoObj.url = shenbaoArr[i];
            this.shenbaoFile.push(shenbaoObj);
          }
        } else {
          Message({
            message: res.message,
            type: 'error'
          });
        }
      })
    },
    onSubmit(status) {
      this.project.contact = `${this.contactDep}-${this.contactInfo}`;
      this.project.action = status; // 0保存， 1提交
      // 编辑
      if (!this.changename) {
        if (this.$route.params.projectId) {
          let list = [];
          for (let item of this.uploadFiles) {
            if (item.response) {
              list = list.concat(item.response.result);
            } else {
              list = list.concat(item.name);
            }
          }
          list = list.join(',');
          this.project.material = list;
          let shenbaoList = [];
          for (let item of this.shenbaoFile) {
            if (item.response) {
              shenbaoList = shenbaoList.concat(item.response.result);
            } else {
              shenbaoList = shenbaoList.concat(item.name);
            }
          }
          shenbaoList = shenbaoList.join(',');
          this.project.application = shenbaoList;
        } else { // 创建
          if (this.uploadFiles.length > 0) {
            let list = [];
            for (let item of this.uploadFiles) {
              list = list.concat(item.response.result);
            }
            list = list.join(',');
            this.project.material = list;
          }
          if (this.shenbaoFile.length > 0) {
            let shenbaoList = [];
            for (let item of this.shenbaoFile) {
              shenbaoList = shenbaoList.concat(item.response.result);
            }
            shenbaoList = shenbaoList.join(',');
            this.project.application = shenbaoList;
          }
        }
        let arr = [];
        for (let item of this.applyList) {
          arr.push(`${item.departmentName}-${item.info}`)
        }
        this.project.applyUser = arr.join(',');
        if (this.project.id) {
          updateProject(this.project).then(res => {
            if (res.successSign) {
              Message({
                message: '操作成功',
                type: 'success'
              });
              this.$router.push({ path: '/myProject' });
            } else {
              Message({
                message: res.message,
                type: 'error'
              });
            }
          })
        } else {
          createProject(this.project).then(res => {
            if (res.successSign) {
              Message({
                message: '操作成功',
                type: 'success'
              });
              this.$router.push({ path: '/myProject' });
            } else {
              Message({
                message: res.message,
                type: 'error'
              });

            }
          })
        }
      } else {
        if (this.project.projectClass === 2) {
          this.$message.error('请重新上传申报书，证明材料！');
        } else {
          this.$message.error('请重新上传申报书！');
        }
      }
    },

  },
  mounted() {
    this.uploadData.random = Date.parse(new Date());
    if (this.$route.params.projectClass) {
      this.project.projectClass = this.$route.params.projectClass;
    }
    if (this.$route.params.projectId) {
      this.getInfo(this.$route.params.projectId);
    } else {
      this.applyList.push({ id: 0, departmentName: '', info: '' });
    }
    this.getAllDepartment();
  }
};
</script>

<style lang='scss'>
.innovation-project {
  padding: 40px;
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
