import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use on dark band sections (e.g. impact strip). */
  tone?: "default" | "inverse";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  const inverse = tone === "inverse";

  return (
    <div className={`mb-10 flex max-w-2xl flex-col gap-2.5 sm:mb-12 sm:gap-3 md:mb-16 ${alignment}`}>
      <p
        className={`font-mono text-xs tracking-wider uppercase sm:text-sm ${
          inverse ? "text-brand-300" : "text-brand-600 dark:text-brand-400"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl ${
          inverse ? "text-white" : "text-ink-900 dark:text-ink-50"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`text-[0.95rem] leading-relaxed sm:text-base md:text-lg ${
            inverse ? "text-ink-300" : "text-ink-600 dark:text-ink-300"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

type ContainerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "footer";
};

export function Container({
  children,
  className = "",
  id,
  as: Tag = "section",
}: ContainerProps) {
  return (
    <Tag id={id} className={`relative scroll-mt-20 sm:scroll-mt-24 ${className}`}>
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </Tag>
  );
}
