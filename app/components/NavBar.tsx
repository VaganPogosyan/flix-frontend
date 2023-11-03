"use client";
import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [solidBackground, setSolidBackground] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSolidBackground(true);
    }, 3000);
  }, []);

  return (
    <nav
      id="nav_bar"
      className={`fixed z-[9999999999] w-screen px-24 py-3 items-center ${
        solidBackground
          ? "bg-neutral-950 bg-opacity-95 backdrop-blur"
          : "bg-gradient-to-b from-[-100%] from-black to-100% to-transparent"
      }`}
    >
      <div className="flex justify-between">
        <div className="flex gap-10 items-center text-neutral-300">
          <Logo />
          <ul className="flex text-sm gap-6">
            <li className="hover:text-neutral-400  duration-200">
              <Link href="/mami">Home</Link>
            </li>
            <li className="hover:text-neutral-400 duration-200">
              <Link href="/papi">Watchlist</Link>
            </li>
          </ul>
        </div>
        <div className="text-2xl">Profile</div>
      </div>
    </nav>
  );
}
