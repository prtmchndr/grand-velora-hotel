"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  UserRound,
  LockKeyhole,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Username atau password salah.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Koneksi ke server gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] lg:grid lg:grid-cols-2">
      {/* Panel identitas hotel */}
      <section
        className="relative flex min-h-75 flex-col justify-between overflow-hidden bg-[#142039] bg-cover bg-center px-7 py-8 sm:px-12 sm:py-10 lg:min-h-screen lg:px-16 lg:py-14"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(13,25,46,.91), rgba(13,25,46,.66)), url('/images/hero/backgroundgv.png')",
        }}
      >
        <div className="absolute inset-0 border-b border-[#d4af6a]/30 lg:border-b-0 lg:border-r" />

        <div className="relative z-10">
          <img
            src="/images/logo/logogv.png"
            alt="Grand Velora Hotel"
            className="h-auto w-52 max-w-full object-contain object-left brightness-0 invert sm:w-60"
          />
        </div>

        <div className="relative z-10 my-12 max-w-xl lg:my-0">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d4af6a]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e1c27e]">
              Hotel Administration
            </span>
          </div>

          <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl xl:text-6xl">
            Welcome to
            <br />
            <span className="italic text-[#d4af6a]">
              Grand Velora
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-white/75 sm:text-base">
            Manage your hotel operations, reservations, and
            guest experiences through your dedicated
            administration portal.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#d4af6a]" />
            <span className="text-xs uppercase tracking-[0.22em] text-white/60">
              Excellence in Hospitality
            </span>
          </div>
        </div>

        <div className="relative z-10 hidden items-center justify-between border-t border-white/15 pt-5 text-xs text-white/55 sm:flex">
          <span>GRAND VELORA HOTEL</span>
          <span>PRIVATE ADMINISTRATION</span>
        </div>
      </section>

      {/* Panel login */}
      <section className="flex min-h-140 items-center justify-center bg-[#f8f7f3] px-5 py-12 sm:px-10 lg:min-h-screen lg:px-14">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-10">
            <div className="mb-3 h-1 w-12 bg-[#d4af6a]" />

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#b18b46]">
              GRAND VELORA HOTEL
            </p>

            <h2 className="font-serif text-3xl text-[#172033] sm:text-4xl">
              Login Admin
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#777b84]">
              Sign in to manage reservations and hotel
              operations.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#172033]"
              >
                Username
              </label>

              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#a3a3a3] transition-colors group-focus-within:text-[#b18b46]">
                  <UserRound size={19} strokeWidth={1.7} />
                </div>

                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  maxLength={100}
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-[#e3e0d8] bg-white py-4 pl-12 pr-4 text-sm text-[#172033] shadow-sm outline-none transition-all placeholder:text-[#a5a5a5] hover:border-[#c9b88f] focus:border-[#b99653] focus:ring-4 focus:ring-[#d4af6a]/10 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#172033]"
              >
                Password
              </label>

              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#a3a3a3] transition-colors group-focus-within:text-[#b18b46]">
                  <LockKeyhole size={19} strokeWidth={1.7} />
                </div>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  maxLength={200}
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-[#e3e0d8] bg-white py-4 pl-12 pr-14 text-sm text-[#172033] shadow-sm outline-none transition-all placeholder:text-[#a5a5a5] hover:border-[#c9b88f] focus:border-[#b99653] focus:ring-4 focus:ring-[#d4af6a]/10 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-[#929292] transition-colors hover:text-[#b18b46]"
                >
                  {showPassword ? (
                    <EyeOff size={19} strokeWidth={1.7} />
                  ) : (
                    <Eye size={19} strokeWidth={1.7} />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[#172033] px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md transition-all duration-300 hover:bg-[#243653] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>
                {loading ? "Signing In..." : "Sign In"}
              </span>

              {!loading && (
                <span className="text-[#d4af6a] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-9 border-t border-[#e5e1d8] pt-6">
            <div className="flex items-center justify-center gap-2 text-[#b18b46]">
              <span className="h-px w-7 bg-[#d4af6a]/70" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                Secure Administrator Access
              </span>
              <span className="h-px w-7 bg-[#d4af6a]/70" />
            </div>

            <p className="mt-4 text-center text-xs leading-6 text-[#85858a]">
              This portal is exclusively for authorized
              Grand Velora Hotel administrators.
            </p>
          </div>

          <p className="mt-10 text-center text-[11px] tracking-wide text-[#a0a0a0]">
            © {new Date().getFullYear()} Grand Velora Hotel.
            All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}