"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Skills Library", href: "/catalog" },
  { label: "What You Can Do", href: "#" },
  { label: "How to Use", href: "#" },
  { label: "Reviews", href: "#" },
  { label: "FAQ", href: "#" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-[#0d0d0d]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/catalog" className="flex items-center" aria-label="Home">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" fill="#f97316" />
            <path
              d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="#f97316"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-[#9ca3af] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-5 bg-white" />
          <span className="block h-0.5 w-5 bg-white" />
          <span className="block h-0.5 w-5 bg-white" />
        </button>
      </div>
    </nav>
  );
}
