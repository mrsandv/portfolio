"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

export function GlitchAvatar({ src = "/hero-photo.jpg" }: { src?: string }) {
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
        transition={{
          duration: hovered ? 0.4 : 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: hovered ? 0.2 : 5.5,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{ background: "oklch(0.57 0.06 65 / 0.4)" }}
      />

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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0 2px, currentColor 2px 3px)",
        }}
      />

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
