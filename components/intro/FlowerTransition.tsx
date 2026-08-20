"use client";

import { useEffect } from "react";

type Props = {
  onCovered: () => void;
  onFinished: () => void;
};

type FlowerData = {
  id: number;
  left: number;
  top: number;
  size: number;
  rotation: number;
  spinDuration: number;
  image: string;
};

/*
 * =================================================
 * DEINE 6 BLUMEN
 * =================================================
 *
 * Die Dateien müssen exakt hier liegen:
 *
 * public/images/flowers/flower-01.png
 * public/images/flowers/flower-02.png
 * public/images/flowers/flower-03.png
 * public/images/flowers/flower-04.png
 * public/images/flowers/flower-05.png
 * public/images/flowers/flower-06.png
 */

const FLOWER_IMAGES = [
  "/images/flowers/flower-01.png",
  "/images/flowers/flower-02.png",
  "/images/flowers/flower-03.png",
  "/images/flowers/flower-04.png",
  "/images/flowers/flower-05.png",
  "/images/flowers/flower-06.png",
];

/*
 * =================================================
 * BLUMENMENGE
 * =================================================
 *
 * 26 × 24 = 624 Blumen.
 *
 * Der Vorhang wird dadurch sehr dicht.
 */

const COLUMNS = 36;
const ROWS = 32;

/*
 * =================================================
 * BLUMEN IM VORHANG VERTEILEN
 * =================================================
 */

const FLOWERS: FlowerData[] = Array.from(
  {
    length: COLUMNS * ROWS,
  },
  (_, index) => {
    const column = index % COLUMNS;

    const row =
      Math.floor(index / COLUMNS);

    /*
     * Gleichmäßige Grundverteilung.
     */

    const baseLeft =
      ((column + 0.5) / COLUMNS) * 100;

    const baseTop =
      ((row + 0.5) / ROWS) * 100;

    /*
     * Kleine Verschiebungen verhindern,
     * dass man ein perfektes Raster sieht.
     */

    const horizontalJitter =
      ((((index * 37) % 100) / 100) -
        0.5) *
      3.2;

    const verticalJitter =
      ((((index * 53) % 100) / 100) -
        0.5) *
      3;

    /*
     * Unterschiedliche Größen.
     */

    const size =
      90 + ((index * 31) % 75);

    /*
     * Unterschiedliche Startrotation.
     */

    const rotation =
      (index * 67) % 360;

    /*
     * Langsame Eigenrotation.
     */

    const spinDuration =
      7 + ((index * 23) % 45) / 10;

    return {
      id: index,

      left:
        baseLeft +
        horizontalJitter,

      top:
        baseTop +
        verticalJitter,

      size,

      rotation,

      spinDuration,

      image:
        FLOWER_IMAGES[
          index % FLOWER_IMAGES.length
        ],
    };
  },
);

/*
 * =================================================
 * TRANSITION
 * =================================================
 */

export default function FlowerTransition({
  onCovered,
  onFinished,
}: Props) {
  useEffect(() => {
    /*
     * Während der Bildschirm vollständig
     * vom Blumenvorhang verdeckt ist,
     * wechseln wir im Hintergrund zur Homepage.
     */

    const coveredTimer =
      window.setTimeout(() => {
        onCovered();
      }, 3350);

    /*
     * Danach ist der komplette Vorhang
     * unten aus dem Bildschirm verschwunden.
     */

    const finishedTimer =
      window.setTimeout(() => {
        onFinished();
      }, 7600);

    return () => {
      window.clearTimeout(
        coveredTimer,
      );

      window.clearTimeout(
        finishedTimer,
      );
    };
  }, [onCovered, onFinished]);

  return (
    <div
      className="flower-transition"
      aria-hidden="true"
    >
      <div className="flower-curtain">
        {FLOWERS.map((flower) => (
          <div
            key={flower.id}
            className="curtain-flower"
            style={{
              left: `${flower.left}%`,

              top: `${flower.top}%`,

              width:
                `${flower.size}px`,

              height:
                `${flower.size}px`,

              ["--flower-start-rotation" as string]:
                `${flower.rotation}deg`,

              ["--flower-spin-duration" as string]:
                `${flower.spinDuration}s`,
            }}
          >
            <div className="curtain-flower-spinner">
              <img
                src={flower.image}
                alt=""
                draggable={false}
                className="curtain-flower-image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}