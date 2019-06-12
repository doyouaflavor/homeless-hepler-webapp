export const DONATION_INPUT_KEY = 'donations';
export const CONTACT_INFO_KEY = 'contacts';

const KEYS = [
  DONATION_INPUT_KEY,
  CONTACT_INFO_KEY,
];


export const saveDonationInputs = (content) => {
  if (window) {
    const isNonEmpty = obj => Object.values(obj).some(val => Boolean(val));
    const result = content.filter(isNonEmpty);

    window.localStorage.setItem(DONATION_INPUT_KEY, JSON.stringify(result));
  }
};

export const saveContactInfo = (info) => {
  if (window) {
    window.localStorage.setItem(CONTACT_INFO_KEY, JSON.stringify(info));
  }
};

export const removeCachedInputsByKey = (key) => {
  if (typeof key !== 'string' || !KEYS.includes(key)) {
    throw new Error(`invalid key: ${key}. Must be a string and is one of ${KEYS.toString()}`)
  }

  if (window) {
    window.localStorage.removeItem(key)
  }
};

export const getCachedInputsByKey = (key) => {
  if (typeof key !== 'string' || !KEYS.includes(key)) {
    throw new Error(`invalid key: ${key}. Must be a string and is one of ${KEYS.toString()}`)
  }

  if (window) {
    const data = window.localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }
  }

  return undefined;
};

export const getDefaultContentArray = () => (
  [{ name: '', amount: '', description: '' }]
);
