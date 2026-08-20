"use client";

import { useState } from "react";

import SecretGarden from "@/components/intro/SecretGarden";
import CodeReveal from "@/components/intro/CodeReveal";
import PasscodeScreen from "@/components/intro/PasscodeScreen";
import FlowerTransition from "@/components/intro/FlowerTransition";

type IntroStage =
  | "garden"
  | "reveal"
  | "passcode"
  | "website";

export default function Home() {
  /*
   * Welche Seite ist gerade sichtbar?
   */
  const [stage, setStage] =
    useState<IntroStage>("garden");

  /*
   * Läuft gerade die Blütenanimation?
   */
  const [
    flowerTransitionActive,
    setFlowerTransitionActive,
  ] = useState(false);

  /*
   * ------------------------------------------------
   * RICHTIGER CODE
   * ------------------------------------------------
   *
   * PasscodeScreen ruft diese Funktion auf,
   * nachdem die vier grünen Punkte
   * ihre Animation beendet haben.
   */

  function startUnlockTransition() {
    setFlowerTransitionActive(true);
  }

  /*
   * ------------------------------------------------
   * BLÜTEN BEDECKEN DEN BILDSCHIRM
   * ------------------------------------------------
   *
   * Genau jetzt wechseln wir im Hintergrund
   * von der Code-Eingabe zur Hauptseite.
   */

  function handleScreenCovered() {
    setStage("website");
  }

  /*
   * ------------------------------------------------
   * BLÜTEN SIND UNTEN VERSCHWUNDEN
   * ------------------------------------------------
   */

  function handleTransitionFinished() {
    setFlowerTransitionActive(false);
  }

  /*
   * ------------------------------------------------
   * AKTUELLEN SEITENINHALT BESTIMMEN
   * ------------------------------------------------
   */

  let content: React.ReactNode;

  /*
   * SECRET GARDEN
   */

  if (stage === "garden") {
    content = (
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

  /*
   * CODE NACH DEN RÄTSELN ZEIGEN
   */

  else if (stage === "reveal") {
    content = (
      <CodeReveal
        onFinished={() =>
          setStage("passcode")
        }
      />
    );
  }

  /*
   * CODE EINGEBEN
   */

  else if (stage === "passcode") {
    content = (
      <PasscodeScreen
        onUnlocked={
          startUnlockTransition
        }
        onBack={() =>
          setStage("garden")
        }
      />
    );
  }

  /*
   * HAUPTSEITE
   */

  else {
    content = <MainHomepage />;
  }

  return (
    <>
      {/* Aktuelle Seite */}

      {content}

      {/* ======================================= */}
      {/* BLÜTENVORHANG                          */}
      {/* ======================================= */}

      {flowerTransitionActive && (
        <FlowerTransition
          onCovered={
            handleScreenCovered
          }
          onFinished={
            handleTransitionFinished
          }
        />
      )}
    </>
  );
}

/*
 * =================================================
 * HAUPTSEITE
 * =================================================
 *
 * Das ist momentan weiterhin nur unser Platzhalter.
 *
 * Später bauen wir hier die richtige Homepage.
 */

function MainHomepage() {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#f5e9df]
        px-6
        text-center
      "
    >
      <div>
        <h1
          className="
            garden-main-title
            text-[#74574c]
          "
        >
          Unser kleiner Ort
        </h1>

        <p
          className="
            mt-6
            text-[#7b7168]
          "
        >
          Ab hier beginnt unsere Website ♡
        </p>
      </div>
    </main>
  );
}