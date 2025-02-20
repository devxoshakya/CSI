import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/magicui/cool-mode";
import  Link  from "next/link";
import { ArrowRight } from "lucide-react";

export function CoolButton({slug}: {slug: string}) {
  return (
    <div className="relative inline-block justify-center">
      <CoolMode  options={{
          particleCount: 35,
          
        }}>
        <Link href={`/events/${slug}`}>
        <Button
        variant="outline"
        className="bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 hover:border-gray-400"
      >
        Read More<ArrowRight className="ml-2 h-4 w-4" />
      </Button>
        </Link>
      </CoolMode>
    </div>
  );
}
