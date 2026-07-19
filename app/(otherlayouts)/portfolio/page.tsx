'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Download, 
  ChevronRight,
  BookOpen,
  Briefcase,
  Building2,
  Award,
  Users,
  Calendar,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import yearsExperience from '@/lib/yearsExperience';
import { useCompanyStats } from '@/hooks/useCompanyStats';

export default function PortfolioPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const brochureUrl = '/Brochure_Royal_Final.pdf';
  const companyStats = useCompanyStats();

  const verifiedStats = [
    {
      icon: Calendar,
      value: companyStats?.yearsOperating ?? yearsExperience,
      label: 'Years Operating',
      alwaysShow: true,
    },
    {
      icon: Briefcase,
      value: companyStats?.projects.total ?? 0,
      label: 'Projects Recorded',
    },
    {
      icon: Building2,
      value: companyStats?.clients ?? 0,
      label: 'Active Clients',
    },
    {
      icon: Users,
      value: companyStats?.teamMembers ?? 0,
      label: 'Team Members',
    },
    {
      icon: Award,
      value: companyStats?.certifications ?? 0,
      label: 'Active Certifications',
    },
  ].filter((stat) => stat.alwaysShow || stat.value > 0);

  const sectorLabel = (sector: string) =>
    sector
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <section ref={ref} className="site-canvas relative overflow-hidden py-8 md:py-12">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10 md:space-y-12"
          >
            {/* Direct PDF Portfolio */}
            <motion.section
              variants={fadeInUp}
              aria-labelledby="portfolio-document-title"
              className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-2xl border border-blue-950/10 bg-white shadow-[0_24px_80px_rgba(8,32,74,0.16)]"
            >
              <div className="flex flex-col gap-4 border-b border-blue-950/10 bg-[var(--brand-navy)] px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 id="portfolio-document-title" className="text-base font-extrabold sm:text-lg">
                      Royal &amp; Sigma Company Portfolio
                    </h2>
                    <p className="mt-0.5 text-xs font-medium text-blue-100/75">
                      Official corporate brochure · 60 pages
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={brochureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/8 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-white/15"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open full screen
                  </a>
                  <a
                    href={brochureUrl}
                    download="Brochure_Royal_Final.pdf"
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-red-700"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>

              <div className="bg-[#e8edf5] p-2 sm:p-3">
                <object
                  data={`${brochureUrl}#page=1&zoom=page-width&toolbar=1&navpanes=0`}
                  type="application/pdf"
                  className="h-[68vh] min-h-[520px] w-full rounded-xl bg-white lg:h-[82vh] lg:min-h-[760px]"
                  aria-label="The Royal Utilisation Services and Sigma Construction Company corporate portfolio"
                >
                  <div className="flex min-h-[520px] flex-col items-center justify-center rounded-xl bg-white p-8 text-center">
                    <BookOpen className="h-10 w-10 text-blue-900" />
                    <p className="mt-4 max-w-md font-bold text-(--brand-navy)">
                      Your browser cannot display the embedded brochure.
                    </p>
                    <a
                      href={brochureUrl}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open the portfolio PDF
                    </a>
                  </div>
                </object>
              </div>
            </motion.section>

            {/* Stats Grid */}
            <motion.div variants={fadeInUp} className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {verifiedStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center p-6 bg-white rounded-xl shadow-sm border border-[#eef4ff]">
                    <div className="inline-flex p-3 bg-red-50 rounded-lg mb-3">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-(--brand-navy)">{stat.value}</div>
                    <p className="text-sm text-(--brand-muted)">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>

            {companyStats && companyStats.projects.bySector.length > 0 && (
              <motion.div variants={fadeInUp} className="space-y-8">
                <h2 className="text-center text-2xl font-bold text-(--brand-navy) md:text-3xl">
                  Recorded Project <span className="text-red-600">Sectors</span>
                </h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {companyStats.projects.bySector.map((sector) => (
                    <Link
                      key={sector.sector}
                      href="/projects"
                      className="group rounded-xl border border-blue-950/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-(--brand-navy)">
                            {sectorLabel(sector.sector)}
                          </h3>
                          <p className="mt-2 text-sm text-(--brand-muted)">
                            {sector.count} recorded {sector.count === 1 ? 'project' : 'projects'}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-blue-700 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Timeline/Experience Section */}
            <motion.div variants={fadeInUp} className="bg-[var(--brand-navy)] text-white rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Operating since 1977</h3>
                  <p className="text-blue-50/80 mb-6">
                    Company history is presented alongside live database counts for projects, clients, team members and certifications.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-blue-950/70 p-6 text-center">
                  <div className="text-4xl font-bold text-red-400">
                    {companyStats?.yearsOperating ?? yearsExperience}
                  </div>
                  <p className="mt-2 text-sm text-blue-100/70">Years operating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
