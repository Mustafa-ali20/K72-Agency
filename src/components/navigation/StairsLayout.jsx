import React from "react";
import { motion } from "framer-motion";
import { opacity, expand } from "./animations/stairsAnim";

export default function StairsLayout({ children, backgroundColor = "#000" }) {
  const anim = (variants, custom = null) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      custom,
      variants,
    };
  };

  const nbOfColumns = 5;

  return (
    <>
      {/* Transition Elements - Only visible during page transitions */}
      <motion.div
        {...anim(opacity)}
        className="fixed inset-0 w-full h-screen bg-black pointer-events-none z-[9999]"
      />

      <div className="fixed inset-0 w-screen h-screen flex pointer-events-none z-[9999]">
        {[...Array(nbOfColumns)].map((_, i) => {
          return (
            <motion.div
              key={i}
              {...anim(expand, nbOfColumns - i)}
              className="relative h-full w-full bg-black"
            />
          );
        })}
      </div>

      {/* Page Content - Completely normal, scrollable content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        className="relative w-full min-h-screen overflow-x-hidden"
        style={{ backgroundColor }}
      >
        {children}
      </motion.div>
    </>
  );
}
