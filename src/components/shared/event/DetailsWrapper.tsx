"use client";

import dynamic from "next/dynamic";

const DeatilsSection = dynamic(() => import("./DeatilsSection"), { ssr: false });

export default function DeatilsWrapper({
  eventId,
  isUpcoming,
  drive,
}: {
  eventId: string;
  drive: string;
  isUpcoming: boolean;
}) {
  return <DeatilsSection eventId={eventId} isUpcoming={isUpcoming} drive={drive}/>;
}
