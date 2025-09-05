import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

const SectionP2 = () => {
  const data = [
    { role: "Account executive", name: "SOPHIE AUGER" },
    { role: "Copywriter", name: "CAMILLE BRIÈRE" },
    { role: "Account manager", name: "CLAIRE ROBERT" },
    { role: "Evp & managing director", name: "PIERRE-LUC PAIEMENT" },
    { role: "Director of strategy", name: "MICHÈLE RIENDEAU" },
    { role: "Account director", name: "MEGGIE LAVOIE" },
    { role: "Art director", name: "ALEX SAUVAGEAU" },
    { role: "Account manager", name: "PHILIPPE PERREAULT" },
    { role: "Strategist", name: "BÉATRICE ROUSSIN" },
    { role: "Planificateur stratégique principal", name: "OLIVIER ROEYAERTS" },
    { role: "Account manager", name: "HÉLÈNE CONTI" },
    { role: "Account coordinator", name: "LAWRENCE MEUNIER" },
    { role: "Senior director", name: "ISABELLE BEAUCHEMIN" },
    { role: "Associate creative director", name: "HUGO JOSEPH" },
    { role: "Graphic designer", name: "OLIVIER DUCLOS" },
    { role: "Associate creative director", name: "JOËL LETARTE" },
    { role: "Creative director", name: "CHANTAL GOBEIL" },
    { role: "Associate creative director", name: "SÉBASTIEN ROY" },
  ];

  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const currentImageRef = useRef(null);
  const nextImageRef = useRef(null);
  const personRefsRef = useRef([]);
  const activeTimelineRef = useRef(null);

  // Function to check if screen is large (1024px and above)
  const isLargeScreen = useCallback(() => window.innerWidth >= 1024, []);

  const hideImageContainer = useCallback(() => {
    if (!imageContainerRef.current) return;
    
    // Kill any active timeline to prevent conflicts
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
      activeTimelineRef.current = null;
    }
    
    gsap.to(imageContainerRef.current, {
      opacity: 0,
      visibility: "hidden",
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const showImageContainer = useCallback(() => {
    if (!imageContainerRef.current) return;
    
    gsap.to(imageContainerRef.current, {
      opacity: 1,
      visibility: "visible",
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleImageChange = useCallback((imageIndex) => {
    if (!isLargeScreen()) return;
    
    const currentImg = currentImageRef.current;
    const nextImg = nextImageRef.current;

    if (!currentImg || !nextImg) return;

    // Kill any existing animation to prevent conflicts
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    // First, show the container if it's hidden
    showImageContainer();

    // Set the new image source and position it off-screen to the left
    nextImg.src = `/Images/image${imageIndex}.jpg`;

    // Create the animation timeline with proper context
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Clean up timeline reference
          activeTimelineRef.current = null;
          
          // After animation completes, swap the images
          if (currentImg && nextImg) {
            currentImg.src = nextImg.src;
            gsap.set(currentImg, { opacity: 1, x: 0, zIndex: 1 });
            gsap.set(nextImg, { opacity: 0, zIndex: 0 });
          }
        }
      });

      // Position the next image off-screen to the left
      tl.set(nextImg, {
        x: -100,
        opacity: 1,
        zIndex: 2,
      })
      // Animate the new image sliding in from left
      .to(nextImg, {
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      // Fade out the current image slightly after the new one starts moving
      .to(currentImg, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      }, "-=0.4");

      activeTimelineRef.current = tl;
    });

    return ctx;
  }, [isLargeScreen, showImageContainer]);

  const handleMouseEnter = useCallback((index) => {
    if (isLargeScreen()) {
      handleImageChange(index + 1);
    }
  }, [isLargeScreen, handleImageChange]);

  const handleMouseLeave = useCallback(() => {
    if (isLargeScreen()) {
      hideImageContainer();
    }
  }, [isLargeScreen, hideImageContainer]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial state using GSAP context
    const ctx = gsap.context(() => {
      // Set initial state - hide the image container completely
      gsap.set(imageContainerRef.current, {
        opacity: 0,
        visibility: "hidden",
      });

      // Set initial state for images
      gsap.set([currentImageRef.current, nextImageRef.current], {
        opacity: 0,
        x: 0,
        zIndex: 0,
      });
    }, container);

    // Handle window resize to hide animation on smaller screens
    const handleResize = () => {
      if (!isLargeScreen()) {
        hideImageContainer();
      }
    };

    // Add resize listener with passive option for better performance
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      
      // Kill any active timeline
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
        activeTimelineRef.current = null;
      }
      
      // Clean up GSAP context
      ctx.kill();
    };
  }, [isLargeScreen, hideImageContainer]);

  return (
    <div 
      ref={containerRef}
      className="people-container w-full mx-auto bg-black text-white font-sans relative"
    >
      {/* Fixed Image Container - Only visible on large screens */}
      <div
        ref={imageContainerRef}
        className="fixed h-[70vh] w-[24vw] top-10 left-125 rounded-3xl overflow-hidden mt-20 z-50 pointer-events-none hidden lg:block"
        style={{
          visibility: "hidden",
          willChange: "opacity, visibility", // Optimize for animations
        }}
      >
        {/* Current Image */}
        <img
          ref={currentImageRef}
          src=""
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          alt="Current team member"
          style={{ willChange: "opacity, transform" }}
        />

        {/* Next Image (for animation) */}
        <img
          ref={nextImageRef}
          src=""
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          alt="Next team member"
          style={{ willChange: "opacity, transform" }}
        />
      </div>

      {/* People List */}
      {data.map((item, index) => (
        <div
          key={index}
          ref={(el) => (personRefsRef.current[index] = el)}
          className="person-item relative border-t border-white overflow-hidden group cursor-pointer"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Hover background layer */}
          <div 
            className="absolute inset-0 bg-[#D3FD50] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
            style={{ willChange: "transform" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-5">
            {/* Role - left side */}
            <div className="text-sm sm:text-base lg:text-lg text-white group-hover:text-black transition-colors duration-500 mb-2 sm:mb-0 flex-1 font-[L300]">
              {item.role}
            </div>

            {/* Name - right side */}
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white group-hover:text-black transition-colors duration-500 text-right flex-1 sm:flex-none font-[L500]">
              {item.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionP2;




