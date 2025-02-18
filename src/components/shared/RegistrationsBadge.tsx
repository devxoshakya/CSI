"use client";
import { useEffect, useState } from "react";
import { Pill, PillAvatarGroup, PillAvatar } from "@/components/ui/Pill";



const RegistrationsBadge = ({ eventId }: { eventId: string }) => {
    const [registrations, setRegistrations] = useState<any>([]);

    useEffect(() => {
        const fetchRegistrations = async () => {
            const res = await fetch(`/api/registrations?eventId=${eventId}`);
            const data = await res.json();
            setRegistrations(data.registrations);
            
        };

        fetchRegistrations();
    }, [eventId]);

    return (
        <div className="my-auto inline-block">
            <Pill className="">
                <PillAvatarGroup>
                    {registrations && registrations.slice(-3).map((registration:any, index:any) => (
                        <PillAvatar key={index} src={registration.image} fallback={registration.name} />
                    ))}
                </PillAvatarGroup>
                { registrations && (registrations.length > 0 ? `${registrations.length} Registrations` : "Loading...")}
            </Pill>
        </div>
    );
};

export default RegistrationsBadge;
