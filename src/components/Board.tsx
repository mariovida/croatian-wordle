"use client";

import { useEffect, useState } from "react";
import "@/styles/components/Board.scss";
import { evaluateGuess, LetterState } from "@/lib/gameLogic";
import { getRandomWord } from "@/lib/words";

const ROWS = 6;
const COLS = 5;

export default function Board() {
  const [answer] = useState(getRandomWord());

  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  );

  const [states, setStates] = useState<(LetterState | null)[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );

  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "backspace") return handleBackspace();
      if (key === "enter") return handleEnter();

      if (/^[a-zčćđšž]$/.test(key)) {
        handleLetter(key);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  function handleLetter(letter: string) {
    if (currentCol >= COLS) return;

    const newBoard = [...board];
    newBoard[currentRow][currentCol] = letter;

    setBoard(newBoard);
    setCurrentCol(currentCol + 1);
  }

  function handleBackspace() {
    if (currentCol === 0) return;

    const newBoard = [...board];
    newBoard[currentRow][currentCol - 1] = "";

    setBoard(newBoard);
    setCurrentCol(currentCol - 1);
  }

  function handleEnter() {
    if (currentCol !== COLS) return;

    const guess = board[currentRow].join("");

    const result = evaluateGuess(guess, answer);

    const newStates = [...states];
    newStates[currentRow] = result;

    setStates(newStates);

    setCurrentRow(currentRow + 1);
    setCurrentCol(0);
  }

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((cell, colIndex) => {
            const state = states[rowIndex][colIndex];

            return (
              <div className={`cell ${state ?? ""}`} key={colIndex}>
                {cell}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}