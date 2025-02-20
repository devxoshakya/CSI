"use client";
import PhotosButton from "../DriveButton";
import LikeCounter from "../LikeCounter";
import { RegisterButton } from "../RegisterButton";
import RegistrationsBadge from "../RegistrationsBadge";

export default function DeatilsSection({
  eventId,
  isUpcoming,
  drive,
}: {
  eventId: string;
  drive: string;
  isUpcoming: boolean;
}) {
  return (
    <>
      <div className="flex my-2 justify-start items-center w-full gap-2 md:gap-4">
        {isUpcoming ? <RegisterButton eventId={eventId} /> : <PhotosButton drive={drive} />}
        <LikeCounter eventId={eventId} />
        <div className="whitespace-nowrap md:pt-1">
          <RegistrationsBadge eventId={eventId} />
        </div>
      </div>
    </>
  );
}
