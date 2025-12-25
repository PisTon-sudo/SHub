// src/components/ProviderCard.jsx
import React, { useEffect, useRef } from "react";
import { providers } from "../data/providers";

export default function ProviderCard({ providerId }) {
  const containerRef = useRef(null);
  const p = providers.find((x) => x.id === providerId);
  if (!p) return null;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollAndFocus = (el) => {
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
    el.focus({ preventScroll: true });
    el.classList.add("ring-4", "ring-blue-300", "dark:ring-blue-900");
    setTimeout(() => {
      el.classList.remove("ring-4", "ring-blue-300", "dark:ring-blue-900");
    }, 1100);
  };

  // When providerId prop changes, scroll to this card
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const t = setTimeout(() => scrollAndFocus(el), 60);
    return () => clearTimeout(t);
  }, [providerId]);

  // Listen for global provider-selected events
  useEffect(() => {
    const handler = (e) => {
      const selectedId = e?.detail?.providerId;
      if (selectedId === providerId) {
        scrollAndFocus(containerRef.current);
        try {
          history.replaceState(null, "", `#provider-${providerId}`);
        } catch {}
      }
    };
    window.addEventListener("provider-selected", handler);
    return () => window.removeEventListener("provider-selected", handler);
  }, [providerId]);

  // Respond to hash on mount and hashchange
  useEffect(() => {
    const checkHash = () => {
      const hash = (location.hash || "").replace("#", "");
      if (hash === `provider-${providerId}`) {
        scrollAndFocus(containerRef.current);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [providerId]);

  return (
    <aside
      ref={containerRef}
      id={`provider-${providerId}`}
      tabIndex={-1}
      role="region"
      aria-labelledby={`provider-title-${providerId}`}
      className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-[1.5rem] p-5 shadow sticky top-24 focus:outline-none"
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-2 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-400 shadow-lg flex items-center justify-center`}
          aria-hidden="true"
        >
          <img
            src={p.avatar}
            alt=""
            className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 id={`provider-title-${providerId}`} className="text-lg font-black truncate dark:text-white">
              {p.name}
            </h3>
            {p.verified && <span className="text-xs text-blue-600 font-semibold" aria-hidden="true">✔</span>}
          </div>

          <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-white">⭐ {p.rating}</span>
            <span className="mx-2">•</span>
            <span>{p.jobs} jobs</span>
          </div>

          {p.location && (
            <div className="mt-2 text-xs text-slate-400 dark:text-slate-500 truncate">
              {p.location}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-auth", { detail: { mode: "contact", providerId } }))
          }
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-transparent text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={`Contact ${p.name}`}
        >
          Contact
        </button>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("open-book", { detail: { providerId } }))}
          className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Book ${p.name}`}
        >
          Book Now
        </button>
      </div>

      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Response time</span>
          <span>{p.responseTime || "—"}</span>
        </div>

        {p.skills && (
          <div className="mt-2">
            <div className="text-[10px] uppercase tracking-widest text-slate-400">Skills</div>
            <div className="mt-1 flex flex-wrap gap-2">
              {p.skills.slice(0, 6).map((s) => (
                <span key={s} className="text-[11px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
