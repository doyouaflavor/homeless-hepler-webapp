import ReactGA from 'react-ga';

import config from './config';

function initialize() {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(config.ga.trackingCode);
  }
}

function navigate(pathname) {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname)
  }
}

function sendEvent(category, action, label, value) {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
}

export default {
  initialize,
  navigate,
  sendEvent,
};
