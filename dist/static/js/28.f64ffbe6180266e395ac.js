webpackJsonp([28],{514:function(e,t,a){a(648);var l=a(201)(a(603),a(680),null,null);e.exports=l.exports},603:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"firstTrial",components:{},data:function(){return{formInline:{user:"",region:""},currentPage:1,tableData3:[{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-08",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-06",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-07",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"}]}},methods:{onSubmit:function(){},handleSizeChange:function(e){},handleCurrentChange:function(e){}}}},616:function(e,t,a){t=e.exports=a(482)(),t.push([e.i,".final-trial{padding:40px}.final-trial .pagination{margin-top:116px}.final-trial .verify{float:right;margin-top:20px;position:relative;display:inline-block;margin-left:40px}.final-trial .verify .verify-button{padding:10px 50px}.final-trial .verify .save{position:absolute;bottom:-50px;left:0;font-size:14px}","",{version:3,sources:["/Users/raocheng/work/trust-rewards/web/grade/src/views/trial/finalTrial.vue"],names:[],mappings:"AACA,aACE,YAAc,CACf,AACD,yBACI,gBAAkB,CACrB,AACD,qBACI,YAAa,AACb,gBAAiB,AACjB,kBAAmB,AACnB,qBAAsB,AACtB,gBAAkB,CACrB,AACD,oCACM,iBAAmB,CACxB,AACD,2BACM,kBAAmB,AACnB,aAAc,AACd,OAAQ,AACR,cAAgB,CACrB",file:"finalTrial.vue",sourcesContent:["\n.final-trial {\n  padding: 40px;\n}\n.final-trial .pagination {\n    margin-top: 116px;\n}\n.final-trial .verify {\n    float: right;\n    margin-top: 20px;\n    position: relative;\n    display: inline-block;\n    margin-left: 40px;\n}\n.final-trial .verify .verify-button {\n      padding: 10px 50px;\n}\n.final-trial .verify .save {\n      position: absolute;\n      bottom: -50px;\n      left: 0;\n      font-size: 14px;\n}\n"],sourceRoot:""}])},648:function(e,t,a){var l=a(616);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a(483)("593eeee7",l,!0)},680:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"final-trial"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"部门"}},[a("el-select",{attrs:{placeholder:"活动区域"},model:{value:e.formInline.region,callback:function(t){e.$set(e.formInline,"region",t)},expression:"formInline.region"}},[a("el-option",{attrs:{label:"综合部",value:"shanghai"}}),e._v(" "),a("el-option",{attrs:{label:"计划财务部",value:"beijing"}}),e._v(" "),a("el-option",{attrs:{label:"企业发展部",value:"beijing"}}),e._v(" "),a("el-option",{attrs:{label:"人力资源部",value:"beijing"}}),e._v(" "),a("el-option",{attrs:{label:"运营支撑部",value:"beijing"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"类型"}},[a("el-select",{attrs:{placeholder:"活动区域"},model:{value:e.formInline.region,callback:function(t){e.$set(e.formInline,"region",t)},expression:"formInline.region"}},[a("el-option",{attrs:{label:"创新项目奖",value:"shanghai"}}),e._v(" "),a("el-option",{attrs:{label:"在岗技术革新奖",value:"beijing"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"状态"},model:{value:e.project.status,callback:function(t){e.$set(e.project,"status",t)},expression:"project.status"}},[a("el-option",{attrs:{label:"草稿",value:0}}),e._v(" "),a("el-option",{attrs:{label:"部门审批",value:1}}),e._v(" "),a("el-option",{attrs:{label:"形式审查",value:2}}),e._v(" "),a("el-option",{attrs:{label:"待分配专家",value:3}}),e._v(" "),a("el-option",{attrs:{label:"待初评",value:4}}),e._v(" "),a("el-option",{attrs:{label:"已初评",value:5}}),e._v(" "),a("el-option",{attrs:{label:"待终评",value:6}}),e._v(" "),a("el-option",{attrs:{label:"已终评",value:7}}),e._v(" "),a("el-option",{attrs:{label:"评奖",value:8}}),e._v(" "),a("el-option",{attrs:{label:"驳回",value:9}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{on:{click:e.onSubmit}},[e._v("查询")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData3,border:""}},[a("el-table-column",{attrs:{prop:"date",label:"项目名称",align:"center",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"类型",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"部门"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"主要完成人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"领域"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"关键字"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"得分"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{type:"text",size:"small"}})]}}])})],1),e._v(" "),a("div",{staticClass:"verify"},[a("el-button",{staticClass:"verify-button",on:{click:function(t){e.$router.push("/createProject")}}},[e._v("确认评分")]),e._v(" "),a("span",{staticClass:"save"},[e._v("确认后无法修改")])],1),e._v(" "),a("div",{staticClass:"verify"},[a("el-button",{staticClass:"verify-button"},[e._v("保存评分")]),e._v(" "),a("span",{staticClass:"save"},[e._v("临时保存，确认前可修改")])],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":100,layout:"prev, pager, next, jumper",total:10},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=28.f64ffbe6180266e395ac.js.map