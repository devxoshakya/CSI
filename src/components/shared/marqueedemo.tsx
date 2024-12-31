import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
    {
      name: "Geetanshi",
      username: "President",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "/geetanshi.jpg",
    },
    {
      name: "Dev Shakya",
      username: "Technical co-head",
      body: "i rearrange 0s and 1s.",
      img: "/Dev Shakya 1.jpg",
    },
    {
      name: "Akshita Srivastava",
      username: "Technical co-head",
      body: "Weaving the web ,debugging chaos!",
      img: "/Akshita 1.jpg",
    },
    {
      name: "Pranav Bansal",
      username: "Vice president",
      body: "From vision to action, I’m here to make it happen.",
      img: "/PranavBansal(2).jpg",
    },
    {
      name: "Gaurav Aggarwal",
      username: "Vice president",
      body: "Collaborating for success, striving for excellence.",
      img: "/Gaurav Aggarwal.jpg",
    },
    {
      name: "Srishti Ruhal ",
      username: "Secretary",
      body: "Someone have to remind you of your own job. ",
      img: "/Srishti .jpg",
    },
    {
      name: "Aayushi ",
      username: "Content head",
      body: "Making you sound smarter than you actually are ! ",
      img: "/Aayushi 2.jpg",
    },
    {
      name: "Rajveer Deshwal ",
      username: "Social media head",
      body: "The wizard behind every scroll-stopping post. ",
      img: "/Rajveer Deshwal.jpg",
    },
    {
      name: "Abhay Chaudhary ",
      username: "PR and Outreach head",
      body: "Spreading the buzz and turning it into actions",
      img: "/Abhay Choudhary.jpg",
    },
    {
      name: "Yash Tomar ",
      username: "PR and Outreach head",
      body: "Making sure everyone knows how awesome I am !",
      img: "/yashtomar.png",
    },
    {
      name: "Chirag Malik ",
      username: "Events co-head",
      body: "When life gives chaos , I make an event out of it .",
      img: "/Chirag Malik 1.jpg",
    },
    {
      name: "Chirag Sharma ",
      username: "Events co-head",
      body: "Turning chaos into perfection .",
      img: "/Chirag Sharma2.jpeg",
    },
    {
      name: "Arush Rastogi ",
      username: "Graphics Co-head",
      body: "Making tech look cooler than your latest software update.",
      img: "/Arush Rastogi 1.jpg",
    },
    {
      name: "Shashank Mandoli ",
      username: "Graphics Co-head",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "/Shashank_Mandoli.jpg",
    },
    {
      name: "Aryan Singhal ",
      username: "Visuals co-head",
      body: "the one who makes even circuit boards look Instagram-worthy.",
      img: "/Aryan singhal 2.jpeg",
    },
    {
      name: "Vishvendra",
      username: "Visuals co-head",
      body: "Architect of aesthetics, builder of breathtaking visuals.",
      img: "/Vishvendra .jpg",
    },
  ];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden  bg-background ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
