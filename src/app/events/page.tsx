import BlurFade from "@/components/ui/BlurFade";
import { getBlogPosts } from "@/data/server/events";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Navbar from "@/components/AuthNavbar";
import upcoming from "@/components/shared/upcoming";
import { ProjectCard } from "@/components/shared/EventCard";

export const metadata = {
  title: "Events",
  description: "CSI MIET's upcoming and past events",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  // Extract the most recent post as the featured one
  const [featuredPost, ...otherPosts] = sortedPosts;

  return (
    <>
      <Navbar />
      <section
        className={cn(
          "mx-auto md:mt-16 mt-2 min-h-[90vh] max-w-2xl bg-background px-6 py-2 font-sans antialiased sm:py-0"
        )}
      >
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="mb-2 text-2xl font-medium tracking-tighter">
            {"events <3"}
          </h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY*2}>
          <div className="items-start justify-start max-w-[32rem] md:mx-0 mx-auto mb-8">
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
              className="h-full w-full"
            />
          </div>
        </BlurFade>
        {otherPosts.map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.1} key={post.slug}>
            <Link
              className="mb-4 flex flex-col space-y-1"
              href={`/blog/${post.slug}`}
            >
              <div className="flex w-full flex-col">
                <p className="tracking-tight">{post.metadata.title}</p>
                <p className="h-6 text-xs text-muted-foreground">
                  {post.metadata.publishedAt}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
      </section>
    </>
  );
}
