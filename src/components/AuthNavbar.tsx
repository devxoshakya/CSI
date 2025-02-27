"use client";
import Link from "next/link";
import { Home, Calendar, LayoutDashboard, LogOut } from "lucide-react";
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
const AuthNavbar = () => {
  const pathname = usePathname();
  const isRootPath = pathname === '/home';
  const { data: Session } = useSession();
  return (
    <nav className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 border-b-2 border-gray-200">
        <div className="flex justify-between items-center h-16">
          <div className=" relative h-12 w-12">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="CSI Logo"
                fill
                className="object-contain h-12 w-12"
                sizes="(max-width: 768px) 48px, 48px"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center">
            <ProfileMenu image={Session?.user.image} name={Session?.user.name} email={Session?.user.email}/>
            {/* {Session?.user.isOnboarded} */}
          </div>
        </div>
      </div>
    </nav>
  );
};


const ProfileMenu = ({image,name,email}:any) => {
  const pathname = usePathname();
  const isRootPath = pathname === '/home';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image} alt="@username" />
            <AvatarFallback>DEV</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={isRootPath ? "/events" : "/home"}>
            <Home className="mr-2 h-4 w-4" />
            <span>{isRootPath ? "Events" : "Home"}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/attendance">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Attendance</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthNavbar;
