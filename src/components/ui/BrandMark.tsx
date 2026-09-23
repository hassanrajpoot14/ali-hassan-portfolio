/** Compact DevOps brand mark for the navbar — terminal prompt + pipeline nodes. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 shadow-soft ring-2 ring-brand-400/40 sm:h-9 sm:w-9 dark:from-brand-500 dark:to-brand-700 dark:ring-brand-400/30 ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 32 32"
        className="h-[18px] w-[18px] text-white sm:h-5 sm:w-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Terminal caret */}
        <path
          d="M7 10.5L12.5 16L7 21.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Prompt underscore */}
        <path
          d="M15 21.5H25"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Tiny pipeline nodes */}
        <circle cx="18.5" cy="11" r="1.4" fill="currentColor" opacity="0.55" />
        <circle cx="23" cy="11" r="1.4" fill="currentColor" opacity="0.9" />
        <path
          d="M19.9 11H21.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </span>
  );
}
