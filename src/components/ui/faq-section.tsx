import { Check, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function FAQ() {
  return (
    <div id="faq" className="w-full py-20 lg:py-40 max-w-7xl mx-auto px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  This is the start of something new
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                  Running a student society today is challenging enough. Avoid
                  extra complications by leaving behind outdated methods. CSI
                  MIET is now in the right hands, ensuring smoother, faster, and
                  more efficient operations for everyone.
                </p>
              </div>
              <div className="">
                <Link href={"mailto:csi.miet@miet.ac.in"}>
                <Button className="gap-4" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button>
                </Link>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "What is CSI MIET, and what does it do?",
                answer:
                  "CSI MIET is the official student chapter of the Computer Society of India at MIET. We organize tech events, workshops, and projects to enhance students' skills and knowledge.",
              },
              {
                question: "How can I join CSI MIET?",
                answer:
                  "You can join CSI MIET by filling out our registration form during the enrollment period. Stay tuned to our social media for announcements!",
              },
              {
                question: "What are the benefits of joining CSI MIET?",
                answer:
                  "Members get access to exclusive workshops, networking opportunities, hands-on projects, and certifications that enhance their career prospects.",
              },
              {
                question: "Who manages the CSI MIET society?",
                answer:
                  "CSI MIET is managed by a dedicated team of students and faculty advisors who ensure smooth operations and impactful events.",
              },
              {
                question: "How can I contribute to CSI MIET?",
                answer:
                  "You can contribute by actively participating in events, sharing ideas, volunteering, or applying for leadership roles within the society.",
              },
            ].map((item, index) => (
              <AccordionItem key={index} value={"index-" + index}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export { FAQ };
