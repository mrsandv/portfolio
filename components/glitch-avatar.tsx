"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const GLITCH_DURATION_IDLE = 0.5;
const GLITCH_DURATION_HOVER = 0.4;
const GLITCH_DELAY_IDLE = 5.4;
const GLITCH_DELAY_HOVER = 0.2;

const TINT_WARM = "oklch(0.57 0.06 65 / 0.4)";
const TINT_COOL = "oklch(0.38 0.015 215 / 0.4)";
const SCANLINES =
  "repeating-linear-gradient(0deg, transparent 0 2px, currentColor 2px 3px)";

export function GlitchAvatar({ src = "/hero-photo.jpg" }: { src?: string }) {
  const [hovered, setHovered] = useState(false);

  const loop = {
    duration: hovered ? GLITCH_DURATION_HOVER : GLITCH_DURATION_IDLE,
    repeat: Number.POSITIVE_INFINITY,
    repeatDelay: hovered ? GLITCH_DELAY_HOVER : GLITCH_DELAY_IDLE,
    ease: "linear" as const,
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        x: [0, -2, 3, -1, 2, 0, 0],
        skewX: [0, -1.2, 0.8, -0.4, 0, 0, 0],
      }}
      transition={loop}
      className="group relative h-full w-full overflow-hidden"
    >
      <div className="relative h-full min-h-[300px] w-full">
        <Image
          src={src}
          alt="Profile"
          fill
          className="object-cover object-right-top grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
          priority
        />
      </div>

      <motion.div
        aria-hidden
        animate={{
          x: [0, 4, -3, 2, 0, 0, 0],
          opacity: [0, 0.55, 0.4, 0.5, 0, 0, 0],
        }}
        transition={loop}
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{ background: TINT_WARM }}
      />

      <motion.div
        aria-hidden
        animate={{
          x: [0, -4, 3, -2, 0, 0, 0],
          opacity: [0, 0.5, 0.35, 0.45, 0, 0, 0],
        }}
        transition={loop}
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ background: TINT_COOL }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ background: SCANLINES }}
      />

      <motion.div
        aria-hidden
        animate={{ opacity: [0, 0.18, 0, 0.1, 0, 0, 0] }}
        transition={loop}
        className="pointer-events-none absolute inset-0 bg-foreground"
      />
    </motion.div>
  );
}
