
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowUp,
} from "lucide-react";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "About Us", href: "#about" },
  { label: "Facilities", href: "#facilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 sm:px-8 lg:pt-20">
       <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Hotel Branding */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              className="inline-flex items-center rounded-sm bg-white px-3 py-2"
            >
              <Image
                src="/images/logo/logogv.png"
                alt="Grand Velora Hotel Logo"
                width={260}
                height={130}
                className="h-auto w-56 object-contain sm:w-60"
              />
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
              Experience refined comfort, elegant surroundings,
              and thoughtful hospitality at Grand Velora Hotel.
              A perfect destination for business and leisure.
            </p>

            <p className="mt-5 font-serif text-lg italic text-[#D4AF6A]">
              A refined stay, made for you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-xl text-white">
              Quick Links
            </h3>

            <div className="mb-5 h-px w-10 bg-[#C9A45C]" />

            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-[#D4AF6A]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-6 font-serif text-xl text-white">
              Contact Us
            </h3>

            <div className="mb-5 h-px w-10 bg-[#C9A45C]" />

            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin
                  size={19}
                  className="mt-1 shrink-0 text-[#D4AF6A]"
                  strokeWidth={1.5}
                />
                <p className="text-sm leading-7 text-white/55">
                  Cengkareng, Jakarta Barat,
                  Indonesia
                </p>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={18}
                  className="mt-1 shrink-0 text-[#D4AF6A]"
                  strokeWidth={1.5}
                />
                <a
                  href="tel:+622155558888"
                  className="text-sm text-white/55 transition hover:text-[#D4AF6A]"
                >
                  +62 21 5555 8888
                </a>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={18}
                  className="mt-1 shrink-0 text-[#D4AF6A]"
                  strokeWidth={1.5}
                />
                <a
                  href="mailto:info@grandvelora.com"
                  className="break-all text-sm text-white/55 transition hover:text-[#D4AF6A]"
                >
                  info@grandvelora.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="mb-6 font-serif text-xl text-white">
              Follow Us
            </h3>

            <div className="mb-5 h-px w-10 bg-[#C9A45C]" />

            <p className="text-sm leading-7 text-white/55">
              Stay connected with Grand Velora Hotel
              and discover more about our hospitality.
            </p>

            <div className="mt-6 flex gap-3">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/70 transition hover:border-[#C9A45C] hover:bg-[#C9A45C] hover:text-[#111827]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r=".5"
                    fill="currentColor"
                  />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/70 transition hover:border-[#C9A45C] hover:bg-[#C9A45C] hover:text-[#111827]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v1.9H7v3.1h2.8v8h3.7Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Gold Divider */}
        <div className="mt-14 h-px bg-linear-to-r from-transparent via-[#C9A45C]/60 to-transparent" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-white/40">
            © {new Date().getFullYear()} Grand Velora Hotel.
            All rights reserved.
          </p>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-white/55 transition hover:text-[#D4AF6A]"
          >
            Back to Top
            <span className="flex h-8 w-8 items-center justify-center border border-white/15 transition group-hover:border-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#111827]">
              <ArrowUp size={15} />
            </span>
          </a>
        </div>

        {/* Penutup Main Footer */}
      </div>
    </footer>
  );
}