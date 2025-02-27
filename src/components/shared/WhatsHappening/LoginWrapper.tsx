"use client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const DeatilsSection = dynamic(() => import("../event/DeatilsSection"), {
  ssr: false,
});
const LoginButton = dynamic(() => import("./LoginButton"), { ssr: false });

export default function LoginWrapper({
  eventId,
  isUpcoming,
  drive,
}: {
  eventId: string;
  drive: string;
  isUpcoming: boolean;
}) {

    const { data: session, status } = useSession();
    
    if (status === "loading") {
        return <div>Loading...</div>;
    }
    
    return (
        <>
        {session ? (
            <DeatilsSection eventId={eventId} isUpcoming={isUpcoming} drive={drive} />
        ) : (
            <LoginButton />
        )}
        </>
    );

}
