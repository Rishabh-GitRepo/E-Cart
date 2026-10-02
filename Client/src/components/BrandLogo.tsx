import { useId } from "react";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
  textClassName?: string;
};

export default function BrandLogo({
  compact = false,
  className = "",
  textClassName = "",
}: BrandLogoProps) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className={compact ? "h-8 w-8" : "h-10 w-10"}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`etrade-gradient-${gradientId}`} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <rect x="4" y="6" width="56" height="52" rx="16" fill={`url(#etrade-gradient-${gradientId})`} />
        <path
          d="M23 16.5h14.8c7 0 12.7 5.7 12.7 12.7s-5.7 12.7-12.7 12.7H33.1v8.9c0 2.2-1.8 4-4 4s-4-1.8-4-4v-25.9c0-2.2 1.8-4 4-4Zm11.1 9.8H33.1v5.8h1.1c3.9 0 7-3.1 7-7s-3.1-7-7-7h-2.7c-2.2 0-4 1.8-4 4v15.9c0 2.2 1.8 4 4 4h2.7c3.9 0 7-3.1 7-7v-3.7Z"
          fill="#fff7ed"
        />
        <path
          d="M17 41.5h11.8l-2.6 6.7H13.9l3.1-6.7Zm6-18.8L20 29.8h6.8l-3 8.7h7.9l-8.1 15.4 2.7-10.5h-7.9l8.1-15.4Z"
          fill="#fff7ed"
          opacity="0.9"
        />
      </svg>

      <div className={`flex items-end ${textClassName}`}>
        <span className="text-lg font-black tracking-[-0.08em] text-slate-900 dark:text-white">E-</span>
        <span className="text-lg font-black tracking-[-0.08em] text-orange-500">Trade</span>
      </div>
    </div>
  );
}
