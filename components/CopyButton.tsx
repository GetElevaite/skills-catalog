"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: "primary" | "ghost";
  className?: string;
}

export default function CopyButton({
  text,
  label = "Copy Prompt",
  variant = "primary",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const base =
    "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all";
  const styles =
    variant === "primary"
      ? "bg-[#f97316] text-white hover:bg-[#ea6c0a] active:scale-[0.98]"
      : "border border-[#2a2a2a] bg-[#1a1a1a] text-white hover:border-[#3a3a3a] active:scale-[0.98]";

  return (
    <>
      <button onClick={handleCopy} className={`${base} ${styles} ${className}`}>
        {copied ? (
          <>
            <CheckIcon />
            Copied!
          </>
        ) : (
          <>
            {variant === "primary" ? <CopyIcon /> : <DownloadIcon />}
            {label}
          </>
        )}
      </button>

      {copied && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-2.5 text-sm text-white shadow-xl animate-fade-in">
          Copied to clipboard!
        </div>
      )}
    </>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
