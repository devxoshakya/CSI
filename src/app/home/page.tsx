import Navbar from "@/components/Navbar";
import { MarqueeDemo } from "@/components/shared/marqueedemo";
import { FeaturesSectionDemo } from "@/components/feature-section-with-bento-grid";

import { Footerdemo } from "@/components/ui/footer-section";
import { Hero } from "@/components/ui/hero-with-group-of-images-text-and-two-buttons";
import { FAQ } from "@/components/ui/faq-section";
import EventHero from "./EventsSection";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function Landing() {
  return (
    <div>
      <Navbar/>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
          <Hero />
      </div>
      {/* <EventsPage/> */}
      <BlurFade delay={0.25} inView>
        <EventHero />
      </BlurFade>

      <BlurFade delay={0.25} inView>
        <FeaturesSectionDemo />
      </BlurFade>

      <BlurFade delay={0.25} inView>
        <MarqueeDemo />
      </BlurFade>


      <BlurFade delay={0.25} inView>
        <FAQ />
      </BlurFade>

      <BlurFade delay={0.25} inView>
        <Footerdemo />
      </BlurFade>
    </div>
  );
}
