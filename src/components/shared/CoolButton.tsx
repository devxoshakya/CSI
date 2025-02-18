import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/magicui/cool-mode";
import  Link  from "next/link";

export function CoolButton({slug}: {slug: string}) {
  return (
    <div className="relative inline-block justify-center">
      <CoolMode  options={{
          particleCount: 35,
          
        }}>
        <Link href={`/events/${slug}`}>
        <Button  className="h-8 md:h-10 w-full">Read More...</Button>
        </Link>
      </CoolMode>
    </div>
  );
}
