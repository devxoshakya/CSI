import React from "react";
import { getBlogPosts } from "@/data/server/events";
import { ProjectCard } from "@/components/shared/EventCard";

export default async function EventHero() {
  const blogPosts = await getBlogPosts();

  // Sort posts by recency (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  // Extract the most recent post as the featured one
  const [featuredPost, ...otherPosts] = sortedPosts;
  const data = [
    {
      metadata: {
        title: "How to join us?",
        publishedAt: "2024-08-13",
        summary: "A comprehensive guide on how to join ADSLabs",
        imageUrl:
          "https://raw.githubusercontent.com/akshitasrivastava20/CSI/refs/heads/main/public/g1.jpg",
      },
      slug: "event-1",
      source: "",
    },
    {
      metadata: {
        title: "How to join us?",
        publishedAt: "2024-08-19",
        summary: "A comprehensive guide on how to join ADSLabs",
        eventId: "event-demo",
        eventSecret: "bdibvdiyvgdvygyudfgvyufbdhbfodvruh83794692784-2",
        date: "2024-01-10",
        imageUrl:
          "https://raw.githubusercontent.com/akshitasrivastava20/CSI/refs/heads/main/public/g2.jpg",
      },
      slug: "event-2",
      source: "",
    },
    {
      metadata: {
        title: "How to join us?",
        publishedAt: "2024-10-13",
        summary: "A comprehensive guide on how to join ADSLabs",
        imageUrl:
          "https://raw.githubusercontent.com/akshitasrivastava20/CSI/refs/heads/main/public/g3.jpg",
      },
      slug: "event-3",
      source: "",
    },
    {
      metadata: {
        title: "How to join us?",
        publishedAt: "2024-12-31",
        summary: "A comprehensive guide on how to join ADSLabs",
        eventId: "demo-3",
        eventSecret: "yf7fy7griufrbhbrghkregvhvbhkvfdlhhj",
        date: "2024-03-12",
        imageUrl:
          "https://raw.githubusercontent.com/akshitasrivastava20/CSI/refs/heads/main/public/g4.jpg",
      },
      slug: "event-4",
      source: "",
    },
  ];
  return (
    <div>
      <div id="events">
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="text-center mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-neu text-5xl font-semibold">Events</h1>
              <h2 className="mt-3 text-center font-neu">
                Events We&apos;ve crafted.
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
            <div className="items-center max-w-[32rem] mx-auto">
              <ProjectCard
                //   href={project.href}
                key={featuredPost.metadata.title}
                title={featuredPost.metadata.title}
                description={featuredPost.metadata.summary}
                dates={featuredPost.metadata.dates}
                tags={featuredPost.metadata.topics}
                image={featuredPost.metadata.imageUrl}
                //   video={proj}
                links={featuredPost.metadata.links}
                isUpcoming={featuredPost.metadata.isUpcoming}
                  eventId={featuredPost.metadata.eventId}
                  slug={featuredPost.slug}
                className="h-full w-full"
              />
            </div>
            <div className="md:flex-row flex flex-col items-center justify-center gap-8 my-8 min-w-7xl">
                <ProjectCard
                  //   href={project.href}
                  key={featuredPost.metadata.title}
                  title={featuredPost.metadata.title}
                  description={featuredPost.metadata.summary}
                  dates={featuredPost.metadata.dates}
                  tags={featuredPost.metadata.topics}
                  image={featuredPost.metadata.imageUrl}
                  //   video={proj}
                  links={featuredPost.metadata.links}
                  isUpcoming={featuredPost.metadata.isUpcoming}
                  eventId={featuredPost.metadata.eventId}
                  slug={featuredPost.slug}
                  className="h-full  w-full"
                />
              
              <ProjectCard
                //   href={project.href}
                key={featuredPost.metadata.title}
                title={featuredPost.metadata.title}
                description={featuredPost.metadata.summary}
                dates={featuredPost.metadata.dates}
                tags={featuredPost.metadata.topics}
                image={featuredPost.metadata.imageUrl}
                //   video={proj}
                links={featuredPost.metadata.links}
                isUpcoming={featuredPost.metadata.isUpcoming}
                  eventId={featuredPost.metadata.eventId}
                  slug={featuredPost.slug}
                className="h-full w-full"
              />
              <ProjectCard
                //   href={project.href}
                key={featuredPost.metadata.title}
                title={featuredPost.metadata.title}
                description={featuredPost.metadata.summary}
                dates={featuredPost.metadata.dates}
                tags={featuredPost.metadata.topics}
                image={featuredPost.metadata.imageUrl}
                //   video={proj}
                links={featuredPost.metadata.links}
                isUpcoming={featuredPost.metadata.isUpcoming}
                  eventId={featuredPost.metadata.eventId}
                  slug={featuredPost.slug}
                

                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
