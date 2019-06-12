const DONATION_INPUT_KEY = 'donations';
const CONTACT_INFO_KEY = 'contacts';

export const getDonationInputs = () => {
  if (window) {
    const content = window.localStorage.getItem(DONATION_INPUT_KEY)

    if (content) {
      return JSON.parse(content);
    }
  }

  return undefined;
};

export const saveDonationInputs = (content) => {
  if (window) {
    const isNonEmpty = obj => Object.values(obj).some(val => Boolean(val));
    const result = content.filter(isNonEmpty);

    window.localStorage.setItem(DONATION_INPUT_KEY, JSON.stringify(result));
  }
};

export const removeDonationInputs = () => {
  if (window) {
    window.localStorage.removeItem(DONATION_INPUT_KEY)
  }
};

export const getContactInfo = () => {
  if (window) {
    const info = window.localStorage.getItem(CONTACT_INFO_KEY);

    if (info) {
      return JSON.parse(info);
    }
  }

  return undefined;
};

export const saveContactInfo = (info) => {
  if (window) {
    window.localStorage.setItem(CONTACT_INFO_KEY, JSON.stringify(info));
  }
};

export const removeContactInfo = () => {
  if (window) {
    window.localStorage.removeItem(CONTACT_INFO_KEY)
  }
};
