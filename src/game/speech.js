export function speakWord(word, env = globalThis) {
  if (
    !env ||
    !env.speechSynthesis ||
    typeof env.speechSynthesis.cancel !== "function" ||
    typeof env.speechSynthesis.speak !== "function" ||
    typeof env.SpeechSynthesisUtterance !== "function"
  ) {
    return false;
  }

  const utterance = new env.SpeechSynthesisUtterance(word);
  utterance.rate = 1.1;
  utterance.pitch = 1.2;
  env.speechSynthesis.cancel();
  env.speechSynthesis.speak(utterance);
  return true;
}
