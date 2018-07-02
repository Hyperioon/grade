<template>
  <div class="expert-rating">
    <el-table v-show="project.projectClass === 1"
              :data="tableData"
              border
              style="width: 100%">
      <el-table-column prop="date"
                       label="评分项"
                       align="center"
                       width="80">
      </el-table-column>
      <el-table-column prop="name"
                       align="center"
                       label="分值"
                       width="80">
      </el-table-column>
      <el-table-column prop="address"
                       width="250"
                       label="说明">
      </el-table-column>
      <el-table-column label="评分标准">
        <template scope="scope">
          <div v-for="item in scope.row.standard">
            <div class="item">{{item}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="打分"
                       width="100">
        <template slot-scope="scope">
          <el-input type="text"
                    size="small"
                    v-model="scope.row.rating"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-table v-show="project.projectClass === 2"
              :data="tableData2"
              border
              style="width: 100%">
      <el-table-column prop="date"
                       label="评分项"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="name"
                       align="center"
                       label="分值"
                       width="80">
      </el-table-column>
      <el-table-column prop="address"
                       width="250"
                       label="说明">
      </el-table-column>
      <el-table-column label="评分标准">
        <template scope="scope">
          <div v-for="item in scope.row.standard">
            <div class="item">{{item}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="打分"
                       width="100">
        <template slot-scope="scope">
          <el-input type="text"
                    size="small"
                    v-model="scope.row.rating"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-form label-position="left"
             class="form"
             label-width="80px">
      <el-form-item label="备注">
        <el-input type="textarea"
                  v-model="params.introduction"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit(1)">保存</el-button>
        <el-button type="primary"
                   @click="onSubmit(2)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { grade, getExpertScore } from '@/api/api';
export default {
  data() {
    return {
      project: {},
      expertscore: {},
      params: {
        projectId: '',
        firstScore: '',
        secondScore: '',
        thirdScore: '',
        forthScore: '',
        introduction: ''
      },
      tableData: [{
        date: '实用性',
        name: '30',
        address: '评价在岗革新解决的实际问题情况',
        standard: ['与实际工作结合非常紧密,面向一线生产运营和一线创新需求，从解决实际工作问题出发，与公司重点工作或者部门考核事项紧密相关， 25-30',
          '与实际工作结合比较紧密, 面向一线生产运营和一线创新需求，从解决实际工作问题出发，与公司重点工作或者部门考核事项有一定相关，15-25',
          '与我公司实际生产运营相关性很少或基本没有,0-15'],
        rating: ''
      }, {
        date: '效益性',
        name: '30',
        address: '评价实际应用带来的效率提升、效益提升情况',
        standard: ['工作效率提升/成本节约、经济/社会/生态效益提升等很明显，提供的数据及证明非常充分且可信，25-30',
          '工作效率提升/成本节约、经济/社会/生态效益提升等比较明显，提供的数据及证明比较充分和可信，15-25',
          '工作效率提升/成本节约、经济/社会/生态效益提升等一般或基本没有0-15'],
        rating: ''
      }, {
        date: '先进性',
        name: '30',
        address: '评价工具、方法等的创新性、新颖性',
        standard: ['工具、方法等（或者其使用的技术）具有较强的创新性，在行业或者集团内属于首创，25-30',
          '工具、方法等（或者其使用的技术）的创新性尚可，在杭研内属于首创，填补了我公司相关技术空白，15-25',
          '工具、方法等（或者其使用的技术）的创新性不明显0-15'],
        rating: ''

      }, {
        date: '示范性',
        name: '10',
        address: '评价工具、方法等的可推广性或可复制性',
        standard: ['工具、方法等在很多工作领域、很多部门或公司都具有可推广性,8-10',
          '工具、方法等在一些工作领域、一些部门或公司具有可推广性,8-10',
          '工具、方法等个性化很强，不具备向外推广的可能,0-4'],
        rating: ''
      }],
      tableData2: [{
        date: '创新性',
        name: '40',
        address: '评价技术方案完整性、先进性、创新性',
        standard: ['技术方案完整，且创新性突出，对比国内外同类技术具有明显领先性，30-40',
          '技术方案基本完整，创新性尚可，但相对国内外同类技术领先性不够突出,15-30',
          '方案存在较为明显的缺陷，创新性不明显,0-15'],
        rating: ''
      }, {
        date: '自主性',
        name: '10',
        address: '评价技术获得知识产权情况',
        standard: ['具备已获授权的发明专利，软件著作权登记证书及其他知识产权证明，知识产权数量较多,8-10',
          '具备通过集团评审或已提交专利受理通知书或已进入实审阶段的发明专利，软件著作权登记证书及其他知识产权证明，知识产权数量一般，4-8',
          '知识产权数量较少或基本没有,0-4'],
        rating: ''

      }, {
        date: '效益性',
        name: '40',
        address: '评价技术应用规模及实际产生的经济、社会效益情况',
        standard: ['技术应用单位或用户数量多，具备良好的经济效益及社会效益，30-40',
          '技术应用单位或用户数量一般，经济效益及社会效益一般，15-30',
          '技术应用单位或用户数量较少，经济效益及社会效益较差，0-15'],
        rating: ''

      }, {
        date: '可推广性',
        name: '10',
        address: '评价技术推广前景',
        standard: ['技术推广性强，具有示范性，可产生规模化应用前景,8-10',
          '技术推广性一般，具有一定示范性，可产生一定规模化应用前景,4-8',
          '技术推广性较弱，不具备示范性，难以产生规模化应用前景,0-4'],
        rating: ''

      }]
    }
  },
  methods: {
    getProject() {
      let param = {
        projectId: this.params.projectId
      }
      getExpertScore(param).then(res => {
        if (res.result) {
          this.project = res.result[0].project;
          this.expertscore = res.result[0].expertscore;
          this.params.introduction = this.expertscore.introduction;
          if (this.project.projectClass === 1) {
            this.tableData[0].rating = this.expertscore.firstScore;
            this.tableData[1].rating = this.expertscore.secondScore;
            this.tableData[2].rating = this.expertscore.thirdScore;
            this.tableData[3].rating = this.expertscore.forthScore;
          } else {
            this.tableData2[0].rating = this.expertscore.firstScore;
            this.tableData2[1].rating = this.expertscore.secondScore;
            this.tableData2[2].rating = this.expertscore.thirdScore;
            this.tableData2[3].rating = this.expertscore.forthScore;
          }
        }
      })
    },
    // 提交
    onSubmit(value) {
      if (this.project.projectClass === 2) {
        this.params.firstScore = this.tableData2[0].rating;
        this.params.secondScore = this.tableData2[1].rating;
        this.params.thirdScore = this.tableData2[2].rating;
        this.params.forthScore = this.tableData2[3].rating;
      } else {
        this.params.firstScore = this.tableData[0].rating;
        this.params.secondScore = this.tableData[1].rating;
        this.params.thirdScore = this.tableData[2].rating;
        this.params.forthScore = this.tableData[3].rating;
      }
      this.params.juniorStatus = value;
      grade(this.params).then(res => {
        if (res.resultCode === '200') {
          this.$message.success('评分成功！');
          this.$router.push('/chuping');
        }
      })
    }
  },
  mounted() {
    this.params.projectId = this.$route.query.id;
    this.getProject();
  }
}
</script>

<style lang='scss' scoped>
.expert-rating {
  padding: 40px 40px 0 40px;
  .item {
    line-height: 28px;
    border-bottom: 1px solid #dfe6ec;
  }
  .form {
    width: 800px;
    margin: 30px 0;
  }
}
</style>

