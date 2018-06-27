import request from './request';

async function getLocations() {
  return await request.get('/locations');
}

export {
  getLocations,
}
