import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";
import { useRef } from "react";
import { delay, motion } from "framer-motion";
import { StairsLayout } from "../components/navigation";
import Section2 from "../components/agency/Section2";
import SectionP2 from "../components/agency/SectionP2";

function Agency() {
  const imageDivRef = useRef(null);
  const imageRef = useRef(null);
  const slideshowInterval = useRef(null);
  const backgroundRef = useRef(null);
  const expRef = useRef(null); // Added ref for .exp text
  const imageWrapperRef = useRef(null);

  const imageArr = [
    "/Images/image1.jpg",
    "/Images/image2.jpg",
    "/Images/image3.jpg",
    "/Images/image4.jpg",
    "/Images/image5.jpg",
    "/Images/image6.jpg",
    "/Images/image7.jpg",
    "/Images/image8.jpg",
    "/Images/image9.jpg",
    "/Images/image10.jpg",
    "/Images/image11.jpg",
    "/Images/image12.jpg",
    "/Images/image13.jpg",
    "/Images/image14.jpg",
  ];

  gsap.registerPlugin(ScrollTrigger);

  // Framer Motion variants for text animation

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Stagger delay between children
      },
    },
  };
  const textVariants = {
    hidden: {
      y: "-100%",
    },
    visible: {
      y: 0, // Animate to original position
      transition: {
        duration: 0.5,
        delay: 0.1,
        ease: "easeInOut",
      },
    },
  };

  // Function to get current screen size
  const getScreenSize = () => {
    const width = window.innerWidth;
    if (width < 768) return "small";
    if (width < 1024) return "medium";
    return "large";
  };

  // Slideshow for small screens
  const startSlideshow = () => {
    let currentIndex = 0;
    slideshowInterval.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % imageArr.length;
      if (imageRef.current) {
        imageRef.current.src = imageArr[currentIndex];
      }
    }, 1000);
  };

  const stopSlideshow = () => {
    if (slideshowInterval.current) {
      clearInterval(slideshowInterval.current);
      slideshowInterval.current = null;
    }
  };

  useGSAP(function () {
    const screenSize = getScreenSize();

    // Quick background transition animation
    gsap.to(backgroundRef.current, {
      backgroundColor: "#000000",
      duration: 0.6, // Smooth duration
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".section2",
        start: "top 80%", // Trigger when section2 is 30% in view (100% - 80% = 20%)
        end: "top 30%", // Short range for quick transition
        toggleActions: "play none none reverse",
        onToggle: (self) => {
          // Also animate the .exp text color
          if (self.isActive) {
            gsap.to(expRef.current, {
              color: "#ffffff",
              duration: 0.4,
              ease: "power2.inOut",
            });
          } else {
            gsap.to(expRef.current, {
              color: "#000000",
              duration: 0.4,
              ease: "power2.inOut",
            });
          }
        },
      },
    });

    if (screenSize === "small") {
      startSlideshow(); // Small screens slideshow

      // Width animation for small screens
      gsap.from(imageDivRef.current, {
        width: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power2.inOut",
        delay: 0.1,
      });
    } else if (screenSize === "medium") {
      // Medium screens: short scroll distance with pinning
      gsap.to(imageDivRef.current, {
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          pin: true,
          start: "top 17%",
          end: "top -15%",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (e) => {
            let imageIndex = Math.min(
              Math.floor(e.progress * imageArr.length),
              imageArr.length - 1
            );
            if (imageRef.current) imageRef.current.src = imageArr[imageIndex];
          },
        },
      });

      // Width animation for medium screens
      gsap.from(imageDivRef.current, {
        width: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power2.inOut",
        delay: 0.1,
      });
    } else {
      // Large screens: wrapper + inner div animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          pin: true,
          start: "top 25%",
          end: "top -153%",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Inner image div animation for width reveal
      tl.from(imageDivRef.current, {
        width: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power2.inOut",
        delay: 0.1,
      });

      // Image change on scroll
      gsap.to(imageDivRef.current, {
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          pin: false,
          start: "top 25%",
          end: "top -153%",
          scrub: true,
          onUpdate: (e) => {
            let imageIndex = Math.min(
              Math.floor(e.progress * imageArr.length),
              imageArr.length - 1
            );
            if (imageRef.current) imageRef.current.src = imageArr[imageIndex];
          },
        },
      });
    }

    // Handle resize events
    const handleResize = () => {
      ScrollTrigger.refresh();
      const newScreenSize = getScreenSize();
      if (newScreenSize === "small") {
        stopSlideshow();
        startSlideshow();
      } else {
        stopSlideshow();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      stopSlideshow();
    };
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSlideshow();
    };
  }, []);

  return (
    <StairsLayout>
      <div ref={backgroundRef} className="h-full w-full bg-white">
        <div className="section1 font-[L500] px-[2vw] h-[175vh] lg:h-[300vh] ">
          <div
            ref={imageWrapperRef}
            className="absolute top-27 left-[30.5%] md:top-30 md:left-[25.5%] lg:top-35 lg:left-[30.5%]"
          >
            <div
              ref={imageDivRef}
              className="h-[13vh] w-[17.5vw] md:h-[18vh] md:w-[20vw] lg:h-[41vh] lg:w-[14.5vw] rounded-2xl overflow-hidden"
            >
              <img
                ref={imageRef}
                className="h-full w-full object-cover"
                src={imageArr[0]}
                alt=""
              />
            </div>
          </div>
          <div className="relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="pt-[21vh] md:pt-[35vh] lg:pt-[55vh] text-center "
            >
              <div className="overflow-hidden">
                <motion.h1
                  className="leading-20 md:leading-33 lg:leading-85 text-[17.8vw] md:text-[20vw] lg:text-[19.8vw]"
                  variants={textVariants}
                >
                  SEVEN7Y
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="leading-20 md:leading-33 lg:leading-85 text-[17.8vw] md:text-[20vw] lg:text-[19.8vw]"
                  variants={textVariants}
                >
                  TWO
                </motion.h1>
              </div>
            </motion.div>
            <div className="pt-[25%] md:pt-[20%] lg:pl-[41%] pb-20">
              <p className="text-[4.8vw] md:text-[4.5vw] lg:text-[3vw] leading-5.5 md:leading-8.5 lg:leading-15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                We're inquisitive and open- minded, and we make sure creativity
                crowds out ego from every corner. A brand is a living thing,
                with values, a personality and a story. If we ignore that, we
                can achieve short-term success, but not influence that goes the
                distance. We bring that perspective to every brand story we help
                tell.
              </p>
            </div>
          </div>
          <div
            ref={expRef}
            className="exp mt-10 lg:mt-20 flex flex-col h-[50vh] w-full"
          >
            <div className=" lg:h-[60%] lg:w-[64.7%] md:w-[56%] flex 0">
              <div className=" h-full w-full lg:pl-[7vw] lg:pt-[5vh] ">
                <h1 className="text-xl">Expertise</h1>
              </div>
              <div className=" h-full w-full lg:pt-[5vh]">
                <h1 className="text-xl">Strategy</h1>
                <h1 className="text-xl">Advertising</h1>
                <h1 className="text-xl">Branding</h1>
                <h1 className="text-xl">Design</h1>
                <h1 className="text-xl">Content</h1>
              </div>
            </div>
            <div className="h-[40%] w-full mt-15 md-mt-0 md:flex md:gap-10 lg-mt-0 lg:flex lg:gap-10 ">
              <div className="h-fit lg:w-[33.3%] lg:h-full lg:pl-[6vw] mb-10 lg:mb-0">
                <p className="text-xl">
                  Our Work\_ Born in curiosity, raised by dedication and fed
                  with a steady diet of creativity.
                </p>
              </div>
              <div className="h-fit lg:w-[33.3%] lg:h-full mb-10 lg:mb-0">
                <p className="text-xl lg:w-[82%]">
                  Our Creative\_ Simmering in an environment where talent can
                  come to a full boil. Encouraged to become the best versions of
                  ourselves.
                </p>
              </div>
              <div className="h-fit lg:w-[33.3%] lg:h-full mb-10 lg:mb-0">
                <p className="text-xl lg:w-[59%] ">
                  Our Culture\_ We're open to each other. Period. The team works
                  together to create a space that makes us proud.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="section2">
          <Section2 />
        </div>
         <div className="section2 bg-pink-900 w-full mt-30">
        <SectionP2 />
      </div>
      </div>
    </StairsLayout>
  );
}

export default Agency;
