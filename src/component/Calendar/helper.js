import map from "lodash/map";
import range from "lodash/range";
import parseInt from "lodash/parseInt";
import padStart from "lodash/padStart";

export const GIVE_TIME = map(range(48), (idx) => {
  const hour = parseInt(idx / 2, 10);
  const minute = idx % 2 === 0 ? 0 : 30;

  return `${padStart(hour, 2, '0')}:${padStart(minute, 2, '0')}`;
});

export const getItemStr = (item) => `${item.name} ${item.amount}`;
