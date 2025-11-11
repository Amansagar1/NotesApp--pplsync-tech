import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/70 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-emerald-500" />
                    <span className="font-semibold tracking-tight">KeepNotes</span>
                </Link>
                <nav className="hidden gap-6 text-sm md:flex">
                    <Link className="opacity-70 transition hover:opacity-100" href="/">About</Link>
                    <Link className="opacity-70 transition hover:opacity-100" href="/">Account</Link>
                    <Link className="opacity-70 transition hover:opacity-100" href="/">Notes</Link>
                    <Link className="opacity-70 transition hover:opacity-100" href="/auth/login">Login</Link>
                </nav>
            </div>
        </header>
    );
}
