import LoginWrapper from "@/components/shared/WhatsHappening/LoginWrapper";
import { getPost, getBlogPosts } from "@/data/server/events";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";

// export async function generateMetadata({
//   params,
// }: {
//   params: {
//     slug: string;
//   };
// }): Promise<Metadata | undefined> {
//   let post = await getPost(params.slug);

//   let {
//     title,
//     publishedAt: publishedTime,
//     summary: description,
//     image,
//   } = post.metadata;
//   let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       type: "article",
//       publishedTime,
//       url: `${DATA.url}/blog/${post.slug}`,
//       images: [
//         {
//           url: ogImage,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [ogImage],
//     },
//   };
// }

export default async function Blog({}) {
  const blogPosts = await getBlogPosts();

  // Sort posts by recency (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  // Extract the most recent post as the featured one
  const [featuredPost, ...otherPosts] = sortedPosts;

  let post = await getPost(featuredPost.metadata.eventId);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center justify-start py-20 max-w-2xl mx-auto">
      <section id="blog" className="md:max-w-full max-w-[350px]">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              // image: post.metadata.image
              //   ? `${DATA.url}${post.metadata.image}`
              //   : `${DATA.url}/og?title=${post.metadata.title}`,
              // url: `${DATA.url}/blog/${post.slug}`,
              // author: {
              //   "@type": "Person",
              //   name: DATA.name,
              // },
            }),
          }}
        />
        <h1 className="title font-medium text-2xl tracking-tighter">
          {post.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-2 text-sm">
          <Suspense fallback={<p className="h-5" />}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </Suspense>
        </div>
        <div className="block w-[2.5rem] h-[0.2rem] mb-8 bg-[#ddd]"></div>
        <Image
          src={post.metadata.imageUrl}
          alt="event-image"
          className="h-full my-2"
          height={4000}
          width={8000}
        />
        <LoginWrapper
          eventId={post.metadata.eventId}
          isUpcoming={post.metadata.isUpcoming}
          drive={post.metadata.drive || "https://google.com"}
        />

        <article
          className="prose w-full max-w-none"
          dangerouslySetInnerHTML={{ __html: post.source }}
        ></article>
      </section>
    </main>
  );
}
