"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Timeline", href: "#timeline" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgb(var(--color-border-subtle))] bg-[rgb(var(--color-bg-base)/0.8)] backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[rgba(var(--color-accent),0.12)] text-[rgb(var(--color-accent))] font-bold shadow-[0_0_40px_rgba(var(--color-accent),0.15)]">
            SD
          </div>
          <div>
            <div className="font-semibold leading-none text-[rgb(var(--color-text-primary))]">Shivam Dubey</div>
            <div className="text-xs text-[rgb(var(--color-text-muted))]">AI/ML Portfolio</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-[rgb(var(--color-text-secondary))] transition hover:text-[rgb(var(--color-accent))]">
              {item.label}
            </a>
          ))}
          <Link href="/admin" className="rounded-full border border-[rgba(var(--color-accent),0.2)] bg-[rgba(var(--color-accent),0.08)] px-4 py-2 text-sm text-[rgb(var(--color-accent))] hover:bg-[rgba(var(--color-accent),0.15)]">
            Admin
          </Link>
          <ThemeToggle />
        </nav>

        <button className="md:hidden text-[rgb(var(--color-text-primary))]" onClick={() => setOpen((v) => !v)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[rgb(var(--color-border-subtle))] bg-[rgb(var(--color-bg-base)/0.95)] px-4 py-4 md:hidden">
          <div className="grid gap-3">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl bg-[var(--overlay-white)] px-4 py-3 text-sm text-[rgb(var(--color-text-secondary))]">
                {item.label}
              </a>
            ))}
            <Link href="/admin" className="rounded-2xl bg-[rgba(var(--color-accent),0.1)] px-4 py-3 text-sm text-[rgb(var(--color-accent))]">
              Admin
            </Link>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
