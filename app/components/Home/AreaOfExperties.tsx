"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Droplets, Factory, Wrench, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface AreaOfExpertiseProps {
  className?: string;
  heading?: string;
  description?: string;
  showHeader?: boolean;
}

const expertise = [
  {
    key: "oil-gas",
    label: "Oil & Gas Infrastructure",
    icon: Droplets,
    type: "pipeline",
  },
  {
    key: "power",
    label: "Power Generation",
    icon: Zap,
    type: "power",
  },
  {
    key: "process",
    label: "Process Industries",
    icon: Factory,
    type: "process",
  },
  {
    key: "engineering",
    label: "Industrial Solutions & Services",
    icon: Wrench,
    type: "storage",
  },
] as const;

function Valve({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="13" fill="#ffffff" stroke="#17345f" strokeWidth="1.5" />
      <path d="M-7-7L0 0l-7 7M7-7L0 0l7 7" fill="none" stroke="#ef233c" strokeWidth="1.8" />
      <circle r="18" fill="none" stroke="#ef233c" strokeOpacity=".2" />
    </g>
  );
}

function EngineeringDrawing({ type, id }: { type: string; id: string }) {
  const reduceMotion = useReducedMotion();
  const flowPath =
    type === "pipeline"
      ? "M24 194H90V108H160V194H232V82H302V164H376"
      : type === "power"
        ? "M28 206H82V128H150V86H226V154H294V108H374"
        : type === "process"
          ? "M24 204H76V146H142V94H206V186H278V116H376"
          : "M26 204H84V126H150V180H232V98H308V164H376";
  const nodes =
    type === "pipeline"
      ? [[90, 108], [160, 194], [232, 82], [302, 164]]
      : type === "power"
        ? [[82, 128], [150, 86], [226, 154], [294, 108]]
        : type === "process"
          ? [[76, 146], [142, 94], [206, 186], [278, 116]]
          : [[84, 126], [150, 180], [232, 98], [308, 164]];

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label={`${type} engineering drawing`}>
      <defs>
        <pattern id={`minor-${id}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0H0V12" fill="none" stroke="#17345f" strokeOpacity=".055" strokeWidth=".6" />
        </pattern>
        <pattern id={`major-${id}`} width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="60" fill={`url(#minor-${id})`} />
          <path d="M60 0H0V60" fill="none" stroke="#17345f" strokeOpacity=".11" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="#fbfcfe" />
      <rect width="400" height="300" fill={`url(#major-${id})`} />
      <g fill="none" stroke="#17345f" strokeOpacity=".2" strokeWidth=".8">
        <path d="M18 30H382M18 270H382M32 18V282M368 18V282" strokeDasharray="4 6" />
        <circle cx="200" cy="150" r="112" strokeDasharray="3 7" />
      </g>

      <path d={flowPath} fill="none" stroke="#17345f" strokeWidth="5" strokeLinejoin="round" />
      <motion.path
        d={flowPath}
        fill="none"
        stroke="#ef233c"
        strokeWidth="2.5"
        strokeDasharray="10 13"
        animate={reduceMotion ? undefined : { strokeDashoffset: [46, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
      />
      {nodes.map(([x, y]) => <Valve key={`${x}-${y}`} x={x} y={y} />)}

      {type === "pipeline" && (
        <g fill="none" stroke="#17345f" strokeWidth="1.35">
          <path d="M156 194V252H238M232 82V44H298" />
          <rect x="174" y="226" width="64" height="34" />
          <path d="M181 243h14l9-10 13 20 10-10h8" />
          <circle cx="320" cy="44" r="18" />
          <path d="M310 44h20M320 34v20" />
          <path d="M32 258H150M248 258H370" strokeDasharray="3 4" />
          <path d="M32 263Q92 218 150 263" />
          <path d="M38 254v18M144 254v18M91 232v36" />
          <path d="M52 64H214M52 58v12M90 58v12M128 58v12M166 58v12M214 58v12" />
          <rect x="256" y="218" width="92" height="46" />
          <rect x="266" y="228" width="22" height="25" />
          <circle cx="310" cy="241" r="12" />
          <path d="M322 241h16M298 241h-10" />
          <path d="M256 271h92M264 266v10M340 266v10" />
        </g>
      )}
      {type === "power" && (
        <g fill="none" stroke="#17345f" strokeWidth="1.5">
          <circle cx="84" cy="242" r="24" /><path d="M70 242c8-18 20 18 28 0" />
          <path d="M226 154v90h60M270 244l12-16 12 16 12-16 12 16" />
          <path d="M314 108V52h40M336 38v28M326 48h20" />
        </g>
      )}
      {type === "process" && (
        <g fill="none" stroke="#17345f" strokeWidth="1.5">
          <path d="M116 94V44h50v50M124 44v-12h34v12" />
          <path d="M206 186v66h58M220 226h30l-8-12-10 22-8-10" />
          <rect x="290" y="198" width="54" height="58" rx="24" />
          <path d="M290 226h54M317 198v-20" />
        </g>
      )}
      {type === "storage" && (
        <g fill="none" stroke="#17345f" strokeWidth="1.5">
          <circle cx="86" cy="240" r="28" /><path d="M58 240h56M86 212v56" />
          <rect x="200" y="208" width="66" height="42" rx="20" />
          <path d="M232 98V48h68v50M244 48v-14h44v14" />
          <path d="M308 164v86h52M326 226h24v24h-24z" />
        </g>
      )}
    </svg>
  );
}

export default function AreaOfExpertise({ className }: AreaOfExpertiseProps) {
  return (
    <section className={cn("relative overflow-hidden bg-[#eef3f8] px-4 py-10 sm:px-6 lg:px-8", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(11,31,66,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,66,0.035)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {expertise.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.key}
              id={item.key}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative min-h-[420px] overflow-hidden border border-slate-200 bg-white shadow-[0_24px_55px_-38px_rgba(15,23,42,0.3)] transition duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_30px_65px_-36px_rgba(15,23,42,0.28)]"
            >
              <div className="absolute inset-x-0 top-0 z-20 flex min-h-20 items-center border-b border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center border border-slate-200 bg-slate-50 text-red-600 transition group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="max-w-60 text-base font-extrabold leading-tight text-[var(--brand-navy)]">{item.label}</h3>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 top-20">
                <EngineeringDrawing type={item.type} id={item.key} />
              </div>

              <Link href={`/expertise#${item.key}`} aria-label={`Explore ${item.label} expertise`} className="absolute inset-0 z-30 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-500" />
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
