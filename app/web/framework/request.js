import axios from 'axios';
// axios.defaults.baseURL = 'http://127.0.0.1:7001';
axios.defaults.timeout = 15000;
axios.defaults.xsrfHeaderName = 'x-csrf-token';
axios.defaults.xsrfCookieName = 'csrfToken';

try {
  const token = sessionStorage && sessionStorage.getItem('token');
  if (token) {
      axios.defaults.headers.common['token'] = token;
  }
} catch (error) {
  console.log('获取token失败');
}


export default {
  async post(url, body, locals = {}) {
    const headers = {};
    if (EASY_ENV_IS_NODE) {
      headers['x-csrf-token'] = locals.csrf;
      headers.Cookie = `csrfToken=${locals.csrf}`;
    }
    const res = await axios.post(`${url}`, body, { headers });
    return res.data;
  },
  async get(url, locals = {}) {
    const res = await axios.get(`${url}`, locals);
    return res.data;
  }
};