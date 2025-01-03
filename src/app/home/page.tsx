import Navbar from "@/components/Navbar";
import { ThreeDCardDemo } from "@/components/shared/3-dcarddemo";
import { MarqueeDemo } from "@/components/shared/marqueedemo";
import { TypewriterEffectSmoothDemo } from "@/components/shared/typewritereffect";




export default function Landing () {
  return (
    <div>
    
    
    <div className="flex justify-between mx-16">
      <TypewriterEffectSmoothDemo/>
      <ThreeDCardDemo/>
    </div >
    <MarqueeDemo/>
    
    </div>
  );
}