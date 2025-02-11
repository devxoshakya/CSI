import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
    {
      name: "Geetanshi",
      username: "President",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "/team/geetanshi.jpg",
    },
    {
      name: "Dev Shakya",
      username: "Technical co-head",
      body: "i rearrange 0s and 1s.",
      img: "/team/Dev.jpg",
    },
    {
      name: "Akshita Srivastava",
      username: "Technical co-head",
      body: "Weaving the web ,debugging chaos!",
      img: "/team/Akshita.jpg",
    },
    {
      name: "Pranav Bansal",
      username: "Vice president",
      body: "From vision to action, I’m here to make it happen.",
      img: "/team/Pranav.jpg",
    },
    {
      name: "Gaurav Aggarwal",
      username: "Vice president",
      body: "Collaborating for success, striving for excellence.",
      img: "/team/Gaurav.jpg",
    },
    {
      name: "Srishti Ruhal ",
      username: "Secretary",
      body: "Someone have to remind you of your own job. ",
      img: "/team/Srishti.jpg",
    },
    {
      name: "Aayushi ",
      username: "Content head",
      body: "Making you sound smarter than you actually are ! ",
      img: "/team/Aayushi.jpg",
    },
    {
      name: "Rajveer Deshwal ",
      username: "Social media head",
      body: "The wizard behind every scroll-stopping post. ",
      img: "/team/Rajveer.jpg",
    },
    {
      name: "Abhay Chaudhary ",
      username: "PR and Outreach head",
      body: "Spreading the buzz and turning it into actions",
      img: "/team/Abhay.jpg",
    },
    {
      name: "Yash Tomar ",
      username: "PR and Outreach head",
      body: "Making sure everyone knows how awesome I am !",
      img: "/team/Yash.jpg",
    },
    {
      name: "Chirag Malik ",
      username: "Events co-head",
      body: "When life gives chaos , I make an event out of it .",
      img: "/team/ChiragM.jpg",
    },
    {
      name: "Chirag Sharma ",
      username: "Events co-head",
      body: "Turning chaos into perfection .",
      img: "/team/ChiragS.jpg",
    },
    {
      name: "Arush Rastogi ",
      username: "Graphics Co-head",
      body: "Making tech look cooler than your latest software update.",
      img: "/team/Arush.jpg",
    },
    {
      name: "Shashank Mandoli ",
      username: "Graphics Co-head",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "/team/Shashank_Mandoli.jpg",
    },
    {
      name: "Aryan Singhal ",
      username: "Visuals co-head",
      body: "the one who makes even circuit boards look Instagram-worthy.",
      img: "/team/Aryan.jpg",
    },
    {
      name: "Vishvendra",
      username: "Visuals co-head",
      body: "Architect of aesthetics, builder of breathtaking visuals.",
      img: "/team/Vishvendra.jpg",
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
    <div id="team" className="relative flex my-16 max-w-7xl mx-auto flex-col items-center justify-center overflow-hidden  bg-white ">
      <div className="flex flex-col items-center mb-8 justify-center">
              <h1 className="font-neu text-5xl font-semibold">Our Team</h1>
              <h2 className="mt-3 text-center font-neu">
                Minds behind the craft.
              </h2>
              <svg
                width="400"
                height="80"
                viewBox="0 0 200 40"
                className="-translate-y-12 translate-x-[-86px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="line-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#9400D3" stopOpacity="0" />
                    <stop offset="100%" stopColor="#4B0082" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 20 L 80 20 L 100 30 H 196"
                  stroke="url(#line-gradient)"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
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
