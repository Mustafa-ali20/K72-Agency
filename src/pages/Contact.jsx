import React, { useEffect, useRef } from "react";
import { delay, motion } from "framer-motion";
import { StairsLayout } from "../components/navigation";

function Contact() {
  const marqueeRef = useRef(null);
  const marqueeRef2 = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Create GSAP-like animation manually since GSAP isn't available
    let tiltAngle = -3; // Start with left tilt

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection =
        currentScrollY > lastScrollY.current ? "down" : "up";

      if (scrollDirection === "up") {
        tiltAngle = 3; // Right tilt when scrolling up
      } else {
        tiltAngle = -3; // Left tilt when scrolling down
      }

      // Apply tilt to both marquees
      if (marqueeRef.current) {
        marqueeRef.current.style.transform = `rotate(${tiltAngle}deg)`;
      }
      if (marqueeRef2.current) {
        marqueeRef2.current.style.transform = `rotate(${tiltAngle}deg)`;
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // Set initial tilt for both marquees only
    if (marqueeRef.current) {
      marqueeRef.current.style.transform = "rotate(-3deg)";
      marqueeRef.current.style.transformOrigin = "center";
    }
    if (marqueeRef2.current) {
      marqueeRef2.current.style.transform = "rotate(-3deg)";
      marqueeRef2.current.style.transformOrigin = "center";
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      y: "-100%",
       // Start from above
    },
    visible: {
      y: 0, // Animate to original position
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <StairsLayout>
      <div className="bg-black min-h-screen w-full text-white">
        {/* FIRST SECTION: Text + Marquee */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-22 md:py-24 lg:px-20 lg:py-5"
        >
          <div className="h-full w-full">
            <div className="overflow-hidden">
              <motion.h1
                variants={textVariants}
                className="uppercase text-center font-[L300] text-[11vw] md:text-[10vw] lg:text-[10vw] leading-11 md:leading-20 lg:leading-41"
              >
                To talk
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={textVariants}
                className="uppercase text-center font-[L300] text-[11vw] md:text-[10vw] lg:text-[10vw] leading-11 md:leading-20 lg:leading-41"
              >
                about
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={textVariants}
                className="uppercase text-center font-[L300] text-[11vw] md:text-[10vw] lg:text-[10vw] leading-11 md:leading-20 lg:leading-41"
              >
                your
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={textVariants}
                className="uppercase text-center font-[L300] text-[11vw] md:text-[10vw] lg:text-[10vw] leading-11 md:leading-20 lg:leading-41"
              >
                project
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* First Marquee */}
        <div className="w-full py-4 lg:py-3" style={{ overflow: "visible" }}>
          <div
            ref={marqueeRef}
            className="relative group transition-transform duration-700 ease-out w-full"
            style={{ transformOrigin: "center", overflow: "visible" }}
          >
            {/* Background Layer */}
            <div
              className="absolute inset-0 bg-lime-300 z-10"
              style={{ backgroundColor: "#D3FD50" }}
            ></div>

            {/* White Hover Overlay */}
            <div className="absolute inset-0 bg-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Marquee Content */}
            <div className="relative z-30 overflow-hidden whitespace-nowrap md:pt-1 md:pb-1 lg:pt-10 lg:pb-1 lg:mt-20">
              <div className="inline-block animate-marquee lg:leading-30 font-[L500]">
                <span className="text-black text-[8vw] md:text-[7vw] lg:text-[10vw] uppercase ">
                  HELLO@K72.CA
                </span>
                <span className="text-black text-[8vw] md:text-[7vw] lg:text-[10vw] uppercase ml-20">
                  HELLO@K72.CA
                </span>
                <span className="text-black text-[8vw] md:text-[7vw] lg:text-[10vw] uppercase ml-20">
                  HELLO@K72.CA
                </span>
                <span className="text-black text-[8vw] md:text-[7vw] lg:text-[10vw] uppercase ml-20">
                  HELLO@K72.CA
                </span>
                <span className="text-black text-[8vw] md:text-[7vw] lg:text-[10vw] uppercase ml-20">
                  HELLO@K72.CA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*Second section */}
        <div className="w-full py-10 lg:py-24"></div>
        <div className="py-22 md:py-24 lg:px-20 lg:py-5">
          <div className="h-full w-full">
            <div>
              <h1 className="uppercase text-center font-[L300] text-[11vw] md:text-[10vw] lg:text-[10vw] leading-11 md:leading-20 lg:leading-41">
                To talk
              </h1>
            </div>
            <div>
              <h1 className="uppercase text-center font-[L300] text-[11vw] md:text-[10vw] lg:text-[10vw] leading-11 md:leading-20 lg:leading-41">
                about
              </h1>
            </div>
            <div>
              <h1 className="uppercase text-center font-[L300] text-[11vw] md:text-[10vw] lg:text-[10vw] leading-11 md:leading-20 lg:leading-41">
                your
              </h1>
            </div>
            <div>
              <h1 className="uppercase text-center font-[L300] text-[11vw] md:text-[10vw] lg:text-[10vw] leading-11 md:leading-20 lg:leading-41">
                brand
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full py-1 lg:py-1"></div>

        {/* Second Marquee */}
        <div className="w-full py-4 lg:py-3" style={{ overflow: "visible" }}>
          <div
            ref={marqueeRef2}
            className="relative group transition-transform duration-700 ease-out w-full"
            style={{ transformOrigin: "center", overflow: "visible" }}
          >
            {/* Background Layer */}
            <div
              className="absolute inset-0 bg-lime-300 z-10"
              style={{ backgroundColor: "#D3FD50" }}
            ></div>

            {/* White Hover Overlay */}
            <div className="absolute inset-0 bg-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Marquee Content */}
            <div className="relative z-30 overflow-hidden whitespace-nowrap md:pt-1 md:pb-1 lg:pt-10 lg:pb-1 lg:mt-20">
              <div className="inline-block animate-marquee lg:leading-30 font-[L500]">
                <span className="text-black text-[8vw] md:text-[7vw] lg:text-[10vw] uppercase ">
                  HELLO@K72.CA
                </span>
                <span className="text-black text-[8vw] md:text-[7vw] lg:text-[10vw] uppercase ml-20">
                  HELLO@K72.CA
                </span>
                <span className="text-black text-[8vw] md:text-[7vw] lg:text-[10vw] uppercase ml-20">
                  HELLO@K72.CA
                </span>
                <span className="text-black text-[8vw] md:text-[7vw] lg:text-[10vw] uppercase ml-20">
                  HELLO@K72.CA
                </span>
                <span className="text-black text-[8vw] md:text-[7vw] lg:text-[10vw] uppercase ml-20">
                  HELLO@K72.CA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="w-full py-12 lg:py-16"></div>

        <style jsx="true">{`
          @keyframes marquee {
            0% {
              transform: translate3d(0%, 0, 0);
            }
            100% {
              transform: translate3d(-80%, 0, 0);
            }
          }

          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </div>
    </StairsLayout>
  );
}

export default Contact;
