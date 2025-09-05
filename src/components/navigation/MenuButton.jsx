import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function MenuButton({ onClick, currentPage, isMenuOpen }) {
  const location = useLocation();
  const currentPath = location.pathname || currentPage;
  const isHomePage = currentPath === "/";
  const isWorkAgencyPage = currentPath === "/work" || currentPath === "/agency";

  const buttonRef = useRef(null);
  const layerRef = useRef(null);
  const longLineRef = useRef(null);
  const shortLineRef = useRef(null);
  const textRef = useRef(null);

  // Navigation buttons refs
  const workButtonRef = useRef(null);
  const agencyButtonRef = useRef(null);
  const containerRef = useRef(null);

  // Page-load animation effect for menu button
  useEffect(() => {
    const targetPages = ["/", "/work", "/agency", "/contact", "/blog"];

    if (targetPages.includes(currentPath) && buttonRef.current) {
      // Reset and animate button height
      gsap.set(buttonRef.current, {
        scaleY: 0,
        transformOrigin: "top",
      });

      gsap.to(buttonRef.current, {
        scaleY: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 1,
      });
    }
  }, [currentPath]);

  // Page-load animation effect for navigation buttons
  useEffect(() => {
    if (isWorkAgencyPage && workButtonRef.current && agencyButtonRef.current) {
      // Reset buttons to no height first
      gsap.set([workButtonRef.current, agencyButtonRef.current], {
        scaleY: 0,
        transformOrigin: "top",
      });

      // Animate both buttons growing from top
      const tl = gsap.timeline();
      tl.to([workButtonRef.current, agencyButtonRef.current], {
        scaleY: 1,
        duration: 0.6,
        delay: 0.9,
        ease: "power2.out",
        stagger: 0.1,
      });
    }
  }, [currentPath, isWorkAgencyPage]);

  // Scroll-based animation for Work/Agency page
  useEffect(() => {
    if (isWorkAgencyPage && workButtonRef.current && agencyButtonRef.current && buttonRef.current && textRef.current) {
      // Check if it's large screen (1024px and above)
      const isLargeScreen = window.innerWidth >= 1024;
      
      // Create scroll trigger for Work and Agency buttons (fade out and move up) - LARGE SCREEN ONLY
      const workAgencyTrigger = isLargeScreen ? ScrollTrigger.create({
        trigger: "body",
        start: "10% top",
        end: "15% top",
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;
          // Apply easing to progress for smoother animation
          const easedProgress = gsap.parseEase("power2.inOut")(progress);
          
          // Animate Work and Agency buttons - move up and fade out
          gsap.to([workButtonRef.current, agencyButtonRef.current], {
            y: -120 * easedProgress,
            opacity: 1 - easedProgress,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }) : null;

      // Create scroll trigger for Menu button resize and text hide - LARGE SCREEN ONLY
      const menuResizeTrigger = isLargeScreen ? ScrollTrigger.create({
        trigger: "body",
        start: "10% top",
        end: "15% top",
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;
          // Apply easing to progress for smoother animation
          const easedProgress = gsap.parseEase("power2.inOut")(progress);
          
          // Calculate dimensions - from current size to target size
          // Current: lg:h-35 lg:w-[15.3vw] to target: lg:h-13 lg:w-74
          const startHeight = buttonRef.current.offsetHeight;
          const targetHeight = 52; // lg:h-13 (13 * 0.25rem = 3.25rem = 52px)
          const heightDiff = startHeight - targetHeight;
          
          const startWidth = buttonRef.current.offsetWidth;
          const targetWidth = 296; // lg:w-74 (74 * 0.25rem = 18.5rem = 296px)
          const widthDiff = startWidth - targetWidth;
          
          // Apply scaling transformation with eased progress
          const scaleY = (startHeight - heightDiff * easedProgress) / startHeight;
          const scaleX = (startWidth - widthDiff * easedProgress) / startWidth;
          
          gsap.to(buttonRef.current, {
            scaleX: scaleX,
            scaleY: scaleY,
            duration: 0.3,
            ease: "power2.out",
            transformOrigin: "top right"
          });
          
          // Hide Menu text with eased progress
          gsap.to(textRef.current, {
            opacity: 1 - easedProgress,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }) : null;

      // Handle resize events
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        if (workAgencyTrigger) workAgencyTrigger.kill();
        if (menuResizeTrigger) menuResizeTrigger.kill();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isWorkAgencyPage, currentPath]);

  // Hover animation handlers for menu button
  const handleMouseEnter = () => {
    // Slide layer down
    gsap.to(layerRef.current, {
      y: "0%",
      duration: 0.2,
      ease: "power2.out",
    });

    // Change colors to black
    gsap.to([longLineRef.current, shortLineRef.current], {
      backgroundColor: "black",
      duration: 0.2,
      ease: "power2.out",
    });

    if (textRef.current) {
      gsap.to(textRef.current, {
        color: "black",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    // Slide layer up
    gsap.to(layerRef.current, {
      y: "-100%",
      duration: 0.2,
      ease: "power2.out",
    });

    // Change colors back to white
    gsap.to([longLineRef.current, shortLineRef.current], {
      backgroundColor: "white",
      duration: 0.2,
      ease: "power2.out",
    });

    if (textRef.current) {
      gsap.to(textRef.current, {
        color: "white",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  if (isHomePage) {
    return (
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-black h-11 w-54 md:h-14 md:w-74 lg:h-13 lg:w-74 flex flex-col justify-center items-end gap-1 pr-10 relative overflow-hidden origin-top"
      >
        {/* Sliding color layer */}
        <div
          ref={layerRef}
          className="absolute inset-0 bg-[#D3FD50]"
          style={{ transform: "translateY(-100%)" }}
        />

        {/* Long line */}
        <div
          ref={longLineRef}
          className="w-15 h-[1.1px] bg-white relative z-10"
        />

        {/* Short line */}
        <div
          ref={shortLineRef}
          className="w-7 h-[1.1px] bg-white relative z-10"
        />
      </button>
    );
  }

  // Layout for Work and Agency pages with navigation buttons
  if (isWorkAgencyPage) {
    return (
      <div ref={containerRef} className="flex items-start gap-0 ">
        {/* Navigation Buttons */}
        <div className="flex ">
          <Link
            ref={workButtonRef}
            to="/work"
            className="bg-black h-[3.5rem] w-[16rem] sm:w-[20rem] md:w-[24rem] lg:w-[21vw] flex items-center pl-2 group overflow-hidden pt-6 origin-top  hidden md:hidden lg:block"
          >
            {/* Hover sliding color layer */}
            <div className="absolute inset-0 bg-[#D3FD50] transform -translate-y-full transition-transform duration-200 ease-out group-hover:translate-y-0"></div>

            {/* Text content */}
            <span className="text-xl text-white font-[L500] uppercase relative z-10 transition-colors duration-200 ease-out group-hover:text-black">
              Work
            </span>
          </Link>

          <Link
            ref={agencyButtonRef}
            to="/agency"
            className="bg-black h-[6.5rem] w-[20rem] sm:w-[28rem] md:w-[32rem] lg:w-[30vw] flex items-center pl-2 group overflow-hidden pt-16 hidden md:hidden lg:block origin-top"
          >
            {/* Hover sliding color layer */}
            <div className="absolute inset-0 bg-[#D3FD50] transform -translate-y-full transition-transform duration-200 ease-out group-hover:translate-y-0"></div>

            {/* Text content */}
            <span className="text-xl text-white font-[L500] uppercase relative z-10 transition-colors duration-200 ease-out group-hover:text-black bg-red-00">
              Agency
            </span>
          </Link>
        </div>

        {/* Menu Button */}
        <button
          ref={buttonRef}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="h-13 w-44 md:h-15 md:w-64 lg:h-35 lg:w-[15.3vw]  flex flex-col justify-between bg-black relative pt-5 pr-7 overflow-hidden origin-top"
        >
          {/* Sliding color layer */}
          <div
            ref={layerRef}
            className="absolute inset-0 bg-[#D3FD50]"
            style={{ transform: "translateY(-100%)" }}
          />

          <div className="flex flex-col items-end gap-1 relative z-10">
            {/* Long line */}
            <div ref={longLineRef} className="w-15 h-[1px] bg-white" />

            {/* Short line */}
            <div ref={shortLineRef} className="w-7 h-[1px] bg-white" />
          </div>

          {/* Bottom-left Menu text */}
          <span
            ref={textRef}
            className="absolute bottom-1 left-2 text-white text-xl font-[L500] uppercase z-10 hidden lg:block"
          >
            Menu
          </span>
        </button>
      </div>
    );
  }

  // Default style for other pages
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-11 w-54 md:h-14 md:w-74 lg:h-13 lg:w-74 flex flex-col justify-center items-end gap-1 bg-black relative pr-7 overflow-hidden origin-top"
    >
      {/* Sliding color layer */}
      <div
        ref={layerRef}
        className="absolute inset-0 bg-[#D3FD50]"
        style={{ transform: "translateY(-100%)" }}
      />

      <div
          ref={longLineRef}
          className="w-15 h-[1.1px] bg-white relative z-10"
        />

        {/* Short line */}
        <div
          ref={shortLineRef}
          className="w-7 h-[1.1px] bg-white relative z-10"
        />

    </button>
  );
}