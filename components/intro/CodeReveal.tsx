"use client";

import { useEffect } from "react";

export default function CodeReveal({
  onFinished,
}: {
  onFinished: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinished();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onFinished]);

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
      {/* Leichter Schleier wie beim Secret Garden */}
      <div className="garden-overlay absolute inset-0" />

      {/* Inhalt */}
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
        <p
          className="
            mb-6
            text-xs
            uppercase
            tracking-[0.28em]
            text-[#8b7568]
          "
        >
          Dein Code
        </p>

        <div className="code-final flex gap-4">
          <span style={{ animationDelay: "0ms" }}>
            2
          </span>

          <span style={{ animationDelay: "250ms" }}>
            3
          </span>

          <span style={{ animationDelay: "500ms" }}>
            0
          </span>

          <span style={{ animationDelay: "750ms" }}>
            5
          </span>
        </div>

        <p
          className="
            remember-code
            garden-title
            mt-8
            text-2xl
            text-[#76594d]
          "
        >
          Merk dir den Code ♡
        </p>
      </div>
    </main>
  );
}