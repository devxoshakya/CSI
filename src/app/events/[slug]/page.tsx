import Navbar from "@/components/AuthNavbar";
import { getPost } from "@/data/server/events";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CdBackWrapper from "@/components/shared/CdWrapper";
import DeatilsWrapper from "@/components/shared/event/DetailsWrapper";

// Import `CdBack.tsx` dynamically to prevent server-client conflicts
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Blog(props: PageProps) {
  const { slug } = await props.params;
  let post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-start md:py-20 py-2 max-w-2xl mx-auto">
        <section id="blog" className="md:max-w-full max-w-[370px]">
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
          <DeatilsWrapper eventId={post.metadata.eventId} isUpcoming={post.metadata.isUpcoming} drive={post.metadata.drive || "https://google.com"} />
          <article
            className="prose w-full max-w-none mt-4"
            dangerouslySetInnerHTML={{ __html: post.source }}
          ></article>
          <CdBackWrapper />
        </section>
      </main>
    </>
  );
}
