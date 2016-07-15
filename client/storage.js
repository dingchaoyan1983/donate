const { localStorage } = window;

const KEY_PREFIX = 'donate_';

export function saveOrUpdateItem(userName, data) {
  let contain = false;

  for(let key in localStorage) {
    if (key === `${KEY_PREFIX}${userName}`) {
      contain = true;
      break;
    }
  }

  if (contain) {
    localStorage.removeItem(`${KEY_PREFIX}${userName}`);
  }

  localStorage.setItem(`${KEY_PREFIX}${userName}`, JSON.stringify(data));

}

export function getAllItems() {
  const arr = [];

  for (let key in localStorage) {
    if (key.startWith(KEY_PREFIX)) {
      arr.push(JSON.parse(localStorage.get(key)));
    }
  }

  return arr;
}
