import request from './request';

async function login(username, password) {
  return await request.post('/users/login', {
    username,
    password,
  });
}

async function chpasswd(oldPassword, newPassword) {
  return await request.post('/users/chpasswd', {
    oldPassword,
    newPassword,
  });
}

export {
  login,
  chpasswd,
}
