"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

interface AnimatedButtonProps {
  isSubmitting: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function AnimatedButton({
  isSubmitting,
  onClick,
  type = "submit",
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type={type}
      className="relative w-full cursor-pointer h-14 rounded-xl font-mono bg-black text-white overflow-hidden disabled:opacity-70"
      disabled={isSubmitting}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-primary-800"
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0.9 : 1 }}
      />

      {isHovered && !isSubmitting && (
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute top-0 -left-[100%] w-[80%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            animate={{
              left: ["0%", "200%"],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
            }}
          />
        </motion.div>
      )}

      <div className="relative flex items-center justify-center gap-2 z-10 font-mono tracking-wide">
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>PROCESSING...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            <span>GENERATE SUMMARY</span>
          </>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
