import Navbar from "@/components/Navbar";
import { ThreeDCardDemo } from "@/components/shared/3-dcarddemo";
import { MarqueeDemo } from "@/components/shared/marqueedemo";



import { Footerdemo } from "@/components/ui/footer-section";
import { Hero } from "@/components/ui/hero-with-group-of-images-text-and-two-buttons";
import EventsPage from "../events/page";

export default function Landing () {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> 
     <Hero/>
     </div>
      <EventsPage/>
      <MarqueeDemo/>
      <Footerdemo/>
    
    </div>
  );
}