export const words = [
  "kuca",
  "suma",
  "rijec",
  "voda",
  "kamen",
  "polje",
  "trava",
];

export function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}