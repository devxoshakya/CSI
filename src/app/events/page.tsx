import BlurFade from "@/components/ui/BlurFade";
import { getBlogPosts } from "@/data/server/events";
import { cn } from "@/lib/utils";
import Navbar from "@/components/AuthNavbar";
import { ProjectCard } from "@/components/shared/EventCard";
import { SparklesText } from "@/components/magicui/sparkles-text";


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
  console.log(featuredPost);


  return (
    <>
      <Navbar />
    
      <div className="flex justify-center items-center">
      <section
        className={cn(
          "mx-auto md:mt-16 mt-2 min-h-[90vh] max-w-2xl bg-background px-2 py-2 font-sans antialiased sm:py-0"
        )}
      >
        <BlurFade delay={BLUR_FADE_DELAY}>
          <SparklesText
            className="text-3xl font-light my-4 tracking-tighter"
            text={"events <3"}
          />
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="items-start justify-start max-w-[32rem] md:mx-0 mx-auto mb-2">
            <ProjectCard
              //   href={project.href}
              key={featuredPost.metadata.title}
              title={featuredPost.metadata.title}
              description={featuredPost.metadata.summary}
              dates={featuredPost.metadata.dates}
              tags={featuredPost.metadata.topics}
              image={featuredPost.metadata.imageUrl}
              //   video={proj}
              slug={featuredPost.slug}
              links={featuredPost.metadata.links}
              eventId={featuredPost.metadata.eventId}
              isUpcoming={featuredPost.metadata.isUpcoming}
              className="h-full w-full"
            />
          </div>
        </BlurFade>
        {otherPosts.map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.1} key={post.slug}>
            <div className="items-start justify-start max-w-[32rem] md:mx-0 mx-auto mb-2">
            <ProjectCard
              //   href={project.href}
              key={post.metadata.title}
              title={post.metadata.title}
              description={post.metadata.summary}
              dates={post.metadata.dates}
              tags={post.metadata.topics}
              image={post.metadata.imageUrl}
              //   video={proj}
              slug={post.slug}
              links={post.metadata.links}
              eventId={post.metadata.eventId}
              isUpcoming={post.metadata.isUpcoming}
              className="h-full w-full"
            />
            </div>
          </BlurFade>
        ))}
      </section>
      </div>
    </>
  );
}
