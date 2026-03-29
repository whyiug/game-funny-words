function renderStatus(elements, dictionary, message = "") {
  if (message) {
    elements.dictionaryStatus.textContent = message;
    return;
  }

  const count = dictionary?.items?.length || 0;
  elements.dictionaryStatus.textContent = `已选择${dictionary.label}词库，共 ${count} 个单词`;
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
    sync("已清空自定义词库，已切回内置词库。");
  });

  elements.dictionaryUpload.addEventListener("change", async () => {
    const [file] = elements.dictionaryUpload.files || [];
    if (!file) {
      return;
    }

    try {
      const parsed = await parseDictionaryFile(file);
      manager.saveCustomDictionary(parsed);
      sync(`已导入“${parsed.name}”，共 ${parsed.words.length} 个单词。`);
    } catch (error) {
      renderStatus(
        elements,
        manager.getActiveDictionary(),
        error instanceof Error ? error.message : "导入词库失败",
      );
    } finally {
      elements.dictionaryUpload.value = "";
    }
  });

  sync();
}
