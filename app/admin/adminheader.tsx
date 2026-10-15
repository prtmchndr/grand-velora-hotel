"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import Image from "next/image";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Reservations", href: "/admin/reservations" },
  ];

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#e8e3d9] bg-white">
      <div className="mx-auto flex min-h-20.5 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">

        <div className="flex items-center gap-3">
        {/* Grand Velora Logo */}
        <div className="relative h-14 w-14 shrink-0">
            <Image
            src="/images/logo/logogv1.png"
            alt="Grand Velora Hotel Logo"
            fill
            priority
            sizes="56px"
            className="object-contain"
            />
        </div>

        {/* Hotel Brand */}
        <div>
            <h1 className="font-serif text-lg leading-tight text-[#172033]">
            Grand Velora
            </h1>
            <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#b18b46]">
            Hotel Administration
            </p>
        </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-4 py-2.5 text-xs font-semibold transition ${
                  active
                    ? "bg-[#EAF0F5] text-[#a17b38]"
                    : "text-[#777b84] hover:bg-[#faf9f6] hover:text-[#172033]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="hidden items-center gap-2 rounded-md border border-[#e5e1d8] px-4 py-2.5 text-xs font-semibold text-[#172033] transition hover:border-[#d4af6a] hover:text-[#a17b38] disabled:opacity-50 md:flex"
        >
          <LogOut size={15} />
          {loggingOut ? "Signing out..." : "Logout"}
        </button>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          className="rounded-md border border-[#e8e3d9] p-2 text-[#172033] md:hidden"
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-[#e8e3d9] bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-md px-4 py-3 text-sm font-medium ${
                    active
                      ? "bg-[#EAF0F5] text-[#a17b38]"
                      : "text-[#777b84] hover:bg-[#faf9f6]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="mt-2 flex items-center gap-2 rounded-md border border-[#e8e3d9] px-4 py-3 text-left text-sm font-medium text-[#172033] disabled:opacity-50"
            >
              <LogOut size={16} />
              {loggingOut ? "Signing out..." : "Logout"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}