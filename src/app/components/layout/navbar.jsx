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
      <div className="w-full pt-3 pb-3 bg-customYellow sticky top-0">
        <div className="container mx-auto max-w-[1920px] px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-8 text-customBlack">
              <li>
                <Link href="/" className={`${pathname === '/' ? 'font-bold' : ''}`}>
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/maps" className={`${pathname === '/maps' ? 'font-bold' : ''}`}>
                  <p>Published maps</p>
                </Link>
              </li>
              {status === "authenticated" && <li>
                <Link href="/maps/mymaps" className={`${pathname === '/maps/mymaps' ? 'font-bold' : ''}`}>
                  <p>My maps</p>
                </Link>
              </li>}
            </ul>
            <CredentialsComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;