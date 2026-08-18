"use client";

import { useState } from "react";

const initialCards = [
  { id: 1, symbol: "🌸" },
  { id: 2, symbol: "🌿" },
  { id: 3, symbol: "♡" },
  { id: 4, symbol: "☀" },
  { id: 5, symbol: "🌙" },
  { id: 6, symbol: "🦋" },

  { id: 7, symbol: "🌿" },
  { id: 8, symbol: "🦋" },
  { id: 9, symbol: "☀" },
  { id: 10, symbol: "🌸" },
  { id: 11, symbol: "🌙" },
  { id: 12, symbol: "♡" },
];

export default function MemoryGame({
  onSolved,
}: {
  onSolved: () => void;
}) {
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [won, setWon] = useState(false);

  function chooseCard(id: number) {
    if (
      open.length === 2 ||
      open.includes(id) ||
      matched.includes(id)
    ) {
      return;
    }

    const newOpen = [...open, id];
    setOpen(newOpen);

    if (newOpen.length === 2) {
      const first = initialCards.find(
        (card) => card.id === newOpen[0],
      );

      const second = initialCards.find(
        (card) => card.id === newOpen[1],
      );

      if (first?.symbol === second?.symbol) {
        const newMatched = [...matched, ...newOpen];

        setMatched(newMatched);
        setOpen([]);

        if (newMatched.length === initialCards.length) {
          setWon(true);

          setTimeout(() => {
            onSolved();
          }, 1500);
        }
      } else {
        setTimeout(() => {
          setOpen([]);
        }, 700);
      }
    }
  }

  if (won) {
    return (
      <div className="digit-reveal py-8 text-center">
        <div className="flower-success text-5xl">
          ❀
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#998075]">
          Dritte Ziffer
        </p>

        <div className="garden-title mt-3 text-7xl text-[#718064]">
          0
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="game-number">
        Dritte Ziffer
      </p>

      <h2 className="garden-title mt-3 text-3xl text-[#76594d]">
        Finde die Paare.
      </h2>

      <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-[#917c70]">
        Finde alle sechs passenden Paare.
      </p>

      <div className="mx-auto mt-8 grid max-w-[320px] grid-cols-4 gap-3">
        {initialCards.map((card) => {
          const visible =
            open.includes(card.id) ||
            matched.includes(card.id);

          const isMatched = matched.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => chooseCard(card.id)}
              disabled={isMatched}
              className={`
                flex aspect-square items-center justify-center
                rounded-2xl border text-3xl shadow-sm
                transition duration-300
                ${
                  visible
                    ? "rotate-0 border-[#c7b2a5] bg-[#fff9f4]"
                    : "border-[#cdb9ac] bg-[#d8b7aa]"
                }
                ${
                  isMatched
                    ? "scale-95 bg-[#dce1d2]"
                    : ""
                }
              `}
            >
              {visible ? card.symbol : "❀"}
            </button>
          );
        })}
      </div>

      <div className="mt-7 flex justify-center gap-2">
        {Array.from({ length: 6 }).map((_, index) => {
          const completedPairs = matched.length / 2;

          return (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                completedPairs > index
                  ? "scale-125 bg-[#7f8d70]"
                  : "bg-[#d8c4b8]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}