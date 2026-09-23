import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data";
import { Container } from "@/components/ui/Section";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Container
      as="footer"
      className="border-t border-ink-200/70 bg-ink-950 py-8 text-ink-300 sm:py-10 dark:border-ink-800"
    >
      <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:gap-6 sm:text-left">
        <div className="min-w-0">
          <p className="font-display text-base font-bold text-white sm:text-lg">
            {profile.name}
            <span className="text-brand-400"> · </span>
            <span className="font-normal text-ink-400">{profile.title}</span>
          </p>
          <p className="mt-1 font-mono text-[11px] text-ink-500 sm:text-xs">
            © {year} {profile.name}. Built for production.
          </p>
        </div>

        <ul className="flex shrink-0 items-center gap-2" aria-label="Social links">
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink-700 text-ink-300 transition hover:border-brand-400 hover:text-brand-300 sm:h-10 sm:w-10"
              aria-label="Email Ali Hassan"
            >
              <Mail size={18} />
            </a>
          </li>
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink-700 text-ink-300 transition hover:border-brand-400 hover:text-brand-300 sm:h-10 sm:w-10"
              aria-label="Ali Hassan on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </li>
          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink-700 text-ink-300 transition hover:border-brand-400 hover:text-brand-300 sm:h-10 sm:w-10"
              aria-label="Ali Hassan on GitHub"
            >
              <Github size={18} />
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
}
