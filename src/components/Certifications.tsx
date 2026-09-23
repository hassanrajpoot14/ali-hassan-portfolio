import { certifications } from "@/data";
import type { Certification } from "@/data";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const accentStyles: Record<Certification["accent"], string> = {
  teal: "from-brand-500 to-brand-600",
  lime: "from-accent-400 to-accent-600",
  sky: "from-sky-400 to-sky-600",
  amber: "from-amber-400 to-amber-600",
  cyan: "from-cyan-400 to-cyan-600",
};

export function Certifications() {
  const ordered = [...certifications].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <Container
      id="certifications"
      className="border-y border-ink-200/60 bg-gradient-to-b from-white via-brand-50/30 to-white py-14 sm:py-20 md:py-28 dark:border-ink-800 dark:from-ink-950 dark:via-ink-900 dark:to-ink-950"
    >
      <Reveal>
        <SectionHeading
          eyebrow="// certifications"
          title="Credentials that back the craft"
          description="Role-fit first: Azure administration, Huawei cloud architecture, and RHCSA in progress — plus foundational certs."
        />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {ordered.map((cert, index) => (
          <Reveal key={cert.id} delay={index * 70}>
            <article
              className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-glow dark:bg-ink-900/70 ${
                cert.featured
                  ? "border-brand-300/80 dark:border-brand-700"
                  : "border-ink-200/80 dark:border-ink-700"
              }`}
            >
              <div
                className={`relative flex h-24 items-center justify-center bg-gradient-to-br sm:h-28 ${accentStyles[cert.accent]}`}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                  aria-hidden
                />
                <span className="relative font-display text-3xl font-extrabold tracking-tight text-white drop-shadow">
                  {cert.shortCode}
                </span>
                {cert.status === "in-progress" ? (
                  <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                    In progress
                  </span>
                ) : (
                  <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-brand-800">
                    Earned
                  </span>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-display text-base font-semibold leading-snug text-ink-900 sm:text-lg dark:text-ink-50">
                  {cert.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{cert.issuer}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
