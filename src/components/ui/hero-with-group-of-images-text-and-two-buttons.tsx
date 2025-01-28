import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedModalDemo } from "../shared/login";

function Hero() {
  return (
    <div className="w-auto mx-auto py-20 lg:py-20 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                Computer Society  of India
              </h1>
              <h2 className="text-2xl md:text-3xl max-w-lg tracking-tighter text-left font-regular">Student Chapter - MIET!</h2>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
              CSI is one of MIET’s oldest and most vibrant communities, unites designers, developers, and tech enthusiasts. With exciting projects, hackathons, and events, we innovate boldly. When we do something, its impactful and it matters! 🚀
              </p>
            </div>
            <div className="flex flex-row gap-4 ">
              <AnimatedModalDemo className="px-12 bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn"/>
              
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-muted rounded-md aspect-square"></div>
            <div className="bg-muted rounded-md row-span-2"></div>
            <div className="bg-muted rounded-md aspect-square"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
