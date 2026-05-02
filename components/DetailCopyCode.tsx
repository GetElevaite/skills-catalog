"use client";

import { useState } from "react";

interface DetailCopyCodeProps {
  command: string;
}

export default function DetailCopyCode({ command }: DetailCopyCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      const el = document.createElement("textarea");
      el.value = command;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const short =
    command.length > 36 ? command.slice(0, 36) + "…" : command;

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2">
      <code className="truncate text-xs text-[#d1d5db]">{short}</code>
      <button
        onClick={handleCopy}
        aria-label="Copy install command"
        className="shrink-0 text-[#9ca3af] transition-colors hover:text-white"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
