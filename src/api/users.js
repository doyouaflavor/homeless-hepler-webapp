import request from './request';

async function login(username, password) {
  return await request.post('/users/login', {
    username,
    password,
  });
}

export {
  login,
}
