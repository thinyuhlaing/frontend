"use client";
import { motion, HTMLMotionProps } from "motion/react";

interface MotionButtonProps extends HTMLMotionProps<"button"> {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function MotionButton({
  className = "",
  children,
  disabled,
  ...props
}: MotionButtonProps) {
  return (
    <motion.button
      {...props}
      disabled={disabled}
      className={`px-4 py-2 rounded-full flex items-center transition-colors
      ${
        disabled
          ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
          : `${className}`
      }`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.button>
  );
}
