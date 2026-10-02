import type { CSSProperties } from "react";
import BrandLogo from "./BrandLogo";

type LoadingAnimationProps = {
  title?: string;
  subtitle?: string;
  fullScreen?: boolean;
};

const pulseDelays: CSSProperties[] = [
  { animationDelay: "0s" },
  { animationDelay: "0.15s" },
  { animationDelay: "0.3s" },
  { animationDelay: "0.45s" },
];

const barHeights = ["h-6", "h-9", "h-7", "h-11", "h-8"];
const barDelays: CSSProperties[] = [
  { animationDelay: "0s" },
  { animationDelay: "0.12s" },
  { animationDelay: "0.24s" },
  { animationDelay: "0.36s" },
  { animationDelay: "0.48s" },
];

const LoadingAnimation = ({
  title = "Loading Dashboard",
  subtitle = "Preparing your latest data and insights...",
  fullScreen = true,
}: LoadingAnimationProps) => {
  return (
    <div
      className={`relative overflow-hidden bg-linear-to-br from-orange-50 via-white to-amber-100 ${
        fullScreen ? "min-h-screen" : "min-h-[60vh] rounded-3xl"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[inherit] w-full max-w-3xl items-center justify-center px-6 py-14">
        <section className="w-full rounded-3xl border border-orange-100 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mx-auto mb-6 w-fit rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-sm">
            <BrandLogo compact />
          </div>

          <div className="mb-6 flex items-end justify-center gap-1.5">
            {barHeights.map((height, index) => (
              <span
                key={`loader-bar-${height}-${index}`}
                style={barDelays[index]}
                className={`w-2 ${height} animate-bounce rounded-full bg-linear-to-t from-orange-500 to-amber-400`}
              />
            ))}
          </div>

          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">{subtitle}</p>

          <div className="mt-6 flex items-center justify-center gap-2">
            {pulseDelays.map((style, index) => (
              <span
                key={`loader-dot-${index}`}
                style={style}
                className="h-2.5 w-2.5 animate-pulse rounded-full bg-orange-500"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoadingAnimation;
