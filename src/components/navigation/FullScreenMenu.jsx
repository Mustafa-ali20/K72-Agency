// src/components/navigation/FullScreenMenu.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { menuExpand, menuOpacity } from "./animations/menuAnim";

export default function FullScreenMenu({ isOpen, onClose, onNavigate }) {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Check if screen is large (lg breakpoint: 1024px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const menuItems = [
    {
      title: "Work",
      path: "/work",
      marqueeText: "SEE EVERYTHING",
      images: ["/Images/marque1.jpg", "/Images/marque2.jpg"],
    },
    {
      title: "Agency",
      path: "/agency",
      marqueeText: "KNOW US",
      images: ["/Images/agency1.jpg", "/Images/agency2.jpg"],
    },
    { title: "Contact", path: "/contact", marqueeText: "SEND US A FAX" },
    {
      title: "Blog",
      path: "/blog",
      marqueeText: "READ ARTICLES",
      images: ["/Images/drake.gif", "/Images/blog.png"],
    },
  ];

  const handleNavigation = (path) => {
    // Close menu immediately without animation
    onClose();
    // Navigate directly without delay
    navigate(path);
  };

  const handleClose = () => {
    setIsClosing(true);

    // Wait for exit animation to complete before closing
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 800);
  };

  const anim = (variants, custom = null) => {
    return {
      initial: "initial",
      animate: isClosing ? "exit" : "enter",
      exit: "exit",
      custom,
      variants,
    };
  };

  const nbOfColumns = 5;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Menu Background with stairs animation */}
          <motion.div
            {...anim(menuOpacity)}
            className="fixed inset-0 w-full h-screen bg-black pointer-events-auto z-[9998]"
          />

          <div className="fixed inset-0 w-screen h-screen flex pointer-events-none z-[9998]">
            {[...Array(nbOfColumns)].map((_, i) => {
              return (
                <motion.div
                  key={i}
                  {...anim(menuExpand, i)}
                  className="relative h-full w-full bg-black"
                />
              );
            })}
          </div>

          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: isClosing ? 0 : isOpen ? 0.7 : 0,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="fixed inset-0 w-full h-screen bg-black flex items-center justify-center z-[9999] pointer-events-auto"
          >
            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isClosing ? 0 : 1,
                scale: isClosing ? 0.8 : 1,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                delay: isClosing ? 0 : isOpen ? 0.7 : 0,
                duration: 0.3,
              }}
              className="absolute top-0 right-0 flex items-center justify-center group"
            >
              {/* X made with two lines */}
              <div className="relative lg:w-39 lg:h-39 md:w-27 md:h-27 sm:w-27 sm:h-27 w-30 h-30">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white rotate-45 transform -translate-y-1/2 group-hover:bg-[#D3FD50] transition-colors"></div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -rotate-45 transform -translate-y-1/2 group-hover:bg-[#D3FD50] transition-colors"></div>
              </div>
            </motion.button>

            {/* Menu Items */}
            <div className="w-full h-full flex flex-col items-center justify-center">
              {menuItems.map((item, index) => (
                <div
                  key={item.title}
                  className="relative w-full overflow-hidden"
                >
                  {/* Main heading with rotateX intro animation */}
                  <motion.div
                    initial={{ opacity: 0, rotateX: 90 }}
                    animate={{
                      opacity: isClosing ? 0 : 1,
                      rotateX: isClosing ? 90 : 0,
                    }}
                    transition={{
                      delay: isClosing ? 0 : isOpen ? 0.8 + index * 0.1 : 0,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    style={{ transformOrigin: "top center" }}
                    className={`w-full border-t border-white ${
                      item.title === "Blog" ? "border-b" : ""
                    } relative`}
                  >
                    {/* Invisible hover area that covers both heading and marquee - only on large screens */}
                    <div
                      className="absolute inset-0 w-full h-full z-20 cursor-pointer"
                      onMouseEnter={() =>
                        !isClosing &&
                        isLargeScreen &&
                        setHoveredItem(item.title)
                      }
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => !isClosing && handleNavigation(item.path)}
                    />

                    <motion.button
                      onClick={() => !isClosing && handleNavigation(item.path)}
                      className="text-white text-6xl md:text-[9rem] lg:leading-25 uppercase font-[L500] lg:py-7 md:py-2 sm:py-2 leading-none cursor-pointer w-full text-center relative z-10"
                    >
                      {item.title}
                    </motion.button>

                    {/* Marquee hover effect - Only on large screens */}
                    <AnimatePresence>
                      {hoveredItem === item.title &&
                        !isClosing &&
                        isLargeScreen && (
                          <motion.div
                            key={`marquee-${item.title}`}
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                            className="absolute inset-0 bg-[#D3FD50] overflow-hidden flex items-center w-full z-10"
                          >
                            <motion.div
                              animate={{ x: ["0%", "-100%"] }}
                              transition={{
                                x: {
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  duration: 100,
                                  ease: "linear",
                                },
                              }}
                              className="flex items-center whitespace-nowrap"
                              style={{ width: "max-content" }}
                            >
                              {[...Array(20)].map((_, i) => (
                                <div key={i} className="flex items-center ">
                                  <span className="text-black text-[9rem] font-[L500] mx-8">
                                    {item.marqueeText}
                                  </span>
                                  {item.images ? (
                                    <img
                                      src={item.images[i % item.images.length]}
                                      alt={`${item.title} ${
                                        (i % item.images.length) + 1
                                      }`}
                                      className="rounded-full h-25 w-75 mx-2 object-cover flex-shrink-0"
                                    />
                                  ) : (
                                    <div className=""></div>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
