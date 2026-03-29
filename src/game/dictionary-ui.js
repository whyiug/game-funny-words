function renderStatus(elements, dictionary, message = "") {
  if (message) {
    elements.dictionaryStatus.textContent = message;
    return;
  }

  const count = dictionary?.items?.length || 0;
  elements.dictionaryStatus.textContent = `${dictionary.label} selected • ${count} words ready`;
}

function renderOptions(elements, dictionaries, activeId) {
  elements.dictionarySelect.innerHTML = dictionaries
    .map(
      (dictionary) =>
        `<option value="${dictionary.id}" ${dictionary.id === activeId ? "selected" : ""}>${dictionary.label}</option>`,
    )
    .join("");
}

export function initDictionaryControls({
  elements,
  manager,
  parseDictionaryFile,
  onDictionaryChange,
}) {
  function sync(message = "") {
    const dictionaries = manager.listDictionaries();
    const active = manager.getActiveDictionary();
    renderOptions(elements, dictionaries, active.id);
    renderStatus(elements, active, message);
    onDictionaryChange(active);
  }

  elements.dictionarySelect.addEventListener("change", () => {
    manager.setActiveDictionary(elements.dictionarySelect.value);
    sync();
  });

  elements.dictionaryClear.addEventListener("click", () => {
    manager.clearCustomDictionary();
    sync("Custom dictionary cleared. Back to built-in words.");
  });

  elements.dictionaryUpload.addEventListener("change", async () => {
    const [file] = elements.dictionaryUpload.files || [];
    if (!file) {
      return;
    }

    try {
      const parsed = await parseDictionaryFile(file);
      manager.saveCustomDictionary(parsed);
      sync(`Imported ${parsed.words.length} custom words from ${parsed.name}.`);
    } catch (error) {
      renderStatus(
        elements,
        manager.getActiveDictionary(),
        error instanceof Error ? error.message : "Failed to import dictionary",
      );
    } finally {
      elements.dictionaryUpload.value = "";
    }
  });

  sync();
}
