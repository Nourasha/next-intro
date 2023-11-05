"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex h-screen justify-center items-center">
      <Link
        href="/new"
        className="border-none font-bold text-white opacity-50 hover:opacity-100 rounded-md shadow-2xl shadow-cyan-500/50 bg-cyan-500 text-xl p-3"
      >
        Produktene herfra
      </Link>
    </nav>
  );
}
