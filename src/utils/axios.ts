import axios, { AxiosRequestConfig, Method, AxiosResponse,  } from 'axios';
import { getCookie, removeCookie } from './tools';

// 全局设定请求类型
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '127.0.0.1:3000';
axios.defaults.timeout = 3000;

// 请求头统一处理
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  // token 存放于 cookie/sessionStorage 中，有效时间为 8h
  const token = getCookie('token');
  // if (!token) {
  //   window.location.href = '/login';
  // }
  config.headers.Authorization = 'Bearer ' + token;
  return config;
}, (err) => {
  return Promise.reject(err);
});

// 根据 axios api，对请求返回做拦截处理
axios.interceptors.response.use((response: AxiosResponse): any => {
  // Token 过期
  if (response.data.status === 401) {
    // 清空用户信息
    removeCookie('token');
    // 返回首页 重新登录
    window.location.href = '/login';
    return Promise.reject(response);
  }
  // 接口返回失败
  if (response.status > 400) {
    return Promise.reject(response);
  }
  return response;
}, (err) => {
  return Promise.reject(err);
});

// request 请求方法入参
export interface RequestConfig {
  url: string;
  method: Method;
  params?: {};
}

/**
 * @description 公共接口请求函数
 * @params
 * url string url
 * params 请求参数
 * method string 接口请求方法
 */
export const request = ({ url, method, params }: RequestConfig): Promise<any> => {
  console.log('get in');
  return new Promise((resolve, reject) => {
    axios.request({
      url: url,
      method: method,
      data: params,
    })
    .then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
};
