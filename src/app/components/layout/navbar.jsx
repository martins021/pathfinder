"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";
import CredentialsComponent from "../dropdowns/credentialsComponent";

const Navbar = () => {
  const { status } = useSession();
  const pathname = usePathname();
  
  return (
    <>
      <div className="w-full pt-3 pb-3 bg-customViolet sticky top-0">
        <div className="container mx-auto max-w-[1920px] px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-8 text-customWhite">
              <li>
                <Link href="/" className={`${pathname === '/' ? 'text-customHoverGray' : ''}`}>
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/maps/explore" className={`${pathname === '/maps/explore' ? 'text-customHoverGray' : ''}`}>
                  <p>Explore</p>
                </Link>
              </li>
              {status === "authenticated" && <li>
                <Link href="/maps/mymaps" className={`${pathname === '/maps/mymaps' ? 'text-customHoverGray' : ''}`}>
                  <p>My maps</p>
                </Link>
              </li>}
              <li>
                <Link href="/about" className={`${pathname === '/about' ? 'text-customHoverGray' : ''}`}>
                  <p>About</p>
                </Link>
              </li>
            </ul>
            <CredentialsComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;