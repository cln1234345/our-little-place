"use client";

import { useState } from "react";

import SecretGarden from "@/components/intro/SecretGarden";
import CodeReveal from "@/components/intro/CodeReveal";
import PasscodeScreen from "@/components/intro/PasscodeScreen";

type IntroStage =
  | "garden"
  | "reveal"
  | "passcode"
  | "website";

export default function Home() {
  const [stage, setStage] =
    useState<IntroStage>("garden");

  /* ========================================= */
  /* SECRET GARDEN                            */
  /* ========================================= */

  if (stage === "garden") {
    return (
      <SecretGarden
        onAllGamesFinished={() =>
          setStage("reveal")
        }
        onSkipToPasscode={() =>
          setStage("passcode")
        }
      />
    );
  }

  /* ========================================= */
  /* CODE NACH DEN RÄTSELN                    */
  /* ========================================= */

  if (stage === "reveal") {
    return (
      <CodeReveal
        onFinished={() =>
          setStage("passcode")
        }
      />
    );
  }

  /* ========================================= */
  /* CODE EINGEBEN                            */
  /* ========================================= */

  if (stage === "passcode") {
    return (
      <PasscodeScreen
        onUnlocked={() =>
          setStage("website")
        }
        onBack={() =>
          setStage("garden")
        }
      />
    );
  }

  /* ========================================= */
  /* EIGENTLICHE WEBSITE                      */
  /* ========================================= */

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4e9df] px-6 text-center">
      <div>
        <p className="garden-title text-5xl text-[#76594d]">
          Unser kleiner Ort
        </p>

        <p className="mt-5 text-[#7b7168]">
          Ab hier beginnt später die eigentliche Website. ♡
        </p>
      </div>
    </main>
  );
}