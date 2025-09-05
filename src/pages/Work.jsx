import React from "react";
import { motion } from "framer-motion";
import { StairsLayout } from "../components/navigation";
import ProjectsCards from "../components/projects/ProjectsCards";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Work() {
  // Animation variants for bottom-to-top reveal
  const textVariants = {
    hidden: {
      y: "100%", // Start from below
    },
    visible: {
      y: 0, // Animate to original position
      transition: {
        duration: 0.4,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <StairsLayout>
      <div className="p-3 bg-white">
        <div className="pt-[45.5vh]">
          <div className="overflow-hidden">
            <motion.h1 
              className="text-[18vw] tracking-tight lg:text-[11vw] font-[L500] leading-none"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              WORK
            </motion.h1>
          </div>
        </div>
        <div className="mt-5 lg:-mt-7 lol h-[475h]">
          <ProjectsCards />
        </div>
      </div>
    </StairsLayout>
  );
}