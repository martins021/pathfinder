"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const Navbar = () => {
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
                <Link href="/about" className={`${pathname === '/about' ? 'text-customHoverGray' : ''}`}>
                  <p>About</p>
                </Link>
              </li>
            </ul>
            <div className={`ml-auto text-customWhite ${pathname === '/auth' ? 'text-customHoverGray' : ''}`}>
                <Link href="/login">
                    <p>Login</p>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;