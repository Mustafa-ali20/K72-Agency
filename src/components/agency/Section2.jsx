import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SectionP2 from "./SectionP2";

function Section2() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img1MarqueesRef = useRef(null);
  const img2MarqueesRef = useRef(null);

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Check if screen is large (1024px and above)
  const isLargeScreen = () => window.innerWidth >= 1024;

  useGSAP(() => {
    // Only apply animations on large screens
    if (!isLargeScreen()) return;

    const ctx = gsap.context(() => {
      // Set initial state - img2 starts below
      gsap.set(img2Ref.current, {
        yPercent: 100,
      });

      // Set initial state for marquee opacity
      gsap.set(img1MarqueesRef.current, { opacity: 1 });
      gsap.set(img2MarqueesRef.current, { opacity: 0 });

      // Create timeline for smoother animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          pin: containerRef.current,
          scrub: 1.2, // Slightly increased for smoother feel
          anticipatePin: 1,
          invalidateOnRefresh: true, // Better handling of resize
        }
      });

      // Add img2 slide animation to timeline
      tl.to(img2Ref.current, {
        yPercent: 0,
        ease: "none", // Linear easing for scroll-triggered animations
      });

      // Add marquee fade animations to timeline with overlap
      const fadeThreshold = 0.2;
      
      tl.to(img1MarqueesRef.current, {
        opacity: 0,
        ease: "none",
      }, fadeThreshold) // Start at 20% progress
      
      .to(img2MarqueesRef.current, {
        opacity: 1,
        ease: "none",
      }, fadeThreshold); // Start at same time for smooth crossfade

    }, sectionRef);

    // Optimized resize handler with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (isLargeScreen()) {
          ScrollTrigger.refresh();
        } else {
          // Clean up ScrollTriggers on smaller screens
          ctx.kill();
          // Reset transforms
          gsap.set([img1Ref.current, img2Ref.current, img1MarqueesRef.current, img2MarqueesRef.current], { 
            clearProps: "all" 
          });
        }
      }, 150); // Debounce resize events
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.kill(); // Clean up GSAP context
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-full text-white flex flex-col items-center justify-center lg:mt-70 bg-red-00 relative"
    >
      <div className="section1 md:h-[130vh] lg:h-[200vh] w-full">
        {/* Container that will be pinned */}
        <div ref={containerRef} className="h-screen w-full relative lg:block">
          {/* For small and medium screens - flex column layout with marquees */}
          <div className="flex flex-col gap-30 items-center justify-center h-full w-full lg:hidden px-4 py-10 relative">
            {/* img1 - Small/Medium screens */}
            <div className="main h-full w-full flex items-center justify-center relative">
              <div className="absolute top-40 md:top-50 flex items-center justify-center pointer-events-none z-1">
                <div className="w-full overflow-hidden">
                  <div
                    className="smallNameMarquee whitespace-nowrap"
                    style={{
                      fontSize: "12vw",
                      color: "#D3FD50",
                      fontFamily: "L500",
                    }}
                  >
                    CARL
                    GODBOUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CARL
                    GODBOUT
                  </div>
                </div>
              </div>

              <div className="absolute top-60 md:top-80 flex items-end justify-center pointer-events-none pb-8 z-1">
                <div className="w-full overflow-hidden">
                  <div
                    className="smallProfessionMarquee whitespace-nowrap"
                    style={{
                      fontSize: "12vw",
                      color: "#D3FD50",
                      fontFamily: "L500",
                    }}
                  >
                    BUSINESS
                    LEAD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BUSINESS
                    LEAD
                  </div>
                </div>
              </div>
              
              <div className="img1 h-[35vh] w-[60vw] md:h-[60vh] md:w-[50vw] rounded-3xl overflow-hidden">
                <img
                  className="h-full w-full object-cover object-top"
                  src="Images/high.jpg"
                  alt="First image"
                  loading="lazy"
                />
              </div>
            </div>

            {/* img2 - Small/Medium screens */}
            <div className="main2 relative h-full w-full flex items-center justify-center">
              <div className="absolute top-40 md:top-50 flex items-center justify-center pointer-events-none z-1">
                <div className="w-full overflow-hidden">
                  <div
                    className="smallNameMarquee2 whitespace-nowrap"
                    style={{
                      fontSize: "12vw",
                      color: "#D3FD50",
                      fontFamily: "L500",
                    }}
                  >
                    CAMILLE BRIERE
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CAMILLE
                    BRIERE
                  </div>
                </div>
              </div>

              <div className="absolute top-60 md:top-80 flex items-end justify-center pointer-events-none pb-8 z-1">
                <div className="w-full overflow-hidden">
                  <div
                    className="smallProfessionMarquee2 whitespace-nowrap"
                    style={{
                      fontSize: "12vw",
                      color: "#D3FD50",
                      fontFamily: "L500",
                    }}
                  >
                    COPYWRITER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COPYWRITER
                  </div>
                </div>
              </div>

              <div className="h-[35vh] w-[60vw] md:h-[60vh] md:w-[50vw] rounded-3xl overflow-hidden">
                <img
                  className="h-full w-full object-cover object-top"
                  src="Images/high2.jpg"
                  alt="Second image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* For large screens - original animation layout */}
          <div className="hidden lg:block h-full w-full">
            {/* img1 - Base layer */}
            <div className="image1 w-full h-full flex items-center justify-center relative overflow-hidden">
              {/* img1 Marquees Container */}
              <div ref={img1MarqueesRef}>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-34">
                  <div className="w-full overflow-hidden">
                    <div
                      className="nameMarquee whitespace-nowrap"
                      style={{
                        fontSize: "9vw",
                        color: "#D3FD50",
                        fontFamily: "L500",
                        animation: "marqueeLeft 20s linear infinite",
                        willChange: "transform", // Optimize for animations
                      }}
                    >
                      CARL
                      GODBOUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CARL
                      GODBOUT
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 pb-34">
                  <div className="w-full overflow-hidden">
                    <div
                      className="professionMarquee whitespace-nowrap"
                      style={{
                        fontSize: "9vw",
                        color: "#D3FD50",
                        fontFamily: "L500",
                        animation: "marqueeRight 25s linear infinite",
                        willChange: "transform",
                      }}
                    >
                      BUSINESS
                      LEAD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BUSINESS
                      LEAD
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={img1Ref}
                className="img1 h-full w-[32vw] rounded-3xl overflow-hidden relative z-5"
                style={{ willChange: "transform" }}
              >
                <img
                  className="h-full w-full object-cover object-top"
                  src="Images/high.jpg"
                  alt="First image"
                  loading="eager" // Load immediately for above-fold content
                />
              </div>
            </div>

            {/* img2 - Slides over img1 */}
            <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
              {/* img2 Marquees Container */}
              <div ref={img2MarqueesRef}>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-34">
                  <div className="w-full overflow-hidden">
                    <div
                      className="nameMarquee2 whitespace-nowrap"
                      style={{
                        fontSize: "9vw",
                        color: "#D3FD50",
                        fontFamily: "L500",
                        animation: "marqueeLeft 20s linear infinite",
                        willChange: "transform",
                      }}
                    >
                      CAMILLE
                      BRIERE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CAMILLE
                      BRIERE
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 pb-34">
                  <div className="w-full overflow-hidden">
                    <div
                      className="professionMarquee2 whitespace-nowrap z-[999]"
                      style={{
                        fontSize: "9vw",
                        color: "#D3FD50",
                        fontFamily: "L500",
                        animation: "marqueeRight 25s linear infinite",
                        willChange: "transform",
                      }}
                    >
                      COPYWRITER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COPYWRITER
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={img2Ref}
                className="img2 h-full w-[32vw] rounded-3xl overflow-hidden z-10"
                style={{ willChange: "transform" }}
              >
                <img
                  className="h-full w-full object-cover object-top"
                  src="Images/high2.jpg"
                  alt="Second image"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Section2;