import axios from 'axios';

import { getProfile } from '../utils';

const API_ROOT = 'https://homeless-helper-api.doyouaflavor.tw/api/v1';

async function get(url) {
  const profile = getProfile();
  const headers = profile
    ? {
      'x-access-token': profile.token,
    }
    : {};
  return await axios.get(`${API_ROOT}${url}`, {
    headers,
  });
}

async function post(url, data) {
  const profile = getProfile();
  const headers = profile
    ? {
      'x-access-token': profile.token,
    }
    : {};
  return await axios.post(`${API_ROOT}${url}`, data, {
    headers,
  });
}

export default {
  get,
  post,
}
