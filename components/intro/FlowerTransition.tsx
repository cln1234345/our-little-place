"use client";

import { useEffect } from "react";

type Props = {
  onCovered: () => void;
  onFinished: () => void;
};

type PetalData = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  drift: number;
  variant: number;
};

const PETALS: PetalData[] = Array.from(
  { length: 1600 },
  (_, index) => {
    return {
      id: index,

      // komplette Bildschirmbreite
      left: ((index * 47 + 13) % 108) - 4,

      // viel stärkere Staffelung
      delay: ((index * 19) % 140) / 100,

      // alle laufen ungefähr gleichmäßig durch
      duration:
        1.5 + ((index * 11) % 80) / 100,

      // deutlich größere Spannweite
      size:
        26 + ((index * 23) % 52),

      rotation:
        (index * 61) % 360,

      drift:
        ((index * 31) % 220) - 110,

      variant:
        index % 5,
    };
  },
);

export default function FlowerTransition({
  onCovered,
  onFinished,
}: Props) {
  useEffect(() => {
    /*
     * Zu diesem Zeitpunkt ist der Bildschirm
     * ungefähr komplett von Blüten bedeckt.
     */
    const coveredTimer = setTimeout(() => {
      onCovered();
    }, 1650);

    /*
     * Danach sind alle Blüten unten raus.
     */
    const finishedTimer = setTimeout(() => {
      onFinished();
    }, 4300);

    return () => {
      clearTimeout(coveredTimer);
      clearTimeout(finishedTimer);
    };
  }, [onCovered, onFinished]);

  return (
    <div
      className="flower-transition"
      aria-hidden="true"
    >
      <div className="flower-transition-veil" />

      <div className="flower-petal-layer">
        {PETALS.map((petal) => (
          <div
            key={petal.id}
            className="falling-petal"
            style={{
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,

              ["--petal-rotation" as string]:
                `${petal.rotation}deg`,

              ["--petal-drift" as string]:
                `${petal.drift}px`,
            }}
          >
            <Petal
              variant={petal.variant}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Petal({
  variant,
}: {
  variant: number;
}) {
  const colors = [
    {
      main: "#d8a99d",
      light: "#f1d7ce",
      dark: "#b98278",
    },
    {
      main: "#e5bcae",
      light: "#f6dfd5",
      dark: "#c69383",
    },
    {
      main: "#efd8c9",
      light: "#fff0e5",
      dark: "#d4ad9d",
    },
    {
      main: "#c9958b",
      light: "#e9c8bd",
      dark: "#aa756d",
    },
    {
      main: "#ead1c2",
      light: "#f8e8dc",
      dark: "#caa495",
    },
  ];

  const color =
    colors[variant % colors.length];

  const paths = [
    "M50 7C72 15 91 34 88 56C85 77 68 94 50 96C32 92 14 77 12 56C9 34 28 15 50 7Z",

    "M52 5C74 18 88 40 82 62C77 82 61 95 43 93C25 88 13 70 17 51C22 30 34 14 52 5Z",

    "M48 6C68 12 89 30 91 50C92 72 74 89 53 96C31 91 12 75 10 54C8 34 27 15 48 6Z",

    "M54 7C75 18 88 37 84 59C80 80 64 94 45 94C27 87 14 72 16 52C19 31 36 15 54 7Z",

    "M50 5C70 15 88 32 88 53C87 74 70 91 51 96C30 92 14 75 12 55C11 34 29 15 50 5Z",
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className="petal-svg"
    >
      <defs>
        <linearGradient
          id={`petalGradient-${variant}`}
          x1="15%"
          y1="10%"
          x2="85%"
          y2="90%"
        >
          <stop
            offset="0%"
            stopColor={color.light}
          />

          <stop
            offset="55%"
            stopColor={color.main}
          />

          <stop
            offset="100%"
            stopColor={color.dark}
          />
        </linearGradient>
      </defs>

      <path
        d={paths[variant % paths.length]}
        fill={`url(#petalGradient-${variant})`}
      />

      <path
        d="M50 17C47 38 47 62 51 87"
        fill="none"
        stroke="rgba(123,82,75,0.20)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}