<template>
  <div>
    <div class="trial-result">
      <div class="item">
        <h1>创新项目奖</h1>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column prop="name"
                           label="项目名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="类型"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="部门"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="申报人"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="领域"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           align="center"
                           label="关键字">
          </el-table-column>
        </el-table>
      </div>
      <div class="item">
        <h1>创新项目奖</h1>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column prop="name"
                           label="项目名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="类型"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="部门"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="申报人"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="领域"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           align="center"
                           label="关键字">
          </el-table-column>
        </el-table>
      </div>
      <div class="item">
        <h1>创新项目奖</h1>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column prop="name"
                           label="项目名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="类型"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="部门"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="申报人"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="领域"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           align="center"
                           label="关键字">
          </el-table-column>
        </el-table>
      </div>
      <div class="item">
        <h1>创新项目奖</h1>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column prop="name"
                           label="项目名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="类型"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="部门"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="申报人"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="领域"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           align="center"
                           label="关键字">
          </el-table-column>
        </el-table>
      </div>
      <div class="item">
        <h1>创新项目奖</h1>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column prop="name"
                           label="项目名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="类型"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="部门"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="申报人"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="领域"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           align="center"
                           label="关键字">
          </el-table-column>
        </el-table>
      </div>
      <div class="item">
        <h1>创新项目奖</h1>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column prop="name"
                           label="项目名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="类型"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="部门"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="申报人"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="领域"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           align="center"
                           label="关键字">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'firstTrial',
  components: {
  },
  data() {
    return {
      tableData: [{
        name: '应急保障平台',
        type: '项目创新奖'
      }, {
        type: '项目创新奖',
        name: '应急保障平台'
      },
      {
        type: '项目创新奖',
        name: '应急保障平台'
      }, {
        type: '项目创新奖',
        name: '应急保障平台'
      }]
    };
  }
};
</script>

<style lang='scss'>
.trial-result {
  padding: 40px;
  & h1 {
    margin: 20px 0;
  }
  .item {
    margin-bottom: 30px;
  }
}
</style>
