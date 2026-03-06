export type LetterState = "correct" | "present" | "absent";

export function evaluateGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = Array(guess.length).fill("absent");

  const answerLetters = answer.split("");

  // correct position
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
      answerLetters[i] = "";
    }
  }

  // wrong position
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") continue;

    const index = answerLetters.indexOf(guess[i]);

    if (index !== -1) {
      result[i] = "present";
      answerLetters[index] = "";
    }
  }

  return result;
}