// // src/components/navigation/NavigationButtons.jsx
// import React, { useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { gsap } from "gsap";

// export default function NavigationButtons() {
//   const location = useLocation();
//   const currentPath = location.pathname;
  
//   // Refs for the buttons themselves
//   const workButtonRef = useRef(null);
//   const agencyButtonRef = useRef(null);

//   useEffect(() => {
//     // Reset buttons to no height first
//     gsap.set([workButtonRef.current, agencyButtonRef.current], {
//       scaleY: 0,
//       transformOrigin: "top"
//     });

//     // Animate based on current path
//     if (currentPath === "/work" || currentPath === "/agency") {
//       const tl = gsap.timeline();
      
//       // Animate both buttons growing from top
//       tl.to([workButtonRef.current, agencyButtonRef.current], {
//         scaleY: 1,
//         duration: 0.6,
//         ease: "power2.out",
//         stagger: 0.1
//       });
//     }
//   }, [currentPath]);

//   return (
//     <nav className="w-full h-full text-white relative hidden md:hidden lg:block">
//       <div className="flex absolute">
//         <Link
//           ref={workButtonRef}
//           to="/work"
//           className="bg-black h-[3.5rem] w-[26rem] absolute top-0 left-158 pt-6 pl-2 z-50 group overflow-hidden origin-top"
//         >
//           {/* Hover sliding color layer */}
//           <div className="absolute inset-0 bg-[#D3FD50] transform -translate-y-full transition-transform duration-200 ease-out group-hover:translate-y-0"></div>
          
//           {/* Text content */}
//           <span className="text-xl font-[L500] uppercase relative z-10 transition-colors duration-200 ease-out group-hover:text-black">
//             Work
//           </span>
//         </Link>

//         <Link
//           ref={agencyButtonRef}
//           to="/agency"
//           className="bg-blue-300 h-[6.5rem] absolute top-0 pt-18 pl-2 z-50 group overflow-hidden origin-top lg:w-[36rem] lg:left-262 xl:w-[36rem] xl:left-262 2xl:w-[36rem] 2xl:left-262 w-[28rem] left-230"
//         >
//           {/* Hover sliding color layer */}
//           <div className="absolute inset-0 bg-[#D3FD50] transform -translate-y-full transition-transform duration-200 ease-out group-hover:translate-y-0"></div>
          
//           {/* Text content */}
//           <span className="text-xl font-[L500] uppercase relative z-10 transition-colors duration-200 ease-out group-hover:text-black">
//             Agency
//           </span>
//         </Link>
//       </div>
//     </nav>
//   );
// }