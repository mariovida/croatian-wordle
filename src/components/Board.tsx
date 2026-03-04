"use client";

import { useEffect, useState } from "react";
import "@/styles/components/Board.scss";
import { evaluateGuess, LetterState } from "@/lib/gameLogic";
import { getRandomWord, isValidWord } from "@/lib/words";
import Keyboard from "./Keyboard";

const ROWS = 6;
const COLS = 5;

export default function Board() {
  const [answer] = useState(getRandomWord());
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill("")),
  );
  const [states, setStates] = useState<(LetterState | null)[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [shakeRow, setShakeRow] = useState<number | null>(null);
  const [keyboardState, setKeyboardState] = useState<
    Record<string, LetterState>
  >({});
  const [flippingRow, setFlippingRow] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  console.log("ANSWER:", answer);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOver) return;
      const key = e.key.toLowerCase();
      if (key === "backspace") return handleBackspace();
      if (key === "enter") return handleEnter();
      if (/^[a-zčćđšž]$/.test(key)) handleLetter(key);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentRow, currentCol, gameOver]);

  function handleKeyPress(key: string) {
    if (gameOver) return;
    if (key === "backspace") handleBackspace();
    else if (key === "enter") handleEnter();
    else handleLetter(key);
  }

  function handleLetter(letter: string) {
    if (currentCol >= COLS || gameOver) return;
    const newBoard = [...board];
    newBoard[currentRow][currentCol] = letter;
    setBoard(newBoard);
    setCurrentCol(currentCol + 1);
  }

  function handleBackspace() {
    if (currentCol === 0 || gameOver) return;
    const newBoard = [...board];
    newBoard[currentRow][currentCol - 1] = "";
    setBoard(newBoard);
    setCurrentCol(currentCol - 1);
  }

  function handleEnter() {
    if (gameOver) return;
    if (currentCol !== COLS) {
      setShakeRow(currentRow);
      setTimeout(() => setShakeRow(null), 500);
      return;
    }

    const guess = board[currentRow].join("");
    if (!isValidWord(guess)) {
      setShakeRow(currentRow);
      setMessage("Riječ ne postoji!");
      setTimeout(() => setMessage(null), 2000);
      setTimeout(() => setShakeRow(null), 500);
      return;
    }

    const result = evaluateGuess(guess, answer);
    setFlippingRow(currentRow);

    result.forEach((letterState, colIndex) => {
      setTimeout(() => {
        setStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[currentRow] = [...newStates[currentRow]];
          newStates[currentRow][colIndex] = letterState;
          return newStates;
        });

        const letter = board[currentRow][colIndex];
        setKeyboardState((prev) => {
          const prevState = prev[letter];
          if (prevState === "correct") return prev;
          if (prevState === "present" && letterState === "absent") return prev;
          return { ...prev, [letter]: letterState };
        });
      }, colIndex * 300);
    });

    setTimeout(
      () => {
        if (result.every((s) => s === "correct")) {
          setGameOver(true);
        } else if (currentRow + 1 >= ROWS) {
          setMessage(`Točan odgovor je: ${answer.toUpperCase()}`);
          setGameOver(true);
        } else {
          setCurrentRow(currentRow + 1);
          setCurrentCol(0);
        }
        setFlippingRow(null);
      },
      COLS * 300 + 300,
    );
  }

  return (
    <>
      <div className="board">
        <div className="message">{message && <span>{message}</span>}</div>
        {board.map((row, rowIndex) => (
          <div
            className={`board-row ${shakeRow === rowIndex ? "shake" : ""}`}
            key={rowIndex}
          >
            {row.map((cell, colIndex) => {
              const state = states[rowIndex][colIndex];
              const isFlipping = flippingRow === rowIndex;

              return (
                <div
                  className={`cell ${state ?? ""} ${isFlipping ? "flip" : ""}`}
                  style={{ animationDelay: `${colIndex * 0.2}s` }}
                  key={colIndex}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <Keyboard onKeyPress={handleKeyPress} keyboardState={keyboardState} />
    </>
  );
}
