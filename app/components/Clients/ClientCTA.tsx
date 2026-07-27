"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ClientCTA() {
  return (
    <section className="bg-white px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[var(--brand-navy)] px-6 py-14 text-white shadow-[0_35px_90px_-45px_rgba(15,23,42,0.75)] sm:px-10 md:py-16 lg:px-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(37,99,235,0.35),transparent_35%),radial-gradient(circle_at_10%_100%,rgba(225,29,72,0.16),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_left,black,transparent_70%)]" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur">
              <CheckCircle2 className="h-4 w-4" />
              Engineering partnerships that perform
            </div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Your next critical project deserves a proven partner.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Bring us your technical challenge. Our team will respond with a
              clear path from engineering to safe, dependable delivery.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-red-600 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Explore our work
            </Link>
          </div>
        </div>

        <div className="relative mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:gap-8">
          <a
            href="mailto:info@sigma-royal.com"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Mail className="h-4 w-4 text-blue-400" />
            info@sigma-royal.com
          </a>
          <a
            href="tel:+8802222281246"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Phone className="h-4 w-4 text-blue-400" />
            +88 02 222281246
          </a>
          <span className="sm:ml-auto">Dhaka, Bangladesh</span>
        </div>
      </motion.div>
    </section>
  );
}
