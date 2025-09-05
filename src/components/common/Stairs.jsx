import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";

function Stairs(props) {
  const currentPath = useLocation().pathname;

  const stairsParentRef = useRef(null);
  const pageRef = useRef(null);
  useGSAP(
    function () {
      const tl = gsap.timeline();

      tl.to(stairsParentRef.current, {
        display: "block",
      });

      tl.from(".stair", {
        height: 0,
 
        stagger: {
          amount: -0.3,
        },
      });
      tl.to(".stair", {
        y: "100%",
    
        stagger: {
          amount: -0.3,
        },
      });
      tl.to(stairsParentRef.current, {
        display: "none",
      });
      tl.to(".stair", {
        y: "0%",
      });
      gsap.from(pageRef.current, {
        opacity: 0,
        delay: 1.3,
        scale: 1.2,
      });
    },
    [currentPath]
  );
  return (
    <div>
      <div ref={stairsParentRef} className="h-screen w-full fixed z-20 top-0">
        <div className="h-full w-full flex ">
          <div className="stair h-full w-[18%] bg-black"></div>
          <div className="stair h-full w-[28%] bg-black"></div>
          <div className="stair h-full w-[16%] bg-black"></div>
          <div className="stair h-full w-[18%] bg-black"></div>
          <div className="stair h-full w-[20%] bg-black"></div>
        </div>
      </div>
      <div ref={pageRef}>{props.children}</div>
    </div>
  );
}

export default Stairs;
