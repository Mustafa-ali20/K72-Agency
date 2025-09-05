import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function ProjectsCards(props) {
  useGSAP(function () {
    // Only run animations on large screens (lg breakpoint and above)
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    if (mediaQuery.matches) {
      // Set initial states - make them actually small
      gsap.set(".hero-1, .hero-2, .hero-3, .hero-4, .hero-5, .hero-6", {
        height: "10vh",
        transformOrigin: "bottom center",
      });

      // First pair animation
      gsap.to(".hero-1", {
        height: "77vh",
        scrollTrigger: {
          trigger: ".lol",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      // Second pair animation (starts when it comes into view)
      gsap.to(".hero-2", {
        height: "77vh",
        transformOrigin: "bottom center",
        scrollTrigger: {
          trigger: ".hero-2",
          start: "top 60%",
          scrub: true,
        },
      });

      // Third pair animation (starts when it comes into view)
      gsap.to(".hero-3", {
        height: "77vh",
        transformOrigin: "bottom center",
        scrollTrigger: {
          trigger: ".hero-3",
          start: "top 50%",
          scrub: true,
        },
      });
      // Fourth pair animation (starts when it comes into view)
      gsap.to(".hero-4", {
        height: "77vh",
        transformOrigin: "bottom center",
        scrollTrigger: {
          trigger: ".hero-4",
          start: "top 30%",
          scrub: true,
        },
      });
      // Fifth pair animation (starts when it comes into view)
      gsap.to(".hero-5", {
        height: "77vh",
        transformOrigin: "bottom center",
        scrollTrigger: {
          trigger: ".hero-5",
          start: "top 5%",
          scrub: true,
        },
      });

      gsap.to(".hero-6", {
        height: "77vh",
        transformOrigin: "bottom center",
        scrollTrigger: {
          trigger: ".hero-6",
          start: "top 15%",
          scrub: true,
        },
      });
    }
  });

  return (
    <>
      <div className="-mt-7 lol h-full">
        <div className="hero-1 w-full flex flex-col lg:flex-row gap-3 mb-3 lg:h-auto h-auto">
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work1.jpg"
              alt="Project 1"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work2.jpg"
              alt="Project 2"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>
        </div>
        
        <div className="hero-2 w-full flex flex-col lg:flex-row gap-3 mb-3 lg:h-auto h-auto">
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work3.jpg"
              alt="Project 3"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work4.jpg"
              alt="Project 4"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>
        </div>
        
        <div className="hero-3 w-full flex flex-col lg:flex-row gap-3 mb-3 lg:h-auto h-auto">
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work5.jpg"
              alt="Project 5"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work6.jpg"
              alt="Project 6"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>
        </div>
        
        <div className="hero-4 w-full flex flex-col lg:flex-row gap-3 mb-3 lg:h-auto h-auto">
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work7.jpg"
              alt="Project 7"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work8.jpg"
              alt="Project 8"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>
        </div>
        
        <div className="hero-5 w-full flex flex-col lg:flex-row gap-3 mb-3 lg:h-auto h-auto">
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work9.jpg"
              alt="Project 9"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-300 object-cover w-full h-full"
              src="public/Images/work/work10.jpg"
              alt="Project 10"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>
        </div>
        
        <div className="hero-6 w-full flex flex-col lg:flex-row gap-3 mb-3 lg:h-auto h-auto">
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work11.jpg"
              alt="Project 11"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden transition-all duration-300 ease-in-out hover:rounded-[2.5rem] group">
            <img
              className="group-hover:scale-105 transition-all duration-300 object-center object-cover w-full h-full"
              src="public/Images/work/work12.jpg"
              alt="Project 12"
            />
            <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 ">
              <h1 className="opacity-0 group-hover:opacity-100 duration-300 uppercase text-[2em] lg:text-[3.5em] leading-none font-[L500] text-white border-2 rounded-full px-5 pt-2">
                View Project
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsCards;