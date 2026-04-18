"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 ">
      {/* Top Gradient Line */}
      <div className="h-0.5 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div className="space-y-4">
          <Image
            src="/image/logo.png"
            width={200}
            height={200}
            alt="Logo"
            className="h-10 w-auto"
          />

          <p className="text-sm text-slate-400 leading-relaxed">
            Modern digital platform built for speed, security, and scalability.
            Manage your business with confidence.
          </p>

          <div className="flex gap-4 text-lg">
            <a className="hover:text-white transition">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a className="hover:text-white transition">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a className="hover:text-white transition">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a className="hover:text-white transition">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Features
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition">
                Integrations
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition">
                Updates
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-sm text-slate-400">
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-indigo-400"></i>
              support@example.com
            </p>

            <p className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-indigo-400"></i>
              +95 123 456 789
            </p>

            <p className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-indigo-400"></i>
              Yangon, Myanmar
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <p>© 2016 - 2026 BEE Data Myanmar. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white">
              Terms
            </Link>
            <Link href="/" className="hover:text-white">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
