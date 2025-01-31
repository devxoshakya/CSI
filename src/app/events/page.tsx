import Upcoming from "@/components/shared/upcoming";
import Tiles from "@/components/shared/tiles";
import { getBlogPosts } from "@/data/events";

export const metadata = {
  title: "Events/Blogs",
  description: "Latest events and blogs, featuring our most recent updates.",
};

export default async function EventsPage() {
  // Fetch blog posts from the server
  const blogPosts = await getBlogPosts();

  // Sort posts by recency (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  // Extract the most recent post as the featured one
  const [featuredPost, ...otherPosts] = sortedPosts;

  return (
    <main  id="events" className="container mx-auto py-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Featured Event/Blog */}
      <Upcoming
        image={featuredPost.metadata.imageUrl}
        title={featuredPost.metadata.title}
        description={featuredPost.metadata.summary}
      />

      <h1 className="text-3xl font-bold mb-6 mt-8">Events</h1>

      {/* Remaining Events/Blogs */}
      <Tiles
        tiles={otherPosts.map((post) => ({
          id: Number(post.slug),
          imageUrl: post.metadata.imageUrl,
          title: post.metadata.title,
          description: post.metadata.summary,
        }))}
      />
    </main>
  );
}
