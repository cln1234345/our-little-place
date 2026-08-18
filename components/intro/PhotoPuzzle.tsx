"use client";

import { useState } from "react";

const SIZE = 3;
const TOTAL_PIECES = SIZE * SIZE;

const PUZZLE_IMAGE = "/images/puzzle.jpeg";

const correctOrder = Array.from(
  { length: TOTAL_PIECES },
  (_, index) => index,
);

// Kein einziges Teil ist anfangs an der richtigen Position.
const startingOrder = [
  4, 0, 7,
  2, 8, 1,
  5, 3, 6,
];

type Phase = "playing" | "picture" | "digit";

export default function PhotoPuzzle({
  onSolved,
}: {
  onSolved: () => void;
}) {
  const [pieces, setPieces] =
    useState<number[]>(startingOrder);

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const [phase, setPhase] =
    useState<Phase>("playing");

  function handlePieceClick(index: number) {
    if (phase !== "playing") return;

    // Erstes Teil auswählen.
    if (selectedIndex === null) {
      setSelectedIndex(index);
      return;
    }

    // Dasselbe Teil noch einmal = Auswahl aufheben.
    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    // Beide Teile tauschen.
    const newPieces = [...pieces];

    [
      newPieces[selectedIndex],
      newPieces[index],
    ] = [
      newPieces[index],
      newPieces[selectedIndex],
    ];

    setPieces(newPieces);
    setSelectedIndex(null);

    // Prüfen, ob das Puzzle komplett richtig ist.
    const solved = newPieces.every(
      (piece, position) =>
        piece === correctOrder[position],
    );

    if (solved) {
      /*
       * Erst bleibt das fertige Puzzle
       * ganz kurz sichtbar.
       */
      setTimeout(() => {
        setPhase("picture");
      }, 500);

      /*
       * Danach vollständiges Bild zeigen.
       */
      setTimeout(() => {
        setPhase("digit");
      }, 2600);

      /*
       * Zum Schluss Spiel beenden.
       */
      setTimeout(() => {
        onSolved();
      }, 4300);
    }
  }

  // -----------------------------------------
  // VOLLSTÄNDIGES FOTO NACH DEM PUZZLE
  // -----------------------------------------

  if (phase === "picture") {
    return (
      <div className="text-center">
        <p className="game-number">
          Vierte Ziffer
        </p>

        <div className="puzzle-picture-reveal mx-auto mt-5">
          <img
            src={PUZZLE_IMAGE}
            alt="Unser Bild"
            className="aspect-square w-full object-cover"
          />
        </div>

        <p className="garden-title mt-5 text-2xl text-[#76594d]">
          Geschafft ♡
        </p>
      </div>
    );
  }

  // -----------------------------------------
  // ZIFFER ANZEIGEN
  // -----------------------------------------

  if (phase === "digit") {
    return (
      <div className="digit-reveal py-8 text-center">
        <div className="flower-success text-5xl">
          ❀
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#998075]">
          Vierte Ziffer
        </p>

        <div className="garden-title mt-3 text-7xl text-[#718064]">
          5
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // PUZZLE
  // -----------------------------------------

  return (
    <div className="text-center">
      <p className="game-number">
        Vierte Ziffer
      </p>

      <h2 className="garden-title mt-3 text-3xl text-[#76594d]">
        Setz das Bild zusammen.
      </h2>

      <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-[#917c70]">
        Wähle zwei Bildteile aus, um sie miteinander
        zu tauschen.
      </p>

      <div className="mx-auto mt-7 grid w-[300px] grid-cols-3 overflow-hidden rounded-2xl border border-white/60 shadow-lg">
        {pieces.map((piece, index) => {
          const row = Math.floor(piece / SIZE);
          const column = piece % SIZE;

          const backgroundX = column * 50;
          const backgroundY = row * 50;

          const isSelected =
            selectedIndex === index;

          return (
            <button
              key={`${piece}-${index}`}
              onClick={() =>
                handlePieceClick(index)
              }
              className={`
                relative aspect-square
                border border-white/40
                transition-all duration-200
                ${
                  isSelected
                    ? "z-10 scale-95 ring-4 ring-[#889476]"
                    : ""
                }
              `}
              style={{
                backgroundImage: `url(${PUZZLE_IMAGE})`,
                backgroundSize: "300% 300%",
                backgroundPosition: `${backgroundX}% ${backgroundY}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
          );
        })}
      </div>

      <p className="mt-5 text-xs text-[#9a857a]">
        Tippe erst auf ein Teil und danach auf das Teil,
        mit dem du es tauschen möchtest.
      </p>
    </div>
  );
}