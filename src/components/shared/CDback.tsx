"use client";
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CdBack = () => {
    const router = useRouter()

    return (
        <div className="flex items-center justify-start gap-1 py-2">
            <ChevronRight className="size-4 stroke-black dark:stroke-white" />
            <a
                onClick={() => router.back()}
                className="cursor-pointer bg-transparent tracking-wide text-black underline decoration-[#4B4B4B] decoration-[1.2px] underline-offset-4 opacity-50 transition-all duration-300 hover:opacity-100 dark:text-white"
            >
                cd <span className="tracking-[0.4rem]">..</span>
            </a>
        </div>
    )
}
export default CdBack