import { profile } from "@/data";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Portrait } from "@/components/ui/Portrait";

export function About() {
  return (
    <Container id="about" className="py-14 sm:py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="// about"
          title="Building calm production systems"
          description="Technical credibility first — reliable releases, hardened proxies, and clear incident response."
        />
      </Reveal>

      <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr] lg:gap-14">
        <Reveal delay={80}>
          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[320px] md:max-w-none">
            <div className="relative mx-auto aspect-[3/4] w-full">
              <div
                className="pointer-events-none absolute bottom-6 left-1/2 h-28 w-4/5 -translate-x-1/2 rounded-full bg-brand-400/25 blur-2xl"
                aria-hidden
              />
              <Portrait
                variant="cutout"
                sizes="(max-width: 768px) 280px, 320px"
                className="object-contain object-[center_25%] drop-shadow-[0_18px_35px_rgba(8,145,178,0.28)]"
              />
            </div>
            <p className="mt-2 text-center font-display text-base font-semibold text-ink-800 dark:text-ink-100">
              {profile.name}
            </p>
            <p className="text-center font-mono text-xs text-brand-700 dark:text-brand-300">
              {profile.title}
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="min-w-0 space-y-4 text-base leading-relaxed text-ink-600 sm:space-y-5 sm:text-lg dark:text-ink-300">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
            <dl className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3 sm:mt-8 sm:gap-4">
              <div className="rounded-2xl border border-brand-200/70 bg-brand-50/60 p-3.5 sm:p-4 dark:border-brand-800/50 dark:bg-brand-950/30">
                <dt className="font-mono text-[11px] uppercase tracking-wide text-brand-700 sm:text-xs dark:text-brand-300">
                  Experience
                </dt>
                <dd className="mt-1 font-display text-xl font-bold text-ink-900 sm:text-2xl dark:text-white">
                  {profile.yearsExperience} yrs
                </dd>
              </div>
              <div className="rounded-2xl border border-accent-200/70 bg-accent-50/60 p-3.5 sm:p-4 dark:border-accent-800/40 dark:bg-accent-950/20">
                <dt className="font-mono text-[11px] uppercase tracking-wide text-accent-700 sm:text-xs dark:text-accent-300">
                  Focus
                </dt>
                <dd className="mt-1 font-display text-xl font-bold text-ink-900 sm:text-2xl dark:text-white">
                  Prod Ops
                </dd>
              </div>
              <div className="rounded-2xl border border-ink-200 bg-white/70 p-3.5 sm:p-4 dark:border-ink-700 dark:bg-ink-900/50">
                <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-500 sm:text-xs dark:text-ink-400">
                  Based in
                </dt>
                <dd className="mt-1 font-display text-lg font-bold text-ink-900 sm:text-xl dark:text-white">
                  Lahore
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
