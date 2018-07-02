const  Login = r => require.ensure( [], () => r (require('./views/Login.vue')));
const  Home = r => require.ensure( [], () => r (require('./views/Home.vue')));
const  Main = r => require.ensure( [], () => r (require('./views/Main.vue')));
const  NotFound = r => require.ensure( [], () => r (require('./views/404.vue')));
const  myProject = r => require.ensure( [], () => r (require('./views/myProject/myProject.vue')));
const  firstTrial = r => require.ensure( [], () => r (require('./views/trial/firstTrial.vue')));
const  finalTrial = r => require.ensure( [], () => r (require('./views/trial/finalTrial.vue')));
const  result = r => require.ensure( [], () => r (require('./views/result/result.vue')));
const  userManage = r => require.ensure( [], () => r (require('./views/manage/userManage.vue')));
const  tongbu = r => require.ensure( [], () => r (require('./views/manage/tongbu.vue')));
const  allUsers = r => require.ensure( [], () => r (require('./views/manage/allUsers.vue')));
const  expertManage = r => require.ensure( [], () => r (require('./views/manage/expertManage.vue')));
const  fenpei = r => require.ensure( [], () => r (require('./views/myProject/fenpei.vue')));
const  createProject = r => require.ensure( [], () => r (require('./views/add/createProject.vue')));
const  alloted = r => require.ensure( [], () => r (require('./views/myProject/alloted.vue')));
const  zhongping = r => require.ensure( [], () => r (require('./views/myProject/zhongping.vue')));
const  yichuping = r => require.ensure( [], () => r (require('./views/myProject/yichuping.vue')));
const  chuping = r => require.ensure( [], () => r (require('./views/myProject/chuping.vue')));
const  expertDafen = r => require.ensure( [], () => r (require('./views/myProject/expertDafen.vue')));
const  pingjiang = r => require.ensure( [], () => r (require('./views/myProject/pingjiang.vue')));
const  approve = r => require.ensure( [], () => r (require('./views/myProject/approve.vue')));
const  expertRating = r => require.ensure( [], () => r (require('./views/myProject/expertRating.vue')));
const  editUser = r => require.ensure( [], () => r (require('./views/manage/editUser.vue')));
const  addExpert = r => require.ensure( [], () => r (require('./views/manage/addExpert.vue')));
const  editExpert = r => require.ensure( [], () => r (require('./views/manage/editExpert.vue')));
const  myInfo = r => require.ensure( [], () => r (require('./views/manage/myInfo.vue')));
const  addUser = r => require.ensure( [], () => r (require('./views/manage/addUser.vue')));
const  allProject = r => require.ensure( [], () => r (require('./views/myProject/allProject.vue')));
const  manageApprove = r => require.ensure( [], () => r (require('./views/myProject/manageApprove.vue')));
const  projectDetail = r => require.ensure( [], () => r (require('./views/myProject/projectDetail.vue')));

let routes = [
    {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        hidden: true,
        children: [
            { path: '/createProject', component: createProject, name: '创建项目' }
        ]
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '首页',
        leaf: true,//只有一个节点
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/index', component: Main, name: '首页' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '我的项目',
        // leaf: true,//只有一个节点
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/myProject', component: myProject, name: ' 我的项目' },
            { path: '/approve', component: approve, name: '待审批项目', hidden: true },
            { path: '/manageApprove', component: manageApprove, name: '待审批项目', hidden: true },
            { path: '/allProject', component: allProject, name: '全部项目', hidden: true },
            { path: '/chuping', component: chuping, name: '初评项目', hidden: true },
            { path: '/expertDafen', component: expertDafen, name: '专家打分情况', hidden: true },
            { path: '/yichuping', component: yichuping, name: '已初评项目', hidden: true },
            { path: '/fenpei', component: fenpei, name: '待分配项目', hidden: true },
            { path: '/alloted', component: alloted, name: '已分配项目', hidden: true },
            { path: '/zhongping', component: zhongping, name: '终评项目', hidden: true },
            { path: '/pingjiang', component: pingjiang, name: '评奖项目', hidden: true },
            { path: '/projectDetail', component: projectDetail, name: '项目详情', hidden: true },
            { path: '/expertRating', component: expertRating, name: '专家初评', hidden: true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        hidden: true,
        manage: true,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/tongbu', component: tongbu, name: '同步oa信息' },
            { path: '/userManage', component: userManage, name: '修改用户信息' },
            { path: '/addUser', component: addUser, name: '添加外部人员' },
            { path: '/expertManage', component: expertManage, name: '专家库' },
            { path: '/editUser', component: editUser, name: '修改用户信息', hidden:true},
            { path: '/addExpert', component: addExpert, name: '添加到专家库', hidden:true},
            { path: '/editExpert', component: editExpert, name: '修改用户信息', hidden:true},
            { path: '/myInfo', component: myInfo, name: '个人信息', hidden:true}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        hidden: true,
        children: [
            { path: '/result', component: result, name: '评奖结果' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
