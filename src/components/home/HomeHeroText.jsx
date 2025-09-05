import React from "react";
import { motion } from "framer-motion";
import Video from "./Video";

function HomeHeroText() {
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Stagger delay between children
      },
    },
  };

  const textVariants = {
    hidden: {
      y: "-100%", // Start from above
    },
    visible: {
      y: 0, // Animate to original position
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="font-[L300] text-white text-center lg:mt-5 md:mt-[60vh] sm:mt-[55vh] mt-[54vh]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* First line */}
      <div className="overflow-hidden">
        <motion.div
          className="uppercase lg:text-[9.6vw] lg:leading-[8.5vw] md:text-[8vw] md:leading-[7vw] sm:text-[10vw] sm:leading-[8vw] text-[12vw] leading-[11vw] "
          variants={textVariants}
        >
          <h1>The spark for</h1>
        </motion.div>
      </div>

      {/* Second line with video */}
      <div className="overflow-hidden">
        <motion.div
          className="uppercase lg:text-[9.6vw] lg:leading-[8vw] md:text-[8vw] md:leading-[7vw] sm:text-[10vw] sm:leading-[8vw] text-[12vw] leading-[11vw] flex items-center justify-center"
          variants={textVariants}
        >
          <h1>all</h1>
          <div className="flex items-center justify-center overflow-hidden lg:h-[7vw] lg:w-[16vw] lg:rounded-full md:h-[6vw] md:w-[20vw] md:rounded-full md:mx-2 sm:h-[8vw] sm:w-[35vw] sm:rounded-full sm:mx-2 h-[10vw] w-[20vw] rounded-full mx-2">
            <Video />
          </div>
          <h1>things</h1>
        </motion.div>
      </div>

      {/* Third line */}
      <div className="overflow-hidden">
        <motion.div
          className="uppercase lg:text-[9.6vw] lg:leading-[8vw] md:text-[8vw] md:leading-[7vw] sm:text-[10vw] sm:leading-[8vw] text-[12vw] leading-[11vw]"
          variants={textVariants}
        >
          <h1>creative</h1>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HomeHeroText;