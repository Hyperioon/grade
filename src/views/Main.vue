<template>
  <div>
    <div class="index">
      <p>
        你，是否点子满满，期待施展？</br>
        你，是否创意连连，渴望发言？</br>
        来，看这里！ </br>
        杭小研为你量身打造“创新磁场”，激发创新灵感，汇集创新结晶，奖励创新成效！</br>
      </p>

      <p>
        【关于我们】 </br>
        为调动公司全体员工的创新积极性，以创新驱动公司发展，助力公司业务提速。2018年，面向全员打造了两大创新活动平台：</br>
        “创新项目奖”——聚焦“大创新”，需要你们的创新成果依托公司研发项目，通过前沿技术研究和技术应用，取得关键技术突破、业务运营模式突破，实现业界领先……</br>
        “在岗技术革新奖”——聚焦“微创新”，需要你的创新成果解决实际工作困难、问题，不论你是从事管理、质量、研发还是支撑工作，只要是通过技术手段实现现有工作流程、方法的革新，统统皆可……</br>
      </p>
      <p>

        【申报流程】</br>
        “创新项目奖”——按照“部门推荐→专家评审组初评→公司创新领导小组终评”程序，最终决出年终大奖</br>
        “在岗技术革新奖”——全员皆可自主申报！而且，不限量！最终由专家评审组决定“花落谁家”</br>

      </p>
      <p>
        【奖项福利】</br>
        荣誉表彰……</br>
        更高奖项申报权利……</br>
        丰厚奖金……</br>
      </p>
      <div>
        <div class="add">
          <el-button class="add-button"
                     @click="$router.push({name: '创建项目', params: {projectClass: 2}})">创新项目奖</el-button>
          <span class="download" @click="download('申报书模板-创新项目奖.docx')">创新项目奖申报模板下载

          </span>
        </div>
        <div class="add">
          <el-button class="add-button"
                     @click="$router.push({name: '创建项目', params: {projectClass: 1}})">在岗技术革新奖</el-button>
          <span class="download" @click="download('申报书模板-在岗技术革新奖.pptx')">在岗技术革新奖申报模板下载</span>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { zipfileDownload } from '@/api/api';
export default {
  name: 'firstTrial',
  components: {
  },
  data() {
    return {
      innovationShow: false
    }
  },
  methods: {
    download(name) {
      let data = encodeURI(name);
      window.open(`/api/download?fileName=${data}`);
    }
  }
};
</script>

<style lang='scss' scoped>
.index {
  padding: 40px;
  .add {
    margin-top: 20px;
    position: relative;
    display: inline-block;
    margin-right: 100px;
    .add-button {
      padding: 14px 50px;
    }
    .download {
      color: #409eff;
      position: absolute;
      cursor: pointer;
      bottom: -40px;
      left: 0;
      font-size: 14px;
    }
  }
}
</style>

