"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  HardHat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import yearsExperience from "@/lib/yearsExperience";

interface AboutUsProps {
  className?: string;
  heading?: string;
  body?: string;
}

const facts = [
  {
    icon: CalendarDays,
    value: `${yearsExperience}+`,
    label: "Years of experience",
  },
  {
    icon: HardHat,
    value: "195",
    label: "Skilled professionals",
  },
  {
    icon: BriefcaseBusiness,
    value: "40+",
    label: "Projects in 5 years",
  },
  {
    icon: BadgeCheck,
    value: "1.4",
    label: "PetroBangla category",
  },
];

const capabilities = [
  "Oil & Gas",
  "Power",
  "Process Plants",
  "LPG & SNG",
  "Pipeline Systems",
];

export default function AboutUs({
  className,
  heading,
  body,
}: AboutUsProps) {
  return (
    <section
      id="about"
      className={cn(
        "relative overflow-hidden bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-blue-900/20 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">
              <span className="h-px w-9 bg-red-600" />
              About RUSL
            </div>

            <h2 className="max-w-2xl font-heading text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[var(--brand-navy)] sm:text-5xl">
              {heading || (
                <>
                  Engineering Bangladesh&apos;s
                  <span className="block text-red-600">energy infrastructure.</span>
                </>
              )}
            </h2>

            <div className="mt-7 max-w-2xl space-y-4 text-base font-medium leading-7 text-[var(--brand-muted)]">
              {body ? (
                <p>{body}</p>
              ) : (
                <>
                  <p>
                    The Royal Utilisation Services (Pvt.) Ltd. has delivered
                    engineering and infrastructure solutions since 1977 across
                    oil, gas, power, fertilizer, refineries, and process plants.
                  </p>
                  <p>
                    Together with Sigma Construction Company, we combine local
                    execution strength, experienced technical teams, and
                    international partnerships to deliver complex projects
                    safely and responsibly.
                  </p>
                </>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded-full border border-blue-950/10 bg-[#f5f7fb] px-3 py-1.5 text-xs font-bold text-[var(--brand-navy)]"
                >
                  {capability}
                </span>
              ))}
            </div>

            <Link
              href="/preface"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-lg bg-red-600 px-6 text-sm font-extrabold text-white shadow-[0_14px_30px_-14px_rgba(220,38,38,0.65)] transition hover:-translate-y-0.5 hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Know our company
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative min-h-[390px] overflow-hidden rounded-2xl bg-[var(--brand-navy)] shadow-[0_28px_80px_-38px_rgba(8,32,74,0.65)] sm:min-h-[500px]">
              <Image
                src="/banner/banner1.jpeg"
                alt="Industrial gas processing and pipeline infrastructure"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[var(--brand-navy)]/82 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.17em] text-blue-200">
                  Built for critical delivery
                </p>
                <p className="mt-2 max-w-md text-xl font-extrabold leading-snug sm:text-2xl">
                  From engineering and procurement to construction, testing,
                  and commissioning.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-bl-2xl border-b-4 border-l-4 border-red-600 sm:-bottom-5 sm:-left-5" />
          </motion.div>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-2xl border border-blue-950/10 bg-blue-950/10 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center gap-4 bg-[#f7f9fc] p-5 sm:p-6"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-red-600 shadow-sm ring-1 ring-blue-950/5">
                <fact.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-extrabold tracking-tight text-[var(--brand-navy)]">
                  {fact.value}
                </div>
                <div className="text-xs font-bold text-[var(--brand-muted)]">
                  {fact.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
