const MAX_WORDS = 300;

function getFileExtension(name = "") {
  return name.split(".").pop()?.toLowerCase() || "";
}

function isCsv(meta) {
  return meta.type === "text/csv" || getFileExtension(meta.name) === "csv";
}

function isText(meta) {
  return meta.type === "text/plain" || getFileExtension(meta.name) === "txt";
}

function dedupeWords(words) {
  const seen = new Set();
  const result = [];

  words.forEach((word) => {
    const normalized = word.trim();
    if (!normalized) {
      return;
    }

    const key = normalized.toLowerCase();
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    result.push(normalized);
  });

  return result.slice(0, MAX_WORDS);
}

function parseCsv(text) {
  const rows = text
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean);

  if (!rows.length) {
    return [];
  }

  const words = rows.map((row) => row.split(",")[0]?.trim() || "");
  const [first, ...rest] = words;
  if (/^(word|words|单词)$/i.test(first)) {
    return rest;
  }

  return words;
}

function parsePlainText(text) {
  return text.split(/\r?\n/);
}

export function parseDictionaryText(text, meta) {
  let words;

  if (isCsv(meta)) {
    words = parseCsv(text);
  } else if (isText(meta)) {
    words = parsePlainText(text);
  } else {
    throw new Error("暂不支持这种词库格式，请上传 TXT 或 CSV 文件。");
  }

  const cleaned = dedupeWords(words);
  if (!cleaned.length) {
    throw new Error("词库内容为空，请检查文件内容。");
  }

  return {
    name: meta.name?.replace(/\.[^.]+$/, "") || "我的词库",
    words: cleaned,
  };
}

export async function parseDictionaryFile(file) {
  let text;

  if (typeof file.text === "function") {
    text = await file.text();
  } else if (typeof file.arrayBuffer === "function") {
    const buffer = await file.arrayBuffer();
    text = new TextDecoder().decode(buffer);
  } else if (typeof FileReader === "function") {
    text = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("Failed to read file"));
      reader.readAsText(file);
    });
  } else {
    throw new Error("无法读取词库文件。");
  }

  return parseDictionaryText(text, {
    type: file.type,
    name: file.name,
  });
}
