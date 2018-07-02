<template>
  <div>
    <div class="my-project">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">
        <el-form-item label="部门">
          <el-select v-model="formInline.region"
                     placeholder="活动区域">
            <el-option label="综合部"
                       value="shanghai"></el-option>
            <el-option label="计划财务部"
                       value="beijing"></el-option>
            <el-option label="企业发展部"
                       value="beijing"></el-option>
            <el-option label="人力资源部"
                       value="beijing"></el-option>
            <el-option label="运营支撑部"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formInline.region"
                     placeholder="活动区域">
            <el-option label="创新项目奖"
                       value="shanghai"></el-option>
            <el-option label="在岗技术革新奖"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region"
                     placeholder="活动区域">
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
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData3"
                border
                style="width: 100%">
        <el-table-column prop="date"
                         label="项目名称"
                         align="center"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         align="center"
                         label="类型"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         align="center"
                         label="部门">
        </el-table-column>
        <el-table-column prop="name"
                         align="center"
                         label="申报人">
        </el-table-column>
        <el-table-column prop="name"
                         align="center"
                         label="领域">
        </el-table-column>
        <el-table-column prop="name"
                         align="center"
                         label="关键字">
        </el-table-column>
        <el-table-column prop="name"
                         align="center"
                         label="得分">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         align="center"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)"
                       type="text"
                       size="small">
              修改
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)"
                       type="text"
                       size="small">
              确认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       :page-size="100"
                       layout="prev, pager, next, jumper"
                       :total="10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'firstTrial',

  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      currentPage: 1,
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    };
  },
  methods: {
    handleSizeChange(val) {
      },
      handleCurrentChange(val) {
      }
  }
};
</script>

<style lang='scss'>
</style>
