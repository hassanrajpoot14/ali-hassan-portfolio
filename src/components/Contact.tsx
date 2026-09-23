"use client";

import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { profile } from "@/data";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "someone"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`
    );

    // Works without a backend — opens the visitor's mail client prefilled.
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    form.reset();
  }

  return (
    <Container id="contact" className="py-14 sm:py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="// contact"
          title="Let's talk infrastructure"
          description={`${profile.openTo}. Email is the fastest path — LinkedIn and GitHub work too.`}
        />
      </Reveal>

      <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
        <Reveal delay={60}>
          <div className="space-y-3 sm:space-y-4">
            <div className="rounded-2xl border border-brand-300/60 bg-brand-50/70 p-4 dark:border-brand-700 dark:bg-brand-950/30">
              <p className="font-mono text-[11px] uppercase tracking-wide text-brand-700 dark:text-brand-300">
                Hiring?
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                Looking for someone who already runs live Docker + Nginx production — not just demos.
                Prefer a short call or a concrete ops problem to discuss.
              </p>
            </div>

            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("DevOps role / collaboration")}`}
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-ink-200/80 bg-white/90 p-3.5 transition hover:border-brand-300 hover:shadow-soft sm:p-4 dark:border-ink-700 dark:bg-ink-900/70 dark:hover:border-brand-600"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 sm:h-11 sm:w-11 dark:bg-brand-950/50 dark:text-brand-300">
                <Mail size={20} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-mono uppercase tracking-wide text-ink-500">Email</p>
                <p className="truncate font-medium text-ink-800 dark:text-ink-100 sm:whitespace-normal sm:break-all">
                  {profile.email}
                </p>
              </div>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-ink-200/80 bg-white/90 p-3.5 transition hover:border-brand-300 hover:shadow-soft sm:p-4 dark:border-ink-700 dark:bg-ink-900/70 dark:hover:border-brand-600"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 sm:h-11 sm:w-11 dark:bg-sky-950/40 dark:text-sky-300">
                <Linkedin size={20} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-mono uppercase tracking-wide text-ink-500">LinkedIn</p>
                <p className="truncate font-medium text-ink-800 dark:text-ink-100">alihassan4414</p>
              </div>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-ink-200/80 bg-white/90 p-3.5 transition hover:border-brand-300 hover:shadow-soft sm:p-4 dark:border-ink-700 dark:bg-ink-900/70 dark:hover:border-brand-600"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-ink-800 sm:h-11 sm:w-11 dark:bg-ink-800 dark:text-ink-100">
                <Github size={20} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-mono uppercase tracking-wide text-ink-500">GitHub</p>
                <p className="truncate font-medium text-ink-800 dark:text-ink-100">hassanrajpoot14</p>
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-ink-200/80 bg-white/90 p-4 shadow-sm sm:p-6 dark:border-ink-700 dark:bg-ink-900/70"
            noValidate
          >
            <p className="mb-4 font-mono text-xs text-ink-500 dark:text-ink-400">
              Opens your email app with the message ready — no backend required.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
                  Name
                </span>
                <input
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-base text-ink-900 outline-none ring-brand-400 transition focus:ring-2 dark:border-ink-600 dark:bg-ink-950 dark:text-ink-50 sm:text-sm"
                  placeholder="Your name"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
                  Email
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-base text-ink-900 outline-none ring-brand-400 transition focus:ring-2 dark:border-ink-600 dark:bg-ink-950 dark:text-ink-50 sm:text-sm"
                  placeholder="you@company.com"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
                Message
              </span>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full resize-y rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-base text-ink-900 outline-none ring-brand-400 transition focus:ring-2 dark:border-ink-600 dark:bg-ink-950 dark:text-ink-50 sm:text-sm"
                placeholder="Role, stack, timeline, or the production problem you need help with..."
              />
            </label>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:from-brand-700 hover:to-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:w-auto sm:py-3"
            >
              <Send size={16} aria-hidden />
              Send via email
            </button>

            {submitted ? (
              <p className="mt-3 text-sm text-accent-700 dark:text-accent-300" role="status">
                If your mail app didn&apos;t open, email me directly at {profile.email}.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </Container>
  );
}
