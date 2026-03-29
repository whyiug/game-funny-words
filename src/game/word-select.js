import { WORD_DB } from "./word-db.js";

export function getRandomWord(random = Math.random) {
  const categoryKeys = Object.keys(WORD_DB);
  const catKey = categoryKeys[Math.floor(random() * categoryKeys.length)];
  const category = WORD_DB[catKey];
  const item = category.items[Math.floor(random() * category.items.length)];

  return {
    ...item,
    catColor: category.color,
    catLabel: category.label,
  };
}
