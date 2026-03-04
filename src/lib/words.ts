import WORDS from "@/data/words.json";

export const WORD_LENGTH = 5;
export const VALID_WORDS = WORDS.filter((word) => word.length === WORD_LENGTH);

export function getRandomWord(): string {
  const index = Math.floor(Math.random() * VALID_WORDS.length);
  return VALID_WORDS[index];
}

export function isValidWord(word: string): boolean {
  return VALID_WORDS.includes(word);
}
