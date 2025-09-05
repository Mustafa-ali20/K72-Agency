import React from "react";
import { Link } from "react-router-dom";

function HomeButtonText() {
  return (
    <div className="text-white font-[L500] flex items-center justify-center gap-2 uppercase">
      <Link
        to="work"
        className="lg:text-[7vw] md:text-[5vw] sm:text-[6vw] text-[9vw] border-3 rounded-full lg:px-10 lg:py-19 md:px-9 md:py-9 sm:px-4 sm:py-2 px-6 py-5 hover:text-[#D3FD50] transition-colors duration-300"
      >
        <h1 className="leading-0">Work</h1>
      </Link>
      <Link
        to="agency"
        className="lg:text-[7vw] md:text-[5vw] sm:text-[6vw] text-[9vw] lg:px-10 lg:py-19 md:px-9 md:py-9 sm:px-4 sm:py-2 px-6 py-5 border-3 rounded-full hover:text-[#D3FD50] transition-colors duration-300"
      >
        <h1 className="leading-0">Agency</h1>
      </Link>
    </div>
  );
}

export default HomeButtonText;