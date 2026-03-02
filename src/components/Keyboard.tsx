"use client";

import "@/styles/components/Keyboard.scss";
import { LetterState } from "@/lib/gameLogic";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyboardState: Record<string, LetterState>;
}

// Desktop layout
const desktopRows = [
  ["e", "r", "t", "z", "u", "i", "o", "p", "š", "đ"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "č", "ć", "ž"],
  ["enter", "c", "v", "b", "n", "m", "backspace"],
];

export default function Keyboard({ onKeyPress, keyboardState }: KeyboardProps) {
  return (
    <div className="keyboard">
      {desktopRows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const stateClass = keyboardState[key] ?? "";
            return (
              <button
                key={key}
                className={`key ${stateClass}`}
                onClick={() => onKeyPress(key)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onKeyPress(key);
                }}
              >
                {key === "backspace" ? "⌫" : key.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
