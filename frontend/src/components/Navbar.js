import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-900/80 backdrop-blur-md text-white">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-emerald-500" />
                    <span className="font-semibold tracking-tight">KeepNotes</span>
                </Link>

                <nav className="hidden gap-6 text-sm md:flex">
                    <Link
                        href="/"
                        className="opacity-70 hover:opacity-100 transition"
                    >
                        About
                    </Link>

                    <Link
                        href="/"
                        className="opacity-70 hover:opacity-100 transition"
                    >
                        Account
                    </Link>

                    <Link
                        href="/"
                        className="opacity-70 hover:opacity-100 transition"
                    >
                        Notes
                    </Link>

                    <Link
                        href="/auth/login"
                        className="opacity-70 hover:opacity-100 transition"
                    >
                        Login
                    </Link>
                </nav>
            </div>
        </header>
    );
}
