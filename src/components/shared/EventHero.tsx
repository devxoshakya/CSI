import React from "react";
import { getBlogPosts } from "@/data/server/events";
import { ProjectCard } from "./EventCard";

export default async function EventHero() {
    const blogPosts = await getBlogPosts();

  // Sort posts by recency (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  // Extract the most recent post as the featured one
  const [featuredPost, ...otherPosts] = sortedPosts;

  return (
    <div>
      <div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

