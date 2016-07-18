const { localStorage } = window;

const KEY_PREFIX = 'donate_';
const regExp = RegExp(`^${KEY_PREFIX}`);

export function saveOrUpdateItem(userName, data) {
  let contain = false;

  for (const key in localStorage) {
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

export function getTransition(userName) {
  return JSON.parse(localStorage.getItem(`${KEY_PREFIX}${userName}`));
}

export function getAllItems() {
  const arr = [];

  for (const key in localStorage) {
    if (regExp.test(key)) {
      arr.push(JSON.parse(localStorage.getItem(key)));
    }
  }

  return arr;
}
