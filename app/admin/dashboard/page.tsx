"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "../adminheader";
import {
  LayoutDashboard,
  CalendarDays,
  BedDouble,
  Users,
  ArrowUpRight,
  Clock3,
  UserCheck,
  RefreshCw,
  Hotel,
  ChevronRight,
  Sparkles,
  TrendingUp,
  CalendarCheck,
} from "lucide-react";

interface DashboardStats {
  totalReservations: number;
  pendingReservations: number;
  checkedInReservations: number;
  totalRooms: number;
  availableRooms: number;
  totalGuests: number;
}

const initialStats: DashboardStats = {
  totalReservations: 0,
  pendingReservations: 0,
  checkedInReservations: 0,
  totalRooms: 0,
  availableRooms: 0,
  totalGuests: 0,
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/dashboard", {
        method: "GET",
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to load dashboard data."
        );
      }

      setStats(result.stats);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const occupiedRooms = Math.max(
    0,
    stats.totalRooms - stats.availableRooms
  );

  const occupancyRate =
    stats.totalRooms > 0
      ? Math.round((occupiedRooms / stats.totalRooms) * 100)
      : 0;

  const statCards = [
    {
      title: "Total Reservations",
      value: stats.totalReservations,
      description: "All recorded bookings",
      icon: CalendarDays,
      accent: "text-[#b18b46]",
      iconBg: "bg-[#EAF0F5]",
    },
    {
      title: "Available Rooms",
      value: `${stats.availableRooms} / ${stats.totalRooms}`,
      description: "Rooms currently available",
      icon: BedDouble,
      accent: "text-[#64836b]",
      iconBg: "bg-[#edf3ed]",
    },
    {
      title: "Total Guests",
      value: stats.totalGuests,
      description: "Unique guest contact numbers",
      icon: Users,
      accent: "text-[#657ba5]",
      iconBg: "bg-[#EAF0F5]",
    },
    {
      title: "Pending Reservations",
      value: stats.pendingReservations,
      description: "Awaiting hotel confirmation",
      icon: Clock3,
      accent: "text-[#b9822e]",
      iconBg: "bg-[#EAF0F5]",
    },
    {
      title: "Checked-in",
      value: stats.checkedInReservations,
      description: "Current checked-in reservations",
      icon: UserCheck,
      accent: "text-[#568266]",
      iconBg: "bg-[#edf4ef]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#EAF0F5] text-[#172033]">
      {/* Shared Grand Velora admin header */}
      <AdminHeader />

      <div className="mx-auto w-full max-w-7xl px-5 pb-10 pt-7 sm:px-8 lg:pt-9">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#85858a]">
          <Hotel size={14} className="text-[#b18b46]" />
          <span>Administration</span>
          <ChevronRight size={13} />
          <span className="font-medium text-[#172033]">
            Dashboard
          </span>
        </div>

        {/* Luxury welcome banner */}
        <section className="relative mb-9 overflow-hidden rounded-2xl bg-[#172033] shadow-[0_12px_35px_rgba(23,32,51,0.12)]">
          {/* Decorative gold accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full border border-[#d4af6a]/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-16 h-64 w-64 rounded-full border border-[#d4af6a]/15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 right-44 h-56 w-56 rounded-full border border-[#d4af6a]/10"
          />

          <div className="relative z-10 flex flex-col justify-between gap-7 px-6 py-8 sm:px-9 sm:py-10 lg:flex-row lg:items-center lg:px-11">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af6a]/35 bg-white/4 px-3 py-1.5">
                <Sparkles size={13} className="text-[#d4af6a]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#e1c58e]">
                  Grand Velora Hotel
                </span>
              </div>

              <h1 className="font-serif text-3xl leading-tight text-[#fffdf8] sm:text-4xl lg:text-[46px]">
                Welcome, Administrator
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#d0d3da]">
                A refined overview of your hotel operations.
                Manage reservations, monitor room availability,
                and keep guest services running smoothly.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/admin/reservations"
                  className="inline-flex items-center gap-2 rounded-md bg-[#d4af6a] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#172033] transition hover:bg-[#e3c487]"
                >
                  Manage Reservations
                  <ArrowUpRight size={15} />
                </Link>

                <button
                  type="button"
                  onClick={fetchDashboardStats}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:border-[#d4af6a]/70 hover:bg-white/6 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw
                    size={14}
                    className={loading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
              </div>
            </div>

            {/* Banner side information */}
            <div className="hidden min-w-52.5 border-l border-[#d4af6a]/30 pl-8 lg:block">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#d4af6a]">
                Hotel Administration
              </p>
              <p className="mt-3 font-serif text-2xl text-white">
                Excellence
              </p>
              <p className="mt-1 font-serif text-2xl italic text-[#d4af6a]">
                in Hospitality
              </p>
              <div className="mt-5 h-px w-16 bg-[#d4af6a]/70" />
              <p className="mt-3 text-[10px] tracking-wide text-[#c5c9d0]">
                Manage with elegance.
              </p>
            </div>
          </div>
        </section>

        {/* Error notice */}
        {error && (
          <div
            role="alert"
            className="mb-7 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={fetchDashboardStats}
              className="font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        {/* Overview section heading */}
        <section className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#b18b46]">
              <LayoutDashboard size={14} />
              Management Overview
            </div>
            <h2 className="font-serif text-2xl text-[#172033] sm:text-[28px]">
              Hotel at a Glance
            </h2>
            <p className="mt-1.5 text-xs text-[#85858a]">
              A summary of your current reservations and hotel activity.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D7E2EC] bg-white px-3 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#568266] opacity-30" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#568266]" />
            </span>
            <span className="text-[10px] font-medium text-[#777b84]">
              {loading ? "Updating data" : "Dashboard data loaded"}
            </span>
          </div>
        </section>

        {/* Statistics cards */}
        <section
          aria-label="Hotel statistics"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-xl border border-[#D7E2EC] bg-white p-5 shadow-[0_3px_12px_rgba(23,32,51,0.025)] transition duration-300 hover:-translate-y-1 hover:border-[#d4af6a]/60 hover:shadow-[0_12px_28px_rgba(23,32,51,0.07)] sm:p-6"
              >
                <div className="absolute left-0 top-0 h-0.5 w-0 bg-[#d4af6a] transition-all duration-300 group-hover:w-full" />

                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg ${card.iconBg} ${card.accent}`}
                  >
                    <Icon size={20} strokeWidth={1.65} />
                  </div>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-[#b18b46] transition group-hover:bg-[#EAF0F5]">
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#85858a]">
                    {card.title}
                  </p>

                  <p className="mt-2 font-serif text-3xl tabular-nums text-[#172033]">
                    {loading ? "—" : card.value}
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-[#999ba1]">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </section>

        {/* Room occupancy and reservation status */}
        <section className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* Occupancy card */}
          <article className="rounded-xl border border-[#D7E2EC] bg-white p-6 shadow-[0_3px_12px_rgba(23,32,51,0.025)] lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#b18b46]">
                  Room Status
                </div>
                <h2 className="font-serif text-xl text-[#172033]">
                  Room Occupancy
                </h2>
                <p className="mt-1 text-xs text-[#85858a]">
                  Current room availability overview.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF0F5] text-[#b18b46]">
                <Hotel size={19} strokeWidth={1.6} />
              </div>
            </div>

            <div className="mt-7 flex items-end justify-between gap-3">
              <div>
                <p className="font-serif text-4xl tabular-nums text-[#172033]">
                  {loading ? "—" : `${occupancyRate}%`}
                </p>
                <p className="mt-1 text-[10px] text-[#85858a]">
                  Occupied room ratio
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold tabular-nums text-[#172033]">
                  {loading
                    ? "—"
                    : `${occupiedRooms} / ${stats.totalRooms}`}
                </p>
                <p className="mt-1 text-[10px] text-[#85858a]">
                  Occupied / total rooms
                </p>
              </div>
            </div>

            <div
              className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#D7E2EC]"
              role="progressbar"
              aria-label="Room occupancy"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={loading ? 0 : occupancyRate}
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-[#b18b46] to-[#dfc184] transition-all duration-700"
                style={{
                  width: loading ? "0%" : `${occupancyRate}%`,
                }}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-[#EAF0F5] p-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#b18b46]" />
                  <span className="text-[10px] text-[#777b84]">
                    Occupied
                  </span>
                </div>
                <p className="mt-2 font-serif text-xl tabular-nums text-[#172033]">
                  {loading ? "—" : occupiedRooms}
                </p>
              </div>

              <div className="rounded-lg bg-[#f4f7f3] p-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#568266]" />
                  <span className="text-[10px] text-[#777b84]">
                    Available
                  </span>
                </div>
                <p className="mt-2 font-serif text-xl tabular-nums text-[#172033]">
                  {loading ? "—" : stats.availableRooms}
                </p>
              </div>
            </div>
          </article>

          {/* Reservation status panel */}
          <article className="rounded-xl border border-[#D7E2EC] bg-white p-6 shadow-[0_3px_12px_rgba(23,32,51,0.025)] lg:col-span-3">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#b18b46]">
                  Guest Services
                </div>
                <h2 className="font-serif text-xl text-[#172033]">
                  Reservation Overview
                </h2>
                <p className="mt-1 text-xs text-[#85858a]">
                  Monitor booking progress and guest arrivals.
                </p>
              </div>

              <Link
                href="/admin/reservations"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[#d4af6a] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8d6a2e] transition hover:bg-[#EAF0F5]"
              >
                View All
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="mt-6 divide-y divide-[#D7E2EC]">
              <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF0F5] text-[#b9822e]">
                    <Clock3 size={18} strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#172033]">
                      Pending Reservations
                    </p>
                    <p className="mt-1 text-[10px] text-[#85858a]">
                      Bookings awaiting confirmation
                    </p>
                  </div>
                </div>

                <span className="min-w-9 rounded-full bg-[#EAF0F5] px-3 py-1.5 text-center text-xs font-semibold tabular-nums text-[#a67527]">
                  {loading ? "—" : stats.pendingReservations}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf4ef] text-[#568266]">
                    <CalendarCheck size={18} strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#172033]">
                      Checked-in Guests
                    </p>
                    <p className="mt-1 text-[10px] text-[#85858a]">
                      Reservations currently checked in
                    </p>
                  </div>
                </div>

                <span className="min-w-9 rounded-full bg-[#edf4ef] px-3 py-1.5 text-center text-xs font-semibold tabular-nums text-[#568266]">
                  {loading ? "—" : stats.checkedInReservations}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF0F5] text-[#657ba5]">
                    <TrendingUp size={18} strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#172033]">
                      Total Reservations
                    </p>
                    <p className="mt-1 text-[10px] text-[#85858a]">
                      All bookings recorded in the system
                    </p>
                  </div>
                </div>

                <span className="min-w-9 rounded-full bg-[#EAF0F5] px-3 py-1.5 text-center text-xs font-semibold tabular-nums text-[#657ba5]">
                  {loading ? "—" : stats.totalReservations}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-[#172033] px-4 py-4 sm:px-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4af6a]/40 bg-[#d4af6a]/10 text-[#d4af6a]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">
                      Delivering exceptional hospitality
                    </p>
                    <p className="mt-1 text-[10px] text-[#c5c9d0]">
                      Manage guest bookings from one place.
                    </p>
                  </div>
                </div>

                <Link
                  href="/admin/reservations"
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#e1c58e] transition hover:text-white"
                >
                  Open Management
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        </section>

        {/* Footer */}
        <footer className="mt-9 flex flex-col items-center justify-between gap-3 border-t border-[#D7E2EC] py-6 text-center text-[10px] text-[#999ba1] sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Grand Velora Hotel.
            All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="font-serif text-sm text-[#b18b46]">
              GV
            </span>
            <span className="uppercase tracking-[0.16em]">
              Hotel Administration
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}