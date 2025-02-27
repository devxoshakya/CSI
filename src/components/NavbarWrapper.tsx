'use client';

import { useSession } from "next-auth/react";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Pre-load both components but don't render them yet
const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
const AuthNavbar = dynamic(() => import("./AuthNavbar"), { ssr: false });

// Simple loading placeholder for the navbar
const NavbarSkeleton = () => (
  <div className="w-full h-16 bg-gray-100 animate-pulse rounded-md"></div>
);

const NavbarWrapper = () => {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  
  // Handle hydration mismatch by only rendering after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading skeleton while session is loading
  if (!mounted || status === 'loading') {
    return <NavbarSkeleton />;
  }

  // Once session status is known, render the appropriate navbar
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      {session ? <AuthNavbar /> : <Navbar />}
    </Suspense>
  );
};

export default NavbarWrapper;