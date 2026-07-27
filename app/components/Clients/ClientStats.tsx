"use client";

import { motion } from "framer-motion";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useCompanyStats } from "@/hooks/useCompanyStats";

export default function ClientStats() {
  const companyStats = useCompanyStats();
  const stats = [
    {
      icon: Building2,
      value: companyStats?.clients ?? 0,
      label: "Trusted clients",
      detail: "Across energy and infrastructure",
    },
    {
      icon: BriefcaseBusiness,
      value: companyStats?.projects.total ?? 0,
      label: "Projects recorded",
      detail: "Delivered with accountable teams",
    },
    {
      icon: Users,
      value: companyStats?.teamMembers ?? 0,
      label: "Industry professionals",
      detail: "Engineering and field expertise",
    },
    {
      icon: Award,
      value: companyStats?.certifications ?? 0,
      label: "Active certifications",
      detail: "Quality and safety assured",
    },
  ].filter((stat) => stat.value > 0);

  if (stats.length === 0) return null;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Partnership at scale
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              The operating strength behind every relationship.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["ISO 9001:2015", "Government enlisted"].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="grid overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group bg-white p-7 transition-colors hover:bg-slate-50 sm:p-8"
            >
              <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm transition-transform group-hover:-translate-y-1">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="text-4xl font-semibold tracking-[-0.04em] text-slate-950">
                {stat.value}
                <span className="text-blue-600">+</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                {stat.label}
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
