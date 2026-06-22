"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0 },
};

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0 },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

type RevealProps = HTMLMotionProps<"div"> & {
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
};

export function Reveal({ direction = "up", delay = 0, transition, ...props }: RevealProps) {
  const variants =
    direction === "left"
      ? slideLeftVariants
      : direction === "right"
        ? slideRightVariants
        : direction === "scale"
          ? scaleVariants
          : fadeVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={variants}
      transition={{ duration: 0.55, ease: "easeOut", delay, ...transition }}
      {...props}
    />
  );
}

export function Stagger({ transition, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={staggerVariants}
      transition={transition}
      {...props}
    />
  );
}

export function StaggerItem({ transition, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ duration: 0.5, ease: "easeOut", ...transition }}
      {...props}
    />
  );
}

export function Float({ delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay }}
      {...props}
    />
  );
}
