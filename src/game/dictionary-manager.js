import {
  BUILTIN_DICTIONARIES,
  createCustomDictionary,
  CUSTOM_DICTIONARY_ID,
  DEFAULT_DICTIONARY_ID,
  getBuiltinDictionary,
} from "./dictionaries.js";

const ACTIVE_KEY = "sky-learner:active-dictionary";
const CUSTOM_KEY = "sky-learner:custom-dictionary";

function readCustomDictionary(storage) {
  const raw = storage?.getItem?.(CUSTOM_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.words) || !parsed.words.length) {
      return null;
    }

    return createCustomDictionary(parsed.name, parsed.words);
  } catch {
    return null;
  }
}

export function createDictionaryManager({
  storage = globalThis.localStorage,
} = {}) {
  let customDictionary = readCustomDictionary(storage);
  let activeId = storage?.getItem?.(ACTIVE_KEY) || DEFAULT_DICTIONARY_ID;

  function listDictionaries() {
    return customDictionary
      ? [...BUILTIN_DICTIONARIES, customDictionary]
      : [...BUILTIN_DICTIONARIES];
  }

  function persistActive(nextId) {
    activeId = nextId;
    storage?.setItem?.(ACTIVE_KEY, nextId);
  }

  function getDictionaryById(id) {
    if (id === CUSTOM_DICTIONARY_ID) {
      return customDictionary;
    }

    return getBuiltinDictionary(id);
  }

  function getActiveDictionary() {
    const dictionary = getDictionaryById(activeId);
    if (dictionary) {
      return dictionary;
    }

    persistActive(DEFAULT_DICTIONARY_ID);
    return getBuiltinDictionary(DEFAULT_DICTIONARY_ID);
  }

  function setActiveDictionary(id) {
    const dictionary = getDictionaryById(id);
    if (!dictionary) {
      persistActive(DEFAULT_DICTIONARY_ID);
      return getActiveDictionary();
    }

    persistActive(id);
    return dictionary;
  }

  function saveCustomDictionary({ name, words }) {
    customDictionary = createCustomDictionary(name, words);
    storage?.setItem?.(
      CUSTOM_KEY,
      JSON.stringify({
        name: customDictionary.label,
        words,
      }),
    );
    persistActive(CUSTOM_DICTIONARY_ID);
    return customDictionary;
  }

  function clearCustomDictionary() {
    customDictionary = null;
    storage?.removeItem?.(CUSTOM_KEY);
    persistActive(DEFAULT_DICTIONARY_ID);
  }

  return {
    listDictionaries,
    getActiveDictionary,
    setActiveDictionary,
    saveCustomDictionary,
    clearCustomDictionary,
  };
}
