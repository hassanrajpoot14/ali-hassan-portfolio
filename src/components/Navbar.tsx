"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BrandMark } from "@/components/ui/BrandMark";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink-200/70 bg-white/85 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-950/85"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="group flex min-w-0 items-center gap-2 font-display text-base font-bold tracking-tight text-ink-900 sm:gap-2.5 sm:text-lg dark:text-white"
          onClick={() => setOpen(false)}
        >
          <BrandMark className="transition group-hover:ring-brand-400/70" />
          <span className="truncate">
            <span className="sm:hidden">{profile.firstName}</span>
            <span className="hidden sm:inline">
              {profile.firstName}
              <span className="text-brand-600 dark:text-brand-400"> {profile.lastName}</span>
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-ink-600 transition hover:bg-brand-50 hover:text-brand-800 lg:px-3 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-brand-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden lg:block">
            <StatusBadge />
          </div>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 bg-white/80 text-ink-700 xl:hidden dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[3.25rem] z-40 overflow-y-auto overscroll-contain border-t border-ink-200/70 bg-white/98 px-4 py-4 backdrop-blur-xl sm:top-[3.5rem] sm:px-6 xl:hidden dark:border-ink-800 dark:bg-ink-950/98"
        >
          <div className="mb-4 overflow-x-auto lg:hidden">
            <StatusBadge className="whitespace-nowrap" />
          </div>
          <ul className="flex flex-col gap-1 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-xl px-3 py-3.5 text-base font-medium text-ink-700 hover:bg-brand-50 active:bg-brand-100 dark:text-ink-200 dark:hover:bg-ink-800"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
