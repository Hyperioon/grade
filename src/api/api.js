import req from './fetch';
import { Message } from 'element-ui';

// const base = 'http://172.18.9.24:8080/';
const base = '';

// 登录
export const requestLogin = param => {
  return req.post(`${base}/api/ucenter/login`, param).then(res => res.data);
}
// 全部部门
export const getDepartment = param => {
  return req.get(`${base}/api/ucenter/getDepartment`, param).then(res => res.data);
}
// 创建项目
export const createProject = param => {
  return req.post(`${base}/api/project/createProject`, param).then(res => res.data);
}
// 修改项目
export const updateProject = param => {
  return req.post(`${base}/api/visit/updateProject`, param).then(res => res.data);
}
// 筛选项目
export const getProjectList = param => {
  return req.post(`${base}/api/project/getProjectList`, param).then(res => res.data);
}
// 获取我创建的项目
export const getMyProjectList = param => {
  return req.post(`${base}/api/visit/getMyProjectList`, param).then(res => res.data);
}
// 初评专家获取项目
export const getExpertProjectListByCondition = param => {
  return req.get(`${base}/api/expert/getExpertProjectListByCondition`, param).then(res => res.data);
}
// 获取专家打分分数
export const getExpertScore = param => {
  return req.post(`${base}/api/visit/getExpertScore`, param).then(res => res.data);
}
// 专家打分项目
export const getGradedProjectList = param => {
  return req.post(`${base}/api/project/getGradedProjectList`, param).then(res => res.data);
}
// 管理员所有项目
export const getAdminProjectListByCondition = param => {
  return req.get(`${base}/api/expert/getAdminProjectListByCondition`, param).then(res => res.data);
}
// 获取项目详情
export const getProjectInfo = param => {
  return req.post(`${base}/api/visit/getProjectInfo`, param).then(res => res.data);
}
// 通过部门选择员工
export const getUsersByDepartment = param => {
  return req.get(`${base}/api/ucenter/getUsersByDepartment`, param).then(res => res.data);
}
// 终评批量打分
export const batchGrade = param => {
  return req.post(`${base}/api/batchGrade`, param).then(res => res.data);
}
//  下载多文件
export const zipfileDownload = param => {
  return req.get(`${base}/api/project/zipfileDownload`, param).then(res => res.data);
}
//  下载单文件
export const download = param => {
  return req.get(`${base}/api/download`, param).then(res => res.data);
}
//  审批
export const approve = param => {
  return req.post(`${base}/api/project/approve`, param).then(res => res.data);
}
//  同步用户信息
export const insertUserList = param => {
  return req.post(`${base}/api/ucenter/insertUserList`, param).then(res => res.data);
}
// 获取用户名
export const getUserName = param => {
  return req.get(`${base}/api/ucenter/getUserName`, param).then(res => res.data);
}

// 获取全部用户信息
export const queryUserList = param => {
  return req.post(`${base}/api/ucenter/queryUserList`, param).then(res => res.data);
}
// 获取用户信息
export const queryUserInfo = param => {
  return req.post(`${base}/api/ucenter/queryUserInfo`, param).then(res => res.data);
}
// 修改用户信息
export const updateUser = param => {
  return req.post(`${base}/api/ucenter/updateUser`, param).then(res => res.data);
}
// 添加用户
export const addUser = param => {
  return req.post(`${base}/api/ucenter/addUser`, param).then(res => res.data);
}
// 专家评分
export const grade = param => {
  return req.post(`${base}/api/project/grade`, param).then(res => res.data);
}
// 获取用户信息
export const getUserInfo = param => {
  return req.post(`${base}/api/ucenter/getUserInfo`, param).then(res => res.data);
}
// 随机分配专家
export const getRandowExpert = param => {
  return req.get(`${base}/api/project/getRandowExpert`, param).then(res => res.data);
}
// 选定初评专家
export const chooseExpert = param => {
  return req.post(`${base}/api/project/chooseExpert`, param).then(res => res.data);
}
// 选定终评专家
export const getAllFinalReviewExpert = param => {
  return req.get(`${base}/api/getAllFinalReviewExpert`, param).then(res => res.data);
}
export const zhongpingList = param => {
  return req.get(`${base}/api/leader/getExpertProjectListByCondition`, param).then(res => res.data);
}
export const chooseFinalExpert = param => {
  return req.post(`${base}/api/chooseFinalExpert`, param).then(res => res.data);
}
// 修改项目评奖结果
export const updateFinalScore = param => {
  return req.post(`${base}/api/project/updateFinalScore`, param).then(res => res.data);
}
// 修改专家
export const updateExpert = param => {
  return req.post(`${base}/api/expert/updateExpert`, param).then(res => res.data);
}
export const addExpert = param => {
  return req.post(`${base}/api/expert/addExpert`, param).then(res => res.data);
}
// 获取所有专家
export const getExpertList = param => {
  return req.post(`${base}/api/expert/getExpertList`, param).then(res => res.data);
}
// 查询专家
export const getExpertInfo = param => {
  return req.post(`${base}/api/expert/getExpertInfo`, param).then(res => res.data);
}
// 管理员获取终评项目
export const getAdminProjectList = param => {
  return req.get(`${base}/api/leader/getAdminProjectListByCondition`, param).then(res => res.data);
}
// 终评专家获取终评项目
export const getExpertProjectList = param => {
  return req.get(`${base}/api/leader/getExpertProjectList`, param).then(res => res.data);
}
// 项目申报通道是否关闭
export const closeProjectApply = param => {
  return req.post(`${base}/api/project/closeProjectApply`, param).then(res => res.data);
}
// 创新项目审批个数
export const innovateApproveNumber = param => {
  return req.post(`${base}/api/project/innovateApproveNumber`, param).then(res => res.data);
}
// 通知审批
export const sendDepartmentLeader = param => {
  return req.post(`${base}/api/project/sendDepartmentLeader`, param).then(res => res.data);
}
// 发送专家初评短信
export const sendJuniorExpert = param => {
  return req.post(`${base}/api/expert/sendJuniorExpert`, param).then(res => res.data);
}
