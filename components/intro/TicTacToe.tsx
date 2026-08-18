"use client";

import { useState } from "react";

export default function TicTacToe({
  onSolved,
}: {
  onSolved: () => void;
}) {
  const [wrong, setWrong] = useState(false);
  const [won, setWon] = useState(false);

  function choose(index: number) {
    if (index === 6) {
      setWon(true);

      setTimeout(() => {
        onSolved();
      }, 1500);
    } else {
      setWrong(true);

      setTimeout(() => {
        setWrong(false);
      }, 600);
    }
  }

  if (won) {
    return <DigitReveal label="Erste Ziffer" digit="2" />;
  }

 const board = [
  "X",
  "O",
  "X",
  "O",
  "X",
  "",
  "",
  "",
  "O",
];

  return (
    <div className="text-center">
      <p className="game-number">
        Erste Ziffer
      </p>

      <h2 className="garden-title mt-3 text-3xl text-[#76594d]">
        Nur ein Zug fehlt.
      </h2>

      <p className="mt-2 text-sm text-[#917c70]">
        Finde den Gewinnerzug für X.
      </p>

      <div className="mx-auto mt-7 grid w-[240px] grid-cols-3 overflow-hidden rounded-2xl border border-[#cfb5a8]">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => {
              if (!value) choose(index);
            }}
            disabled={Boolean(value)}
            className="flex aspect-square items-center justify-center border border-[#dcc7bd] bg-[#f9eee7] font-serif text-3xl text-[#65705b] transition hover:bg-[#edd9cf]"
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-4 h-5 text-sm text-[#ad746a]">
        {wrong && "Fast – probier ein anderes Feld ♡"}
      </div>
    </div>
  );
}

function DigitReveal({
  label,
  digit,
}: {
  label: string;
  digit: string;
}) {
  return (
    <div className="digit-reveal py-8 text-center">
      <div className="text-4xl">❀</div>

      <p className="mt-5 text-xs uppercase tracking-[0.25em] text-[#998075]">
        {label}
      </p>

      <div className="garden-title mt-3 text-7xl text-[#718064]">
        {digit}
      </div>
    </div>
  );
}