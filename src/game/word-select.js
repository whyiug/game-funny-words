import { WORD_DB } from "./word-db.js";
import { getBuiltinDictionary } from "./dictionaries.js";

export function getRandomWord(random = Math.random, dictionary = null) {
  if (dictionary?.items?.length) {
    return dictionary.items[Math.floor(random() * dictionary.items.length)];
  }

  const builtin = getBuiltinDictionary();
  if (builtin?.items?.length) {
    return builtin.items[Math.floor(random() * builtin.items.length)];
  }

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
