import { WORD_DB } from "./word-db.js";

function pick(categoryKey, wordText) {
  const category = WORD_DB[categoryKey];
  const item = category.items.find((entry) => entry.t === wordText);

  if (!item) {
    throw new Error(`Unknown dictionary seed word: ${categoryKey}/${wordText}`);
  }

  return {
    ...item,
    catColor: category.color,
    catLabel: category.label,
  };
}

function group(id, label, seeds) {
  return {
    id,
    label,
    type: "builtin",
    items: seeds.map(([categoryKey, wordText]) => pick(categoryKey, wordText)),
  };
}

export const DEFAULT_DICTIONARY_ID = "kindergarten";
export const CUSTOM_DICTIONARY_ID = "custom";

export const BUILTIN_DICTIONARIES = [
  group("kindergarten", "幼儿园", [
    ["animal", "Elephant"],
    ["animal", "Giraffe"],
    ["animal", "Penguin"],
    ["animal", "Turtle"],
    ["food", "Strawberry"],
    ["food", "Watermelon"],
    ["food", "Pineapple"],
    ["food", "Sandwich"],
    ["emotion", "Happy"],
    ["emotion", "Calm"],
    ["emotion", "Brave"],
    ["nature", "Ocean"],
    ["nature", "Forest"],
    ["nature", "Beach"],
    ["action", "Running"],
    ["action", "Swimming"],
    ["action", "Flying"],
    ["building", "Library"],
    ["sport", "Football"],
    ["sport", "Tennis"],
  ]),
  group("primary-lower", "小学低年级", [
    ["animal", "Dolphin"],
    ["animal", "Butterfly"],
    ["animal", "Kangaroo"],
    ["food", "Chocolate"],
    ["food", "Vegetable"],
    ["food", "Breakfast"],
    ["emotion", "Excited"],
    ["emotion", "Curious"],
    ["nature", "Mountain"],
    ["nature", "River"],
    ["nature", "Island"],
    ["action", "Cooking"],
    ["action", "Painting"],
    ["action", "Learning"],
    ["building", "Hospital"],
    ["building", "Museum"],
    ["building", "Bridge"],
    ["sport", "Basketball"],
    ["sport", "Cycling"],
    ["science", "Robot"],
  ]),
  group("primary-middle", "小学中年级", [
    ["animal", "Octopus"],
    ["animal", "Hippo"],
    ["animal", "Crocodile"],
    ["food", "Hamburger"],
    ["food", "Spaghetti"],
    ["food", "Dinner"],
    ["emotion", "Surprised"],
    ["emotion", "Proud"],
    ["emotion", "Confident"],
    ["nature", "Valley"],
    ["nature", "Desert"],
    ["nature", "Volcano"],
    ["action", "Building"],
    ["action", "Teaching"],
    ["action", "Exploring"],
    ["building", "Theater"],
    ["building", "Airport"],
    ["science", "Planet"],
    ["science", "Rocket"],
    ["science", "Computer"],
  ]),
  group("primary-upper", "小学高年级", [
    ["animal", "Dolphin"],
    ["food", "Breakfast"],
    ["food", "Vegetable"],
    ["emotion", "Grateful"],
    ["emotion", "Peaceful"],
    ["nature", "Waterfall"],
    ["nature", "Volcano"],
    ["nature", "Desert"],
    ["action", "Teaching"],
    ["action", "Exploring"],
    ["building", "Stadium"],
    ["building", "Station"],
    ["building", "Castle"],
    ["science", "Telescope"],
    ["science", "Microscope"],
    ["science", "Magnet"],
    ["science", "Battery"],
    ["science", "Satellite"],
    ["science", "Astronaut"],
    ["sport", "Diving"],
  ]),
];

export function createCustomDictionary(name, words) {
  return {
    id: CUSTOM_DICTIONARY_ID,
    label: name || "我的词库",
    type: "custom",
    items: words.map((word) => ({
      t: word,
      e: "✨",
      p: "",
      catColor: "#7E57C2",
      catLabel: "Custom",
    })),
  };
}

export function getBuiltinDictionary(id = DEFAULT_DICTIONARY_ID) {
  return (
    BUILTIN_DICTIONARIES.find((dictionary) => dictionary.id === id) ||
    BUILTIN_DICTIONARIES.find((dictionary) => dictionary.id === DEFAULT_DICTIONARY_ID)
  );
}
