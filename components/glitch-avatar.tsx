"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function GlitchAvatar() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        x: [0, -2, 3, -1, 2, 0, 0],
        skewX: [0, -1.2, 0.8, -0.4, 0, 0, 0],
      }}
      transition={{
        duration: hovered ? 0.4 : 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: hovered ? 0.2 : 5.5,
        ease: "linear",
      }}
      className="relative h-full w-full overflow-hidden"
    >
      {/* Base layer — replace with <Image src="..." /> when real photo arrives */}
      <div className="flex h-full min-h-[260px] items-center justify-center">
        <div className="flex flex-col items-center gap-3 px-4 text-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-muted">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              photo
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            [ placeholder · sprint 2 ]
          </span>
        </div>
      </div>

      {/* Copper ghost layer */}
      <motion.div
        aria-hidden
        animate={{
          x: [0, 4, -3, 2, 0, 0, 0],
          opacity: [0, 0.55, 0.4, 0.5, 0, 0, 0],
        }}
        transition={{
          duration: hovered ? 0.4 : 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: hovered ? 0.2 : 5.5,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{ background: "oklch(0.57 0.06 65 / 0.4)" }}
      />

      {/* Charcoal ghost layer */}
      <motion.div
        aria-hidden
        animate={{
          x: [0, -4, 3, -2, 0, 0, 0],
          opacity: [0, 0.5, 0.35, 0.45, 0, 0, 0],
        }}
        transition={{
          duration: hovered ? 0.4 : 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: hovered ? 0.2 : 5.5,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ background: "oklch(0.38 0.015 215 / 0.4)" }}
      />

      {/* Scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0 2px, currentColor 2px 3px)",
        }}
      />

      {/* Brief flicker overlay */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0, 0.18, 0, 0.1, 0, 0, 0] }}
        transition={{
          duration: hovered ? 0.4 : 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: hovered ? 0.2 : 5.5,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-0 bg-foreground"
      />
    </motion.div>
  );
}
