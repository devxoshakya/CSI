"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "../ui/RainbowButton";

interface RegisterButtonProps {
    eventId: string;
}

export function RegisterButton({ eventId }: RegisterButtonProps) {
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const checkRegistration = async () => {
            const response = await fetch(`/api/register-event?eventId=${eventId}`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setIsRegistered(data.registered);
            }
        };

        checkRegistration();
    }, [eventId]);

    const handleClick = async () => {
        const response = await fetch(`/api/register-event`, {
            method: isRegistered ? "DELETE" : "POST",
            body: JSON.stringify({ eventId : eventId }),
        });

        if (response.ok) {
            setIsRegistered(!isRegistered);

            if (!isRegistered) {
                const duration = 4500;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                const randomInRange = (min: number, max: number) =>
                    Math.random() * (max - min) + min;

                const interval = window.setInterval(() => {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 50 * (timeLeft / duration);
                    confetti({
                        ...defaults,
                        particleCount,
                        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    });
                    confetti({
                        ...defaults,
                        particleCount,
                        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    });
                }, 250);
            }
        }
    };

    return (
        <div className="relative inline-block">
            <RainbowButton className="h-8 md:h-10 w-full" onClick={handleClick}>
                {isRegistered ? "Unregister" : "Register!"}
            </RainbowButton>
        </div>
    );
}
