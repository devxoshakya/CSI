"use client";
import { useEffect, useState } from "react";
import { Pill, PillAvatarGroup, PillAvatar } from "@/components/ui/Pill";
import { useSession } from "next-auth/react";



const RegistrationsBadge = ({ eventId }: { eventId: string }) => {
    const { data: session } = useSession();
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

                     <PillAvatar key={1} src={"https://avatars.githubusercontent.com/u/175945557"}/>
                     <PillAvatar key={12} src={"https://avatars.githubusercontent.com/u/44896539"}/>
                     <PillAvatar key={13} src={session?.user.image}/>

                </PillAvatarGroup>
                { registrations && (registrations.length > 0 ? `${registrations.length} Registrations` : "Loading...")}
            </Pill>
        </div>
    );
};

export default RegistrationsBadge;
