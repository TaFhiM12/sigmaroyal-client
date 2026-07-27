"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import { Client } from "@/types/client";
import { apiUrl } from "@/lib/api";

export default function ClientShowcase() {
  const [clients, setClients] = useState<Client[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(apiUrl("/clients"), { cache: "no-store" });
        const data = await response.json();
        if (data.success) {
          setClients(
            data.data
              .filter((client: Client) => client.isActive)
              .sort((a: Client, b: Client) => a.order - b.order),
          );
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f4f7fb] px-4 py-14 md:py-20">
        <div className="mx-auto h-[520px] max-w-7xl animate-pulse rounded-[32px] bg-white" />
      </section>
    );
  }

  if (clients.length === 0) return null;

  const activeClient = clients[activeIndex];
  const goTo = (index: number) =>
    setActiveIndex((index + clients.length) % clients.length);

  return (
    <section className="relative overflow-hidden bg-[#f4f7fb] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_15%_0%,rgba(37,99,235,0.12),transparent_42%),radial-gradient(circle_at_85%_5%,rgba(225,29,72,0.09),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-blue-700 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              Trusted across critical industries
            </div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
              Built on trust.
              <span className="block text-slate-400">Proven in the field.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600 lg:justify-self-end lg:text-lg">
            We work alongside Bangladesh&apos;s leading energy and infrastructure
            organizations to deliver dependable, high-stakes projects.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_30px_90px_-48px_rgba(15,23,42,0.5)]">
          <div className="grid min-h-[390px] lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative flex items-center justify-center overflow-hidden border-b border-slate-200 bg-[linear-gradient(145deg,#f8fafc,#eef3f9)] p-8 sm:p-12 lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClient.id}
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-56 w-full max-w-sm items-center justify-center rounded-[24px] border border-white bg-white p-10 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)]"
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={activeClient.logoUrl}
                      alt={`${activeClient.name} logo`}
                      fill
                      sizes="(max-width: 1024px) 70vw, 360px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative flex flex-col justify-between bg-[#081326] p-7 text-white sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_66%)]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClient.id}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="mb-8 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified partner
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Partner {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                    {activeClient.name}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                    A valued partner contributing to critical infrastructure
                    across oil, gas, power, and industrial sectors.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {["Energy infrastructure", "Long-term delivery"].map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 text-sm text-slate-300"
                      >
                        <Check className="h-4 w-4 text-blue-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="relative mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6">
                {activeClient.website ? (
                  <a
                    href={activeClient.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-white"
                  >
                    <Globe2 className="h-4 w-4 text-blue-400" />
                    Visit organization
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                    <Building2 className="h-4 w-4" />
                    Industry partner
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex - 1)}
                    aria-label="Show previous client"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex + 1)}
                    aria-label="Show next client"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-950 transition hover:scale-105 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500">
            {clients.length} organizations in our partner network
          </p>
          <div className="flex max-w-[55%] gap-1.5 overflow-hidden">
            {clients.map((client, index) => (
              <button
                key={client.id}
                type="button"
                aria-label={`Show ${client.name}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-9 bg-blue-600"
                    : "w-3 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {clients.map((client, index) => (
            <button
              key={client.id}
              type="button"
              onClick={() => goTo(index)}
              className={`group relative flex h-28 items-center justify-center rounded-2xl border bg-white p-5 transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                index === activeIndex
                  ? "border-blue-500 shadow-[0_12px_30px_-18px_rgba(37,99,235,0.8)]"
                  : "border-slate-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              }`}
            >
              <div className="relative h-14 w-full transition group-hover:scale-105">
                <Image
                  src={client.logoUrl}
                  alt={`${client.name} logo`}
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
