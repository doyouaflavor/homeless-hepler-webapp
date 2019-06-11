const DONATION_INPUT_KEY = 'donations';

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
