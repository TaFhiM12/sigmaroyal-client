"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Factory,
  Flame,
  Gauge,
  Zap,
} from "lucide-react";
import yearsExperience from "@/lib/yearsExperience";

const capabilities = [
  {
    icon: Flame,
    title: "Oil & Gas",
    text: "Cross-country pipelines, CGS, RMS, DRS, HDD crossings and metering systems.",
  },
  {
    icon: Zap,
    title: "Power",
    text: "Piping, tanks, mechanical and electrical equipment, SCADA and PLC systems.",
  },
  {
    icon: Factory,
    title: "Process Plants",
    text: "Engineering and construction for refineries, fertilizer and petrochemical facilities.",
  },
  {
    icon: Gauge,
    title: "LPG & SNG",
    text: "Storage, dispensing, reticulation, spherical and bullet tank infrastructure.",
  },
];

const proofPoints = [
  "100 MMSCFD City Gate Station for Titas Gas at JEZ",
  '30-inch natural gas transmission pipeline at Padma Bridge',
  "162 MMSCFD RMS for Reliance Power Plant",
  "Three turnkey DRS stations for PGCL",
];

export default function PrefaceContent() {
  return (
    <div className="bg-white text-[var(--brand-navy)]">
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">
                <span className="h-px w-9 bg-red-600" />
                Company in 60 seconds
              </div>
              <h2 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.07] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                A trusted engineering partner
                <span className="block text-red-600">since 1977.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-[var(--brand-muted)] md:text-lg">
                The Royal Utilisation Services (Pvt.) Ltd., together with Sigma
                Construction Company, develops critical infrastructure for
                Bangladesh&apos;s oil, gas, power, process, LPG and SNG sectors.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  [`${yearsExperience}+`, "Years"],
                  ["195", "Professionals"],
                  ["40+", "Recent projects"],
                  ["1.4", "PetroBangla"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-blue-950/10 bg-[#f7f9fc] p-4"
                  >
                    <div className="text-2xl font-extrabold">{value}</div>
                    <div className="mt-1 text-xs font-bold text-[var(--brand-muted)]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="relative min-h-[380px] overflow-hidden rounded-2xl sm:min-h-[480px]"
            >
              <Image
                src="/banner/banner1.jpeg"
                alt="Industrial energy infrastructure delivered by RUSL"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[var(--brand-navy)]/88 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6 text-white sm:p-8">
                <BadgeCheck className="h-7 w-7 text-red-400" />
                <p className="mt-3 max-w-md text-xl font-extrabold leading-snug">
                  Category 1.4 enlisted contractor with PetroBangla and its
                  subsidiaries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">
                What we deliver
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Four connected capabilities.
              </h2>
            </div>
            <Link
              href="/expertise"
              className="group inline-flex items-center gap-2 text-sm font-extrabold text-red-600"
            >
              Explore our expertise
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-blue-950/10 bg-blue-950/10 gap-px md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => (
              <article key={item.title} className="bg-white p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--brand-navy)] text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-[var(--brand-muted)]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">
              Why clients choose us
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Local execution. International standards.
            </h2>
            <div className="mt-7 grid gap-4">
              {[
                ["Experienced people", "195 engineers, technical heads and field professionals."],
                ["End-to-end delivery", "Engineering, procurement, construction, testing and commissioning."],
                ["Quality and safety", "ISO-aligned systems with strong regulatory compliance."],
                ["Global collaboration", "Project partnerships with internationally reputed companies."],
              ].map(([title, text]) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <h3 className="text-sm font-extrabold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--brand-muted)]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--brand-navy)] p-6 text-white sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-400">
                  Selected delivery
                </p>
                <h2 className="mt-3 text-2xl font-extrabold">Evidence at a glance</h2>
              </div>
              <BriefcaseBusiness className="h-8 w-8 text-blue-300" />
            </div>
            <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
              {proofPoints.map((point) => (
                <div key={point} className="flex gap-3 py-4 text-sm font-semibold leading-6 text-blue-50">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                  {point}
                </div>
              ))}
            </div>
            <Link
              href="/projects"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-white"
            >
              View project portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-blue-950/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-red-50 text-red-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-extrabold">Need the complete company profile?</p>
              <p className="text-sm text-[var(--brand-muted)]">
                Review credentials, people, equipment and project details.
              </p>
            </div>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-red-600 px-5 text-sm font-extrabold text-white transition hover:bg-red-700"
          >
            Open company portfolio
          </Link>
        </div>
      </section>
    </div>
  );
}
