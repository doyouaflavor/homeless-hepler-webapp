import padStart from 'lodash/padStart';

import { ZH_WEEKDAY } from './const';

function matchEvent(e0, e1) {
  return (
    e0.year() === e1.year() &&
    e0.month() === e1.month() &&
    e0.date() === e1.date()
  );
}

function getDateStr(date) {
  return (
    `${date.year()}/${date.month() + 1}/${date.date()} (${ZH_WEEKDAY[date.day()]})`
  );
}

function getTimeStr(date) {
  return (
    `${padStart(date.hour(), 2, '0')}：${padStart(date.minute(), 2, '0')}`
  );
}

export {
  matchEvent,
  getDateStr,
  getTimeStr,
}
