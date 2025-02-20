import BlurFade from "@/components/ui/BlurFade";
import { getBlogPosts } from "@/data/server/events";
import { cn } from "@/lib/utils";
import Navbar from "@/components/AuthNavbar";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { redirect } from "next/navigation";
import AttendeeScanner from "@/components/shared/Attendance/AttendeeScanner";
import Link from "next/link";

export const metadata = {
  title: "Attendee Check-In",
  description: "CSI MIET's Attendee Check-In Page",
};

// const AttendeeScanner = ({ eventId }: any) => {
//   return (
//     <div>
//       <p>Event ID: {eventId}</p>
//     </div>
//   );
// };

const BLUR_FADE_DELAY = 0.04;

export default async function AttendeePage({
  searchParams,
}: {
  searchParams: { eventId?: string };
}) {
  const posts = await getBlogPosts();

  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  // Extract the most recent post as the featured one
  const [featuredPost, ...otherPosts] = sortedPosts;

  const selectedEventId = await searchParams.eventId;

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
              text={"Attendee Check-In <3"}
            />
          </BlurFade>

          {selectedEventId ? (
            <AttendeeScanner eventId={selectedEventId} />
          ) : featuredPost.metadata.isUpcoming ? (
            <Link href={`?eventId=${featuredPost.metadata.eventId}`}>
              {" "}
              <BlurFade
                delay={BLUR_FADE_DELAY * 2 * 0.05}
                key={featuredPost.slug}
              >
                <div className="flex w-full flex-col  my-16">
                  <p className="tracking-tight">
                    {featuredPost.metadata.title}
                  </p>
                  <p className="h-6 text-xs text-muted-foreground">
                    {featuredPost.metadata.publishedAt}
                  </p>
                </div>
              </BlurFade>
            </Link>
          ) : (
            <BlurFade
              delay={BLUR_FADE_DELAY * 2 * 0.05}
              key={featuredPost.slug}
            >
              <>
                <span className="text-muted-foreground text-gray-400 font-semibold">
                  No upcoming events
                </span>
              </>
            </BlurFade>
          )}
        </section>
      </div>
    </>
  );
}
