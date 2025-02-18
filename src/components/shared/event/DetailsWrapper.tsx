"use client";

import dynamic from "next/dynamic";

const DeatilsSection = dynamic(() => import("./DeatilsSection"), { ssr: false });

export default function DeatilsWrapper({eventId}: {eventId: string}) {
  return <DeatilsSection eventId={eventId}/>;
}
