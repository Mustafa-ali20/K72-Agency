// src/components/navigation/animations/menuAnim.js

// Menu opening animation - stairs come down
export const menuExpand = {
  initial: {
    top: 0,
    height: 0,
  },
  enter: (i) => ({
    height: "100vh",
    transition: {
      duration: 0.6, // Slightly longer duration
      delay: 0.08 * i, // Slightly more delay between stairs
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: (i) => ({
    top: "100vh",
    transition: {
      duration: 0.6, // Slightly longer duration
      delay: 0.08 * (4 - i), // Reverse order for closing, starting from rightmost
      ease: [0.215, 0.61, 0.355, 1],
    },
    transitionEnd: { height: 0, top: 0 },
  }),
};

export const menuOpacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.2, // Small delay to let stairs start
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
