"use client";

import { useState } from "react";

type Props = {
  onUnlocked: () => void;
  onBack: () => void;
};

const CORRECT_CODE = "2305";

export default function PasscodeScreen({
  onUnlocked,
  onBack,
}: Props) {
  const [code, setCode] = useState("");

  const [wrongCode, setWrongCode] =
    useState(false);

  /*
   * Wird true, sobald 2305 korrekt
   * eingegeben wurde.
   */
  const [correctCode, setCorrectCode] =
    useState(false);

  /*
   * ------------------------------------------------
   * ZAHL EINGEBEN
   * ------------------------------------------------
   */

  function handleNumber(number: string) {
    /*
     * Während der Unlock-Animation
     * keine weiteren Eingaben erlauben.
     */
    if (correctCode) return;

    if (code.length >= 4) return;

    const newCode = code + number;

    setCode(newCode);
    setWrongCode(false);

    if (newCode.length === 4) {
      checkCode(newCode);
    }
  }

  /*
   * ------------------------------------------------
   * CODE PRÜFEN
   * ------------------------------------------------
   */

  function checkCode(
    enteredCode: string,
  ) {
    /*
     * RICHTIG
     */

    if (
      enteredCode === CORRECT_CODE
    ) {
      setCorrectCode(true);

      /*
       * Erst dürfen die Punkte kurz hüpfen.
       *
       * Danach startet der Blütenvorhang.
       */
      setTimeout(() => {
        onUnlocked();
      }, 850);

      return;
    }

    /*
     * FALSCH
     */

    setWrongCode(true);

    setTimeout(() => {
      setCode("");
      setWrongCode(false);
    }, 650);
  }

  /*
   * ------------------------------------------------
   * LETZTE ZAHL LÖSCHEN
   * ------------------------------------------------
   */

  function handleDelete() {
    if (correctCode) return;

    if (code.length === 0) return;

    setWrongCode(false);

    setCode((currentCode) =>
      currentCode.slice(0, -1),
    );
  }

  const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  return (
    <main
      className="
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
      {/* HINTERGRUND-SCHLEIER                     */}
      {/* ========================================= */}

      <div className="garden-overlay absolute inset-0" />

      {/* ========================================= */}
      {/* ZURÜCK                                   */}
      {/* ========================================= */}

      {!correctCode && (
        <button
          onClick={onBack}
          className="
            absolute
            left-6
            top-6
            z-30

            flex
            items-center
            gap-2

            rounded-full

            border
            border-[#8b7568]/15

            bg-[#fffaf5]/35

            px-4
            py-2

            text-sm
            text-[#76594d]/75

            backdrop-blur-sm

            transition-all
            duration-300

            hover:scale-[1.03]
            hover:bg-[#fffaf5]/65
            hover:text-[#76594d]

            active:scale-95
          "
        >
          <span className="text-lg">
            ←
          </span>

          <span>
            Zu den Rätseln
          </span>
        </button>
      )}

      {/* ========================================= */}
      {/* CODE-BILDSCHIRM                          */}
      {/* ========================================= */}

      <div
        className="
          relative
          z-20

          flex
          min-h-screen
          flex-col
          items-center
          justify-center

          px-6

          text-center
        "
      >
        {/* ======================================= */}
        {/* ÜBERSCHRIFT                            */}
        {/* ======================================= */}

        <div className="mb-8">
          <h1
            className="
              garden-main-title
              text-[#74574c]
            "
          >
            Dein Code
          </h1>

          <p
            className="
              mt-3
              text-xs
              uppercase
              tracking-[0.22em]
              text-[#8b7568]/70
            "
          >
            Vier Ziffern
          </p>
        </div>

        {/* ======================================= */}
        {/* CODE-PUNKTE                            */}
        {/* ======================================= */}

        <div
          className={`
            mb-10
            flex
            gap-5

            ${
              wrongCode
                ? "animate-shake"
                : ""
            }
          `}
        >
          {[0, 1, 2, 3].map(
            (index) => {
              const filled =
                index < code.length;

              return (
                <div
                  key={index}
                  style={
                    correctCode
                      ? {
                          animationDelay:
                            `${index * 100}ms`,
                        }
                      : undefined
                  }
                  className={`
                    h-3
                    w-3

                    rounded-full

                    border
                    border-[#76594d]/50

                    transition-all
                    duration-200

                    ${
                      filled
                        ? `
                          scale-110
                          border-[#718064]
                          bg-[#718064]
                        `
                        : `
                          bg-[#fffaf5]/35
                        `
                    }

                    ${
                      correctCode
                        ? "unlock-dot"
                        : ""
                    }
                  `}
                />
              );
            },
          )}
        </div>

        {/* ======================================= */}
        {/* FALSCHER CODE                          */}
        {/* ======================================= */}

        <div className="mb-4 h-5">
          {wrongCode && (
            <p
              className="
                garden-title
                text-sm
                text-[#a06f68]
              "
            >
              Versuch&apos;s nochmal ♡
            </p>
          )}
        </div>

        {/* ======================================= */}
        {/* ZAHLENTASTEN                           */}
        {/* ======================================= */}

        <div
          className={`
            grid
            grid-cols-3

            gap-x-5
            gap-y-4

            transition-all
            duration-500

            ${
              correctCode
                ? `
                  pointer-events-none
                  opacity-45
                  scale-95
                `
                : ""
            }
          `}
        >
          {numbers.map((number) => (
            <PasscodeButton
              key={number}
              onClick={() =>
                handleNumber(number)
              }
            >
              {number}
            </PasscodeButton>
          ))}

          {/* LEER */}

          <div className="h-[68px] w-[68px]" />

          {/* NULL */}

          <PasscodeButton
            onClick={() =>
              handleNumber("0")
            }
          >
            0
          </PasscodeButton>

          {/* LÖSCHEN */}

          <button
            onClick={handleDelete}
            disabled={
              code.length === 0 ||
              correctCode
            }
            aria-label="Letzte Zahl löschen"
            className="
              flex
              h-[68px]
              w-[68px]
              items-center
              justify-center

              rounded-full

              border-0
              bg-transparent

              text-xl
              text-[#76594d]/65

              transition-all
              duration-200

              hover:scale-110
              hover:text-[#76594d]

              active:scale-90

              disabled:cursor-default
              disabled:opacity-20
            "
          >
            ⌫
          </button>
        </div>
      </div>
    </main>
  );
}

/*
 * =================================================
 * ZAHLENTASTE
 * =================================================
 */

function PasscodeButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        flex
        h-[68px]
        w-[68px]
        items-center
        justify-center

        rounded-full

        border
        border-[#8b7568]/20

        bg-[#fffaf5]/45

        text-2xl
        font-normal
        text-[#76594d]

        shadow-[0_6px_20px_rgba(83,65,52,0.06)]

        backdrop-blur-sm

        transition-all
        duration-200

        hover:scale-105
        hover:bg-[#fffaf5]/70

        active:scale-90
        active:bg-[#e6d4c6]/60
      "
    >
      {children}
    </button>
  );
}