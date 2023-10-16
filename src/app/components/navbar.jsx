import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="w-full pt-3 pb-3 bg-violet sticky top-0">
        <div className="container mx-auto max-w-[1920px] px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-8 text-white">
              <li>
                <Link href="/">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p>About</p>
                </Link>
              </li>
            </ul>
            <div className="ml-auto text-white">
                <Link href="/auth">
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