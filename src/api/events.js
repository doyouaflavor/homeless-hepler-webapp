import request from './request';
import { getLocations } from './locations';

async function queryEvents(query) {
  return await request.post('/events/query', query);
}

async function getTaipeiStationEvents() {
  const locations = await getLocations()
  // 目前只有一個地點，因此假定第0個就是台北車站
  const locationId = locations.data[0]._id;
  const result = await queryEvents({ locationId });

  return {
    locationId,
    events: result.data,
  };
}

export {
  queryEvents,
  getTaipeiStationEvents,
}
