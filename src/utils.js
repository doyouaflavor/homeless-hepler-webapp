import padStart from 'lodash/padStart';

import { ZH_WEEKDAY } from './const';

const PROFILE_KEY = 'profile';

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

function getProfile() {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
}

function setProfile(profile) {
  if (profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } else {
    localStorage.removeItem(PROFILE_KEY);
  }
}

export {
  matchEvent,
  getDateStr,
  getTimeStr,
  setProfile,
  getProfile,
}
