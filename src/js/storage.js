//Робота з loacalStorage
export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function toggleItemInStorage(key, itemId) {
  const items = getFromStorage(key);
  const index = items.indexOf(itemId);
  if (index === -1) {
    items.push(itemId);
  } else {
    items.splice(index, 1);
  }
  saveToStorage(key, items);
  return items;
}

export function isInStorage(key, itemId) {
  const items = getFromStorage(key);
  return items.includes(itemId);
}
