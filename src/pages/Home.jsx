import React from "react";
import { delay, motion } from "framer-motion";
import Video from "../components/home/Video";
import HomeHeroText from "../components/home/HomeHeroText";
import HomeButtonText from "../components/home/HomeButtonText";
import { StairsLayout } from '../components/navigation';

function Home() {
  // Scale animation variants
  const scaleVariants = {
    hidden: {
      scale: 1.1, // Start larger than normal
    },
    visible: {
      scale: 1, // Animate to original scale
      transition: {
        duration: 0.3,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <StairsLayout>
      <motion.div 
        className="overflow-x-hidden"
        variants={scaleVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="h-screen w-screen fixed">
          <Video />
        </div>
        <div className="h-screen w-full relative flex flex-col justify-between pb-3">
          <HomeHeroText />
          <HomeButtonText />
        </div>
      </motion.div>
    </StairsLayout>
  );
}

export default Home;