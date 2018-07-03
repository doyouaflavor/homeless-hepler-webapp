import axios from 'axios';

const API_ROOT = 'https://homeless-helper-api.doyouaflavor.tw/api/v1';

async function get(url) {
  return await axios.get(`${API_ROOT}${url}`)
}

async function post(url, data) {
  return await axios.post(`${API_ROOT}${url}`, data)
}

export default {
  get,
  post,
}
