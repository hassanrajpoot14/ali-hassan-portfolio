"use client";

import Image from "next/image";
import { portraits } from "@/data";

type PortraitProps = {
  variant?: "hero" | "about" | "cutout" | "avatar";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const variantSrc = {
  hero: portraits.cutout,
  about: portraits.cutout,
  cutout: portraits.cutout,
  avatar: portraits.avatar,
} as const;

/** Frameless cutout portrait for hero/about integration. */
export function Portrait({
  variant = "about",
  className = "object-contain object-[center_20%]",
  priority = false,
  sizes = "(max-width: 768px) 90vw, 420px",
}: PortraitProps) {
  return (
    <Image
      src={variantSrc[variant]}
      alt={portraits.alt}
      fill
      priority={priority}
      quality={100}
      unoptimized
      sizes={sizes}
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}
