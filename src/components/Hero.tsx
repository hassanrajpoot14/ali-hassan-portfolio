"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/data";
import { Portrait } from "@/components/ui/Portrait";

const TYPING_ROLES = ["DevOps Engineer", "Infrastructure Operator", "CI/CD Builder"];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(profile.title);
      return;
    }

    const full = TYPING_ROLES[roleIndex];
    const speed = deleting ? 36 : 70;

    if (!deleting && display === full) {
      const hold = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(hold);
    }

    if (deleting && display === "") {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % TYPING_ROLES.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplay((prev) =>
        deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [display, deleting, roleIndex]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-hero-mesh dark:bg-hero-mesh-dark"
      aria-label="Introduction"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,145,178,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 35% 35%, black 22%, transparent 70%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 animate-float rounded-full bg-brand-400/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 h-96 w-96 animate-float rounded-full bg-accent-400/20 blur-3xl [animation-delay:1.2s]"
        aria-hidden
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl content-center items-center gap-6 px-4 pb-10 pt-[4.5rem] sm:gap-8 sm:px-6 sm:pb-12 sm:pt-[5rem] lg:grid-cols-[0.95fr_1.05fr] lg:gap-6 lg:px-8 lg:pb-10 lg:pt-[5.25rem]">
        <div className="relative z-10 mx-auto w-full max-w-2xl text-center lg:-mt-12 lg:mx-0 lg:self-center lg:text-left">
          <p className="mb-4 inline-flex items-center justify-center gap-1.5 font-mono text-xs text-ink-500 sm:mb-5 sm:text-[13px] dark:text-ink-400 lg:justify-start">
            <MapPin size={12} className="shrink-0 text-brand-600 dark:text-brand-400" aria-hidden />
            {profile.location}
          </p>

          <p className="mb-2 font-mono text-sm tracking-wide text-brand-700 sm:text-base dark:text-brand-300">
            Hello, I&apos;m
          </p>

          <h1 className="font-display text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-6xl md:text-7xl lg:text-[5.25rem] dark:text-white">
            {profile.name}
          </h1>

          <p className="mt-3 flex min-h-[2.25rem] items-center justify-center font-display text-xl font-semibold sm:min-h-[2.75rem] sm:text-3xl md:text-4xl lg:justify-start lg:text-[2.75rem] dark:text-ink-100">
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
              {display || "\u00A0"}
            </span>
            <span
              className="ml-0.5 inline-block h-[1.05em] w-[2px] animate-pulse bg-brand-500 align-middle sm:w-[3px]"
              aria-hidden
            />
          </p>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-600 sm:mt-5 sm:text-lg md:text-xl dark:text-ink-300 lg:mx-0">
            {profile.tagline}
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
            <a
              href={profile.resumeUrl}
              download="Ali-Hassan-DevOps-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:from-brand-700 hover:to-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:text-base"
            >
              <Download size={18} aria-hidden />
              Download Resume
              <ArrowDownRight
                size={16}
                className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-ink-800 backdrop-blur transition hover:border-brand-400 hover:text-brand-800 dark:border-ink-600 dark:bg-ink-900/60 dark:text-ink-100 dark:hover:border-brand-400 sm:text-base"
            >
              <Mail size={18} aria-hidden />
              Contact me
            </a>
          </div>

          <p className="mt-5 font-mono text-xs text-ink-500 sm:mt-6 sm:text-sm dark:text-ink-400">
            <span className="text-accent-600 dark:text-accent-400">➜</span> {profile.yearsExperience}{" "}
            years shipping reliable infrastructure
          </p>
          <p className="mt-2 font-mono text-[11px] text-ink-400 sm:text-xs dark:text-ink-500">
            Open to: {profile.openTo}
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[520px] flex-col items-center justify-self-center sm:max-w-[640px] lg:-mt-10 lg:max-w-none lg:justify-self-end lg:self-center">
          <div
            className="pointer-events-none absolute bottom-8 left-1/2 h-40 w-[80%] -translate-x-1/2 rounded-full bg-brand-400/30 blur-3xl sm:h-52 dark:bg-brand-500/20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-4 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl sm:h-72 sm:w-72 dark:bg-cyan-400/10"
            aria-hidden
          />

          <figure className="relative w-full">
            <div className="relative mx-auto h-[min(48svh,380px)] w-full max-w-[420px] sm:h-[min(56svh,520px)] sm:max-w-[560px] lg:h-[min(78vh,680px)] lg:max-w-[700px]">
              <Portrait
                variant="cutout"
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 700px"
                className="object-contain object-bottom drop-shadow-[0_28px_50px_rgba(8,145,178,0.28)] dark:drop-shadow-[0_22px_40px_rgba(0,0,0,0.5)]"
              />
            </div>
            <figcaption className="mt-2 flex justify-center sm:mt-4">
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-xl border border-accent-400/40 bg-white/95 px-2.5 py-1.5 font-mono text-[10px] text-ink-600 shadow-md backdrop-blur sm:px-3 sm:text-[11px] dark:border-accent-500/30 dark:bg-ink-900/90 dark:text-ink-300">
                <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-55" />
                  <span className="relative inline-flex h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-500" />
                </span>
                available for opportunities
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
