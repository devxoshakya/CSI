"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { AnimatedModalDemo } from "./login";
import { MorphingTextDemo } from "./morphingtext";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Computer",
    },
    {
      text: "Society",
    },
    {
      text: "of",
    },
    {
      text: "India",
    },
    {
      text: ".",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-start justify-center h-[40rem]  mt-6 mb-8">
    
      <TypewriterEffectSmooth words={words} />
      <div className=" flex justify-center  mt-6 mb-8 ">  {/* Adding top margin to create space */}
      <MorphingTextDemo />
    </div>
      <div>
        <div className=" ">
        <p>"The Computer Society of India, one of MIET’s oldest and most vibrant communities, unites designers, developers, and tech enthusiasts. With exciting projects, hackathons, and events, we innovate boldly. When we do something, its impactful and it matters! 🚀"</p></div>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <div >
        <AnimatedModalDemo/>
        </div>
 
      </div>
    </div>
  );
}
