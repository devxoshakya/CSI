"use client";

import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/magicui/cool-mode";
import { Heart } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { useOptimistic } from "react";

export default function LikeCounter({ eventId }: { eventId: string }) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition(); // For optimistic updates

    const [optimisticLikes, addOptimisticLike] = useOptimistic(
        likes,
        (state, newLike: number) => state + newLike
    );

    useEffect(() => {
        fetch(`/api/events/like?eventId=${eventId}`)
            .then(response => response.json())
            .then(data => {
                const event = data.find((event: { eventId: string }) => event.eventId === eventId);
                if (event) {
                    setLikes(event.like);
                    setIsLiked(event.liked);
                }
            })
            .catch(err => console.error("Error fetching likes:", err));
    }, [eventId]);

    const handleLike = () => {
        if (loading) return;
        setLoading(true);

        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);

        startTransition(() => {
            addOptimisticLike(newIsLiked ? 1 : -1);
        });

        fetch('/api/events/like', {
            method: newIsLiked ? 'POST' : 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId }),
        })
            .then(response => response.json())
            .then(data => {
                setLikes(data.likes);
            })
            .catch(err => {
                console.error("Error updating like:", err);
                setIsLiked(!newIsLiked);
                startTransition(() => {
                    addOptimisticLike(newIsLiked ? -1 : 1);
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="relative flex justify-center items-center md:mt-1">
            <CoolMode
                key={optimisticLikes} // Forces re-render when like count changes
                options={{
                    particle:
                        "https://png.pngtree.com/png-clipart/20231006/original/pngtree-red-heart-emoji-vector-png-image_13132310.png",
                    size: 60,
                    particleCount: 30,
                    speedHorz: 5,
                    speedUp: 16,
                }}
            >
                <Button onClick={handleLike} className="h-8 md:h-10 w-full bg-white text-black hover:bg-white" disabled={loading || isPending}>
                    <Heart
                        className={`-ms-1 me-2 ${
                            isLiked ? "fill-red-500 text-red-500" : "opacity-60"
                        }`}
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                    <span className="flex items-baseline gap-2 ">
                        Like
                        <span className="text-xs text-neutral-800">
                            {optimisticLikes}
                        </span>
                    </span>
                </Button>
            </CoolMode>
        </div>
    );
}
