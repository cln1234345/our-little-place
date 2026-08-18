"use client";

import { useEffect, useState } from "react";

import GameModal from "./GameModal";
import TicTacToe from "./TicTacToe";
import MazeGame from "./MazeGame";
import MemoryGame from "./MemoryGame";
import PhotoPuzzle from "./PhotoPuzzle";

type GameNumber = 1 | 2 | 3 | 4;

type Props = {
  onAllGamesFinished: () => void;
  onSkipToPasscode: () => void;
};

export default function SecretGarden({
  onAllGamesFinished,
  onSkipToPasscode,
}: Props) {
  /*
   * Welches Spiel ist gerade geöffnet?
   *
   * null = kein Spiel
   * 1 = Tic Tac Toe
   * 2 = Blütenspiel
   * 3 = Memory
   * 4 = Foto-Puzzle
   */
  const [activeGame, setActiveGame] =
    useState<GameNumber | null>(null);

  /*
   * Bereits gelöste Spiele.
   */
  const [solved, setSolved] =
    useState<GameNumber[]>([]);

  /*
   * Die vier Ziffern des Codes.
   */
  const digits = ["2", "3", "0", "5"];

  /*
   * ------------------------------------------------
   * SPIEL ABSCHLIESSEN
   * ------------------------------------------------
   */

  function finishGame(game: GameNumber) {
    setSolved((oldSolved) => {
      if (oldSolved.includes(game)) {
        return oldSolved;
      }

      return [...oldSolved, game];
    });

    setActiveGame(null);
  }

  /*
   * ------------------------------------------------
   * ALLE VIER SPIELE GELÖST
   * ------------------------------------------------
   */

  useEffect(() => {
    if (solved.length !== 4) return;

    /*
     * Der fertige Code bleibt noch kurz
     * auf dem Bildschirm sichtbar.
     */
    const timer = setTimeout(() => {
      onAllGamesFinished();
    }, 1400);

    return () => clearTimeout(timer);
  }, [solved, onAllGamesFinished]);

  return (
    <main
      className="
        secret-garden-screen
        relative
        min-h-screen
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage:
          "url('/images/garden-background.png')",
      }}
    >
      {/* ========================================= */}
      {/* LEICHTER SCHLEIER ÜBER DEM HINTERGRUND   */}
      {/* ========================================= */}

      <div className="garden-overlay absolute inset-0" />

      {/* ========================================= */}
      {/* TITEL + CODE-FORTSCHRITT                 */}
      {/* ========================================= */}

      <div className="garden-center-content">
        <h1 className="garden-main-title">
          Vier Sachen
          <span>
            passen nicht ins Bild.
          </span>
        </h1>

        {/* CODE-FORTSCHRITT */}

        <div className="mt-7 flex gap-4">
          {digits.map((digit, index) => {
            const gameNumber =
              (index + 1) as GameNumber;

            const isSolved =
              solved.includes(gameNumber);

            return (
              <div
                key={gameNumber}
                className={`digit-slot ${
                  isSolved
                    ? "digit-found"
                    : ""
                }`}
              >
                {isSolved ? digit : "·"}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================= */}
      {/* VERSTECKTES OBJEKT 1                    */}
      {/* BLUME → TIC TAC TOE → 2                 */}
      {/* ========================================= */}

      <SecretObject
        className="left-[15%] top-[34%]"
        solved={solved.includes(1)}
        onClick={() => setActiveGame(1)}
      >
        ✿
      </SecretObject>

      {/* ========================================= */}
      {/* VERSTECKTES OBJEKT 2                    */}
      {/* DACKEL → BLÜTENSPIEL → 3                */}
      {/* ========================================= */}

      <SecretObject
        className="right-[12%] top-[45%]"
        solved={solved.includes(2)}
        onClick={() => setActiveGame(2)}
      >
        🐕
      </SecretObject>

      {/* ========================================= */}
      {/* VERSTECKTES OBJEKT 3                    */}
      {/* YOGA → MEMORY → 0                       */}
      {/* ========================================= */}

      <SecretObject
        className="bottom-[18%] left-[20%]"
        solved={solved.includes(3)}
        onClick={() => setActiveGame(3)}
      >
        🧘‍♀️
      </SecretObject>

      {/* ========================================= */}
      {/* VERSTECKTES OBJEKT 4                    */}
      {/* SONNE → FOTO-PUZZLE → 5                 */}
      {/* ========================================= */}

      <SecretObject
        className="bottom-[25%] right-[18%]"
        solved={solved.includes(4)}
        onClick={() => setActiveGame(4)}
      >
        ☀
      </SecretObject>

      {/* ========================================= */}
      {/* DIREKT ZUM CODE                         */}
      {/* ========================================= */}

      {activeGame === null && solved.length < 4 && (
        <div
          className="
            absolute
            bottom-8
            left-1/2
            z-30
            w-full
            -translate-x-1/2
            px-6
            text-center
          "
        >
          <button
            onClick={onSkipToPasscode}
            className="
              group
              rounded-full
              border
              border-[#8b7568]/20
              bg-[#fffaf5]/45
              px-7
              py-3
              backdrop-blur-sm
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:bg-[#fffaf5]/70
              active:scale-95
            "
          >
            <span
              className="
                block
                text-xs
                tracking-[0.15em]
                text-[#8b7568]/70
              "
            >
              Code schon gefunden?
            </span>

            <span
              className="
                garden-title
                mt-1
                block
                text-lg
                text-[#718064]
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              Direkt eingeben
            </span>
          </button>
        </div>
      )}

      {/* ========================================= */}
      {/* MINIGAME 1                              */}
      {/* TIC TAC TOE                             */}
      {/* ========================================= */}

      {activeGame === 1 && (
        <GameModal
          onClose={() =>
            setActiveGame(null)
          }
        >
          <TicTacToe
            onSolved={() =>
              finishGame(1)
            }
          />
        </GameModal>
      )}

      {/* ========================================= */}
      {/* MINIGAME 2                              */}
      {/* BLÜTENSPIEL                             */}
      {/* ========================================= */}

      {activeGame === 2 && (
        <GameModal
          onClose={() =>
            setActiveGame(null)
          }
        >
          <MazeGame
            onSolved={() =>
              finishGame(2)
            }
          />
        </GameModal>
      )}

      {/* ========================================= */}
      {/* MINIGAME 3                              */}
      {/* MEMORY                                  */}
      {/* ========================================= */}

      {activeGame === 3 && (
        <GameModal
          onClose={() =>
            setActiveGame(null)
          }
        >
          <MemoryGame
            onSolved={() =>
              finishGame(3)
            }
          />
        </GameModal>
      )}

      {/* ========================================= */}
      {/* MINIGAME 4                              */}
      {/* FOTO-PUZZLE                             */}
      {/* ========================================= */}

      {activeGame === 4 && (
        <GameModal
          onClose={() =>
            setActiveGame(null)
          }
        >
          <PhotoPuzzle
            onSolved={() =>
              finishGame(4)
            }
          />
        </GameModal>
      )}
    </main>
  );
}

/*
 * =================================================
 * VERSTECKTES OBJEKT
 * =================================================
 */

function SecretObject({
  children,
  className,
  solved,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  solved: boolean;
  onClick: () => void;
}) {
  return (
    <button
      disabled={solved}
      onClick={onClick}
      className={`
        secret-object
        absolute
        z-10
        ${className}
        ${
          solved
            ? "secret-solved"
            : ""
        }
      `}
      aria-label={
        solved
          ? "Rätsel bereits gelöst"
          : "Verstecktes Rätsel öffnen"
      }
    >
      {solved ? "✓" : children}
    </button>
  );
}