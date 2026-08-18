"use client";

import { useEffect, useState } from "react";

type Phase =
  | "intro"
  | "countdown"
  | "showing"
  | "playing"
  | "won";

const FLOWER_COUNT = 5;

/*
 * Die Reihenfolge der Blüten.
 *
 * 0 = Blüte 1
 * 1 = Blüte 2
 * 2 = Blüte 3
 * 3 = Blüte 4
 * 4 = Blüte 5
 *
 * Insgesamt leuchten 6 Blüten auf.
 */
const SEQUENCE = [1, 4, 2, 0, 4, 3];

export default function MazeGame({
  onSolved,
}: {
  onSolved: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");

  const [countdown, setCountdown] = useState(3);

  /*
   * Blüte, die während der vorgespielten
   * Sequenz gerade leuchtet.
   */
  const [activeFlower, setActiveFlower] =
    useState<number | null>(null);

  /*
   * Bisherige Eingaben der Spielerin.
   */
  const [playerSequence, setPlayerSequence] = useState<
    number[]
  >([]);

  /*
   * Blüte, die von der Spielerin gerade
   * angetippt wurde.
   */
  const [playerActiveFlower, setPlayerActiveFlower] =
    useState<number | null>(null);

  /*
   * Wird gesetzt, wenn eine falsche
   * Blüte angetippt wurde.
   */
  const [wrongFlower, setWrongFlower] =
    useState<number | null>(null);

  /*
   * ------------------------------------------------
   * PHASE 1
   * ZEIT ZUM LESEN
   * ------------------------------------------------
   *
   * Nach dem Öffnen passiert zunächst
   * zwei Sekunden lang nichts.
   */

  useEffect(() => {
    if (phase !== "intro") return;

    const timer = setTimeout(() => {
      setPhase("countdown");
    }, 2000);

    return () => clearTimeout(timer);
  }, [phase]);

  /*
   * ------------------------------------------------
   * PHASE 2
   * COUNTDOWN
   * ------------------------------------------------
   */

  useEffect(() => {
    if (phase !== "countdown") return;

    if (countdown === 0) {
      setPhase("showing");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((old) => old - 1);
    }, 700);

    return () => clearTimeout(timer);
  }, [phase, countdown]);

  /*
   * ------------------------------------------------
   * PHASE 3
   * BLÜTEN-SEQUENZ VORSPIELEN
   * ------------------------------------------------
   */

  useEffect(() => {
    if (phase !== "showing") return;

    let step = 0;
    let activeTimer: ReturnType<typeof setTimeout>;
    let pauseTimer: ReturnType<typeof setTimeout>;

    function showNextFlower() {
      /*
       * Alle sechs Blüten wurden gezeigt.
       */
      if (step >= SEQUENCE.length) {
        setActiveFlower(null);

        pauseTimer = setTimeout(() => {
          setPhase("playing");
        }, 700);

        return;
      }

      /*
       * Aktuelle Blüte aufleuchten lassen.
       */
      const flower = SEQUENCE[step];

      setActiveFlower(flower);

      /*
       * Nach 800 ms wieder ausschalten.
       */
      activeTimer = setTimeout(() => {
        setActiveFlower(null);

        step += 1;

        /*
         * Kleine Pause zwischen zwei Blüten.
         */
        pauseTimer = setTimeout(() => {
          showNextFlower();
        }, 350);
      }, 800);
    }

    /*
     * Kleine Pause nach dem Countdown.
     */
    const startTimer = setTimeout(() => {
      showNextFlower();
    }, 500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(activeTimer);
      clearTimeout(pauseTimer);
    };
  }, [phase]);

  /*
   * ------------------------------------------------
   * PHASE 4
   * SPIELERIN TIPPT DIE BLÜTEN AN
   * ------------------------------------------------
   */

  function chooseFlower(index: number) {
    if (phase !== "playing") return;

    /*
     * Die angetippte Blüte kurz hervorheben.
     */
    setPlayerActiveFlower(index);

    setTimeout(() => {
      setPlayerActiveFlower(null);
    }, 300);

    /*
     * Welche Blüte wäre jetzt richtig?
     */
    const expectedFlower =
      SEQUENCE[playerSequence.length];

    /*
     * ------------------------------
     * FALSCHE BLÜTE
     * ------------------------------
     */

    if (index !== expectedFlower) {
      setWrongFlower(index);

      /*
       * Nach kurzer Animation wird nur
       * ihre Eingabe zurückgesetzt.
       *
       * Die Sequenz wird NICHT erneut
       * vorgespielt.
       */
      setTimeout(() => {
        setWrongFlower(null);
        setPlayerSequence([]);
      }, 600);

      return;
    }

    /*
     * ------------------------------
     * RICHTIGE BLÜTE
     * ------------------------------
     */

    const newSequence = [...playerSequence, index];

    setPlayerSequence(newSequence);

    /*
     * Hat sie alle sechs richtig?
     */
    if (newSequence.length === SEQUENCE.length) {
      /*
       * Kurze Pause nach der letzten
       * richtigen Eingabe.
       */
      setTimeout(() => {
        setPhase("won");
      }, 500);

      /*
       * Danach wird das Minigame geschlossen
       * und die 3 im Hauptbildschirm gespeichert.
       */
      setTimeout(() => {
        onSolved();
      }, 2000);
    }
  }

  /*
   * ------------------------------------------------
   * PHASE 5
   * GEWONNEN
   * ------------------------------------------------
   */

  if (phase === "won") {
    return (
      <div className="digit-reveal py-8 text-center">
        <div className="flower-success text-5xl">
          ❀
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#998075]">
          Zweite Ziffer
        </p>

        <div className="garden-title mt-3 text-7xl text-[#718064]">
          3
        </div>
      </div>
    );
  }

  /*
   * ------------------------------------------------
   * HAUPTANSICHT DES SPIELS
   * ------------------------------------------------
   */

  return (
    <div className="text-center">
      {/* Welche Ziffer wird gesucht? */}

      <p className="game-number">
        Zweite Ziffer
      </p>

      {/* Titel */}

      <h2 className="garden-title mt-3 text-3xl text-[#76594d]">
        Merk dir die Blüten.
      </h2>

      {/* Erklärung */}

      <p className="mx-auto mt-3 max-w-[280px] text-sm leading-6 text-[#917c70]">
        Merk dir, in welcher Reihenfolge die Blüten
        erwachen.
      </p>

      {/* ----------------------------------------- */}
      {/* STATUS                                    */}
      {/* ----------------------------------------- */}

      <div className="mt-6 h-8">
        {/* Zeit zum Lesen */}

        {phase === "intro" && (
          <p className="text-sm text-[#8c766a]">
            Gleich geht&apos;s los …
          </p>
        )}

        {/* Countdown */}

        {phase === "countdown" && (
          <p className="garden-title text-2xl text-[#718064]">
            {countdown > 0 ? countdown : ""}
          </p>
        )}

        {/* Sequenz läuft */}

        {phase === "showing" && (
          <p className="text-sm text-[#8c766a]">
            Gut aufpassen ♡
          </p>
        )}

        {/* Spielerin ist dran */}

        {phase === "playing" && (
          <p className="garden-title text-xl text-[#718064]">
            Jetzt du.
          </p>
        )}
      </div>

      {/* ----------------------------------------- */}
      {/* DIE FÜNF BLÜTEN                           */}
      {/* ----------------------------------------- */}

      <div className="mx-auto mt-5 flex max-w-[330px] flex-wrap justify-center gap-4">
        {Array.from({ length: FLOWER_COUNT }).map(
          (_, index) => {
            /*
             * Leuchtet während der
             * vorgespielten Sequenz.
             */
            const isActive =
              activeFlower === index;

            /*
             * Leuchtet kurz grün,
             * wenn sie richtig tippt.
             */
            const isPlayerActive =
              playerActiveFlower === index &&
              wrongFlower !== index;

            /*
             * Wackelt bei falscher Eingabe.
             */
            const isWrong =
              wrongFlower === index;

            return (
              <button
                key={index}
                onClick={() => chooseFlower(index)}
                disabled={phase !== "playing"}
                className={`
                  flower-button
                  ${isActive ? "flower-awake" : ""}
                  ${
                    isPlayerActive
                      ? "flower-correct"
                      : ""
                  }
                  ${
                    isWrong
                      ? "flower-wrong"
                      : ""
                  }
                `}
              >
                <span className="flower-symbol">
                  ✿
                </span>
              </button>
            );
          },
        )}
      </div>

      {/* ----------------------------------------- */}
      {/* FORTSCHRITT BEI DER EINGABE               */}
      {/* ----------------------------------------- */}

      {phase === "playing" && (
        <div className="mt-8 flex justify-center gap-3">
          {SEQUENCE.map((_, index) => {
            const completed =
              playerSequence.length > index;

            return (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  completed
                    ? "scale-125 bg-[#7f8d70]"
                    : "bg-[#d8c4b8]"
                }`}
              />
            );
          })}
        </div>
      )}

      {/* Hinweis nach Fehler */}

      {wrongFlower !== null && (
        <p className="mt-5 text-sm text-[#a56f67]">
          Fast – nochmal von vorne ♡
        </p>
      )}
    </div>
  );
}