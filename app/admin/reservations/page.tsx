"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useRouter } from "next/navigation";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  DoorOpen,
  Eye,
  LogIn,
  LogOut,
  Phone,
  RefreshCw,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";

import AdminHeader from "../adminheader";

type Reservation = {
  id: number;
  ref_no: string;
  room_id: number;
  name: string;
  contact_no: string;
  date_in: string;
  date_out: string;
  status: number;
  date_updated: string;
};

type Notice = {
  message: string;
  type: "success" | "error";
};

const statusLabels: Record<number, string> = {
  0: "Pending",
  1: "Checked-in",
  2: "Checked-out",
};

function formatDate(value: string) {
  if (!value) return "-";
  const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const date = dateOnly
    ? new Date(
        Number(dateOnly[1]),
        Number(dateOnly[2]) - 1,
        Number(dateOnly[3])
      )
    : new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function StatusBadge({ status }: { status: number }) {
  const styles: Record<number, string> = {
    0: "border-amber-200 bg-amber-50 text-amber-700",
    1: "border-emerald-200 bg-emerald-50 text-emerald-700",
    2: "border-slate-200 bg-slate-100 text-slate-600",
  };
  const icons: Record<number, ReactNode> = {
    0: <Clock3 size={13} />,
    1: <LogIn size={13} />,
    2: <CheckCircle2 size={13} />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        styles[status] ?? styles[0]
      }`}
    >
      {icons[status] ?? icons[0]}
      {statusLabels[status] ?? "Unknown"}
    </span>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon,
  accent,
}: {
  title: string;
  value: number;
  description: string;
  icon: ReactNode;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-[#D7E2EC] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#172033]">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function DetailField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#D7E2EC] p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <div className="mt-2 text-sm font-semibold text-[#172033]">
        {children}
      </div>
    </div>
  );
}

export default function ReservationsPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notice, setNotice] = useState<Notice | null>(null);
  const [updatingRef, setUpdatingRef] = useState<string | null>(null);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const fetchReservations = useCallback(
    async (showRefresh = false) => {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      try {
        const response = await fetch("/api/admin/reservations", {
          method: "GET",
          cache: "no-store",
        });
        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result.message || "Gagal mengambil data reservasi."
          );
        }
        setReservations(
          Array.isArray(result.data) ? result.data : []
        );
      } catch (error) {
        setNotice({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Terjadi kesalahan saat mengambil data.",
        });
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [router]
  );
  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);
  const filteredReservations = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return reservations.filter((reservation) => {
      const matchesSearch =
        !keyword ||
        reservation.ref_no?.toLowerCase().includes(keyword) ||
        reservation.name?.toLowerCase().includes(keyword) ||
        reservation.contact_no?.toLowerCase().includes(keyword);
      const matchesStatus =
        statusFilter === "all" ||
        String(reservation.status) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, statusFilter]);
  // Ringkasan dihitung berdasarkan nomor referensi unik.
  const summary = useMemo(() => {
    const uniqueReservations = Array.from(
      new Map(
        reservations.map((reservation) => [
          reservation.ref_no,
          reservation,
        ])
      ).values()
    );
    return {
      total: uniqueReservations.length,
      pending: uniqueReservations.filter(
        (item) => item.status === 0
      ).length,
      checkedIn: uniqueReservations.filter(
        (item) => item.status === 1
      ).length,
      checkedOut: uniqueReservations.filter(
        (item) => item.status === 2
      ).length,
    };
  }, [reservations]);
  const updateStatus = async (
    refNo: string,
    status: number
  ) => {
    const action = status === 1 ? "check-in" : "check-out";
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin memproses ${action} untuk reservasi ${refNo}?`
    );
    if (!confirmed) return;
    setUpdatingRef(refNo);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/reservations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refNo, status }),
      });
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || `Gagal memproses ${action}.`
        );
      }
      setNotice({
        type: "success",
        message:
          result.message ||
          "Status reservasi berhasil diperbarui.",
      });
      await fetchReservations(true);
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat memperbarui status.",
      });
    } finally {
      setUpdatingRef(null);
    }
  };
  return (
    <main className="min-h-screen bg-[#EAF0F5] text-[#172033]">
      <AdminHeader />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
          <span>Administration</span>
          <span className="text-[#b18b46]">/</span>
          <span className="font-semibold text-[#172033]">
            Reservations
          </span>
        </div>
        {/* Page Heading */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-[#172033] p-6 text-white shadow-lg sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-[#d4af6a]/20" />
          <div className="pointer-events-none absolute -right-5 -top-12 h-52 w-52 rounded-full border border-[#d4af6a]/20" />
          <div className="pointer-events-none absolute bottom-0 right-24 h-36 w-36 rounded-full bg-[#d4af6a]/5 blur-2xl" />
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d4af6a]/30 bg-[#d4af6a]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#e8cb8e]">
                <CalendarDays size={14} />
                Reservation Administration
              </div>
              <h1 className="font-serif text-3xl font-semibold tracking-wide sm:text-4xl">
                Reservation Management
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Kelola reservasi tamu, pantau status pemesanan,
                dan proses check-in maupun check-out Grand
                Velora Hotel.
              </p>
            </div>
            <button
              type="button"
              onClick={() => fetchReservations(true)}
              disabled={refreshing || loading}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#d4af6a]/50 bg-[#d4af6a] px-5 py-3 text-sm font-semibold text-[#172033] transition hover:bg-[#e3c17d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              {refreshing ? "Memuat..." : "Refresh Data"}
            </button>
          </div>
        </section>
        {/* Notification */}
        {notice && (
          <div
            role="status"
            className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
              notice.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {notice.type === "success" ? (
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />
            ) : (
              <Clock3
                size={18}
                className="mt-0.5 shrink-0"
              />
            )}
            <p>{notice.message}</p>
          </div>
        )}
        {/* Summary Cards */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Reservations"
            value={summary.total}
            description="Total nomor referensi reservasi"
            icon={<CalendarDays size={21} />}
            accent="bg-[#EAF0F5] text-[#172033]"
          />
          <SummaryCard
            title="Pending"
            value={summary.pending}
            description="Menunggu proses check-in"
            icon={<Clock3 size={21} />}
            accent="bg-amber-50 text-amber-600"
          />
          <SummaryCard
            title="Checked-in"
            value={summary.checkedIn}
            description="Tamu sedang menginap"
            icon={<LogIn size={21} />}
            accent="bg-emerald-50 text-emerald-600"
          />
          <SummaryCard
            title="Checked-out"
            value={summary.checkedOut}
            description="Reservasi telah selesai"
            icon={<LogOut size={21} />}
            accent="bg-slate-100 text-slate-600"
          />
        </section>
        {/* Reservation List */}
        <section className="overflow-hidden rounded-2xl border border-[#D7E2EC] bg-white shadow-sm">
          {/* Search and Filter */}
          <div className="border-b border-[#D7E2EC] px-5 py-5 sm:px-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#172033]">
                  Reservation List
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Daftar reservasi dan status pemesanan kamar.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <div className="relative min-w-0 flex-1 sm:min-w-65">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Cari nama, kontak, atau kode..."
                    className="w-full rounded-xl border border-slate-200 bg-[#EAF0F5] py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#b18b46] focus:ring-2 focus:ring-[#d4af6a]/20"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="rounded-xl border border-slate-200 bg-[#EAF0F5] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#b18b46] focus:ring-2 focus:ring-[#d4af6a]/20"
                  aria-label="Filter status reservasi"
                >
                  <option value="all">Semua Status</option>
                  <option value="0">Pending</option>
                  <option value="1">Checked-in</option>
                  <option value="2">Checked-out</option>
                </select>
              </div>
            </div>
            {/* Data Count */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>
                Menampilkan{" "}
                <strong className="text-[#172033]">
                  {filteredReservations.length}
                </strong>{" "}
                dari{" "}
                <strong className="text-[#172033]">
                  {reservations.length}
                </strong>{" "}
                baris data
              </span>
              <span className="hidden items-center gap-1 sm:inline-flex">
                <Users size={14} />
                Data tamu
              </span>
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-262.5 border-collapse text-left">
              <thead>
                <tr className="bg-[#EAF0F5] text-[11px] uppercase tracking-[0.12em] text-slate-500">
                  <th className="px-5 py-4 font-semibold">
                    Guest / Reference
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Contact
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Room
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Check-in
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Check-out
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Status
                  </th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ede6]">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-16 text-center text-sm text-slate-500"
                    >
                      <RefreshCw
                        size={22}
                        className="mx-auto mb-3 animate-spin text-[#b18b46]"
                      />
                      Memuat data reservasi...
                    </td>
                  </tr>
                ) : filteredReservations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-16 text-center"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0F5] text-slate-400">
                        <CalendarDays size={22} />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[#172033]">
                        Tidak ada reservasi ditemukan
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Coba ubah kata kunci pencarian atau
                        filter status.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((reservation) => {
                    const isUpdating =
                      updatingRef === reservation.ref_no;
                    return (
                      <tr
                        key={reservation.id}
                        className="transition hover:bg-[#EAF0F5]"
                      >
                        {/* Guest and Reference */}
                        <td className="px-5 py-4">
                          <p className="font-semibold text-[#172033]">
                            {reservation.name}
                          </p>
                          <p className="mt-1 text-xs font-medium text-[#a17b37]">
                            {reservation.ref_no}
                          </p>
                        </td>
                        {/* Contact */}
                        <td className="px-5 py-4">
                          <p className="text-sm text-slate-600">
                            {reservation.contact_no || "-"}
                          </p>
                        </td>
                        {/* Room */}
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-2 text-sm text-slate-600">
                            <DoorOpen
                              size={15}
                              className="text-[#b18b46]"
                            />
                            Room #{reservation.room_id}
                          </span>
                        </td>
                        {/* Check-in Date */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatDate(reservation.date_in)}
                        </td>
                        {/* Check-out Date */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatDate(reservation.date_out)}
                        </td>
                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge
                            status={reservation.status}
                          />
                        </td>
                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Detail Button */}
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedReservation(reservation)
                              }
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#d4af6a] bg-[#EAF0F5] px-3 py-2 text-xs font-semibold text-[#987438] transition hover:bg-[#D7E2EC]"
                            >
                              <Eye size={14} />
                              Detail
                            </button>
                            {/* Check-in / Check-out */}
                            {reservation.status === 0 ? (
                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(
                                    reservation.ref_no,
                                    1
                                  )
                                }
                                disabled={updatingRef !== null}
                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#172033] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#263653] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <LogIn size={14} />
                                {isUpdating
                                  ? "Memproses..."
                                  : "Check-in"}
                              </button>
                            ) : reservation.status === 1 ? (
                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(
                                    reservation.ref_no,
                                    2
                                  )
                                }
                                disabled={updatingRef !== null}
                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#b18b46] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#987438] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <LogOut size={14} />
                                {isUpdating
                                  ? "Memproses..."
                                  : "Check-out"}
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
                                <CheckCircle2 size={14} />
                                Selesai
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {/* Table Footer */}
          <div className="flex flex-col justify-between gap-2 border-t border-[#D7E2EC] bg-[#EAF0F5] px-5 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6">
            <span>
              Terakhir diperbarui:{" "}
              {reservations.length > 0
                ? formatDateTime(
                    reservations.reduce((latest, item) =>
                      new Date(item.date_updated) >
                      new Date(latest.date_updated)
                        ? item
                        : latest
                    ).date_updated
                  )
                : "-"}
            </span>
            <span>Grand Velora Hotel · Administration</span>
          </div>
        </section>
        {/* Reservation Detail Modal */}
        {selectedReservation && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#101827]/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedReservation(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="reservation-detail-title"
              className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative overflow-hidden bg-[#172033] px-6 py-6 text-white sm:px-8">
                <div className="pointer-events-none absolute -right-10 -top-20 h-52 w-52 rounded-full border border-[#d4af6a]/20" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e8cb8e]">
                      <CalendarDays size={15} />
                      Reservation Information
                    </div>
                    <h2
                      id="reservation-detail-title"
                      className="font-serif text-2xl font-semibold sm:text-3xl"
                    >
                      Detail Reservasi
                    </h2>
                    <p className="mt-2 text-sm text-slate-300">
                      Informasi pemesanan tamu Grand Velora
                      Hotel.
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Tutup detail reservasi"
                    onClick={() =>
                      setSelectedReservation(null)
                    }
                    className="relative rounded-lg border border-white/20 p-2 text-white transition hover:bg-white/10"
                  >
                    <X size={19} />
                  </button>
                </div>
              </div>
              {/* Modal Body */}
              <div className="max-h-[70vh] space-y-6 overflow-y-auto px-6 py-6 sm:px-8">
                {/* Reference */}
                <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#D7E2EC] bg-[#EAF0F5] p-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Reservation Reference
                    </p>
                    <p className="mt-1 break-all text-lg font-bold text-[#a17b37]">
                      {selectedReservation.ref_no}
                    </p>
                  </div>
                  <div>
                    <StatusBadge
                      status={selectedReservation.status}
                    />
                  </div>
                </div>
                {/* Guest Information */}
                <div>
                  <div className="mb-4 flex items-center gap-2 border-b border-[#D7E2EC] pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF0F5] text-[#a17b37]">
                      <UserRound size={18} />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#172033]">
                      Informasi Tamu
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <DetailField label="Nama Tamu">
                      {selectedReservation.name || "-"}
                    </DetailField>
                    <DetailField label="Nomor Kontak">
                      <span className="inline-flex items-center gap-2">
                        <Phone
                          size={15}
                          className="text-[#b18b46]"
                        />
                        {selectedReservation.contact_no || "-"}
                      </span>
                    </DetailField>
                  </div>
                </div>
                {/* Stay Information */}
                <div>
                  <div className="mb-4 flex items-center gap-2 border-b border-[#D7E2EC] pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF0F5] text-[#a17b37]">
                      <DoorOpen size={18} />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#172033]">
                      Detail Menginap
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <DetailField label="Nomor Kamar">
                      Room #{selectedReservation.room_id}
                    </DetailField>
                    <DetailField label="Status Reservasi">
                      <StatusBadge
                        status={selectedReservation.status}
                      />
                    </DetailField>
                    <DetailField label="Tanggal Check-in">
                      {formatDate(selectedReservation.date_in)}
                    </DetailField>
                    <DetailField label="Tanggal Check-out">
                      {formatDate(selectedReservation.date_out)}
                    </DetailField>
                  </div>
                </div>
                {/* Updated */}
                <div className="rounded-xl bg-[#EAF0F5] px-4 py-3">
                  <p className="text-xs text-slate-500">
                    Terakhir diperbarui
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#172033]">
                    {formatDateTime(
                      selectedReservation.date_updated
                    )}
                  </p>
                </div>
              </div>
              {/* Modal Footer */}
              <div className="flex justify-end border-t border-[#D7E2EC] bg-[#EAF0F5] px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedReservation(null)
                  }
                  className="rounded-xl bg-[#172033] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263653]"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Page Footer */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#D7E2EC] py-5 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Grand Velora Hotel.
            All rights reserved.
          </p>
          <p className="font-medium tracking-wide text-[#a17b37]">
            ELEGANCE · COMFORT · HOSPITALITY
          </p>
        </footer>
      </div>
    </main>
  );
}
