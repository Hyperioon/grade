import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import Cookies from 'js-cookie';

export default {
  //get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: param,
      }).then(res => {
        if (res.data.resultCode !== '200') {
          if (!res.data.message) {
            Message({
              message: '服务器异常',
              type: 'error'
            });
          } else {
            Message({
              message: res.data.message,
              type: 'error'
            });
          }
          if (res.data.message == "请先登录!") {
            Cookies.remove('JSESSIONID');
            this.$router.push({ path: '/login' });
          }
        } else {
          resolve(res);
        }
      })
    })
  },
  //post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: qs.stringify(param),
        withCredentials: true,
      }).then(res => {
        if (res.data.resultCode !== '200') {
          if (res.data.message == "请先登录!") {
            Cookies.remove('JSESSIONID');
            this.$router.push({ path: '/login' });
          }
          if (!res.data.message) {
            Message({
              message: '服务器异常',
              type: 'error'
            });
          } else {
            Message({
              message: res.data.message,
              type: 'error'
            });
          }
        } else {
          resolve(res);
        }
      })
    })
  },
  //上传图片
  upload(url, file) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        url: url,
        data: file,
      }).then(res => {
        if (!res.data.successSign) {
          Message({
            message: res.data.message,
            type: 'error'
          });
        }
        resolve(res);
      })
    })
  }
}


