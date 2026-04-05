"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface SocialItem {
  icon: ReactNode;
  href: string;
  label: string;
}

interface SocialLinksProps {
  items: SocialItem[];
}

export function SocialLinks({ items }: SocialLinksProps) {
  return (
    <div className="flex gap-4 mt-4">
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          target="_blank"
          className="group relative w-11 h-11 flex items-center justify-center rounded-full border border-primary/20 text-primary transition-all duration-300 hover:border-primary hover:shadow-[0_0_12px_rgba(34,210,236,0.4)] hover:scale-110"
        >
          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
            {item.icon}
          </span>

          {/* Tooltip */}
          <span className="absolute -bottom-7 text-[10px] font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}