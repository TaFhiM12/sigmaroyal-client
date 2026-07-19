import Image from "next/image";
import { QhsePolicyResponse } from "@/types/qhse";
import { Shield, CheckCircle, Award, TrendingUp, Heart, Globe, Users, Sparkles, FileText, Target, Leaf } from "lucide-react";
import { apiUrl, publicApiFetchOptions } from "@/lib/api";

export const revalidate = 3600;

export const metadata = {
  title: "QHSE Policy",
  description: "Quality, Health, Safety and Environment policy commitments, principles and standards for The Royal Utilisation Services.",
};

async function getQhsePolicy() {
  const res = await fetch(apiUrl("/qhse-policy"), publicApiFetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch QHSE policy");
  }

  const data: QhsePolicyResponse = await res.json();
  return data.data;
}

export default async function QhsePolicyPage() {
  const policy = await getQhsePolicy();

  if (!policy) {
    return (
      <section className="min-h-screen bg-linear-to-br from-[var(--brand-navy)] via-red-900 to-[var(--brand-navy)] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-6 animate-pulse">
            <Shield className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Policy Not Found</h2>
          <p className="text-red-200 text-lg mb-2">Our QHSE guidelines are being updated</p>
          <p className="text-[var(--brand-muted)]">Please check back soon or contact our compliance team</p>
        </div>
      </section>
    );
  }

  return (
    <section className="site-canvas min-h-screen">
      {/* Compact Policy Overview */}
      <div className="relative overflow-hidden">
        {/* Top Accent Bar */}
        <div className="h-1 bg-linear-to-r from-red-600 via-red-500 to-transparent w-full" />
        
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="grid items-center gap-5 lg:grid-cols-[1fr_420px]">
            {/* Left Side - Content */}
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-2.5 py-1">
                <Shield className="h-3.5 w-3.5 text-red-600" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-red-700">QHSE Policy</span>
              </div>

              {/* Description */}
              <p className="max-w-3xl text-base font-medium leading-7 text-[var(--brand-muted)]">
                Our commitment to Quality, Health, Safety, and Environment excellence in every operation.
              </p>
              
              {/* Stats Row */}
              <div className="grid gap-2 pt-1 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-lg border border-[#d8e4f5] bg-white px-3 py-2 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef4ff]">
                    <CheckCircle className="h-4 w-4 text-[var(--brand-blue)]" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[var(--brand-navy)]">ISO 45001</div>
                    <div className="text-xs font-medium text-[var(--brand-muted)]">Certified</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[#d8e4f5] bg-white px-3 py-2 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                    <Leaf className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[var(--brand-navy)]">ISO 14001</div>
                    <div className="text-xs font-medium text-[var(--brand-muted)]">Environment</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[#d8e4f5] bg-white px-3 py-2 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                    <Target className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[var(--brand-navy)]">Zero Harm</div>
                    <div className="text-xs font-medium text-[var(--brand-muted)]">Goal</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Hero Image Card */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-xl transition-transform duration-500 hover:scale-[1.01]">
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/20 to-transparent z-10" />
                <Image
                  src={policy.heroImageUrl}
                  alt={policy.pageTitle}
                  width={600}
                  height={400}
                  className="h-56 w-full object-cover"
                  priority
                />
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-red-600 to-transparent opacity-20 z-10" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-3 -left-3 z-20 flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-lg">
                <div className="w-2 h-2 bg-[#eef4ff]0 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-[var(--brand-copy)]">Active Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24">
              {/* Section Title Card */}
              <div className="bg-linear-to-br from-[var(--brand-navy)] to-[var(--brand-navy)] rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-red-400" />
                  <h2 className="text-xl font-bold">Management standards</h2>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm text-blue-50/80">
                    <CheckCircle className="w-4 h-4 text-[var(--brand-blue)]" />
                    <span>ISO 45001:2018 Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-50/80">
                    <CheckCircle className="w-4 h-4 text-[var(--brand-blue)]" />
                    <span>ISO 14001:2015 Certified</span>
                  </div>
                </div>
              </div>

              {/* Commitment Card */}
              <div className="mt-6 bg-linear-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                <div className="text-4xl mb-3 relative z-10">🎯</div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Our Commitment</h3>
                <p className="text-red-100 text-sm leading-relaxed relative z-10">
                  Zero harm to people, environment, and assets through continuous improvement and proactive risk management.
                </p>
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Policy Statement - Minimalist Quote */}
            <div className="relative bg-linear-to-r from-[#f7faff] to-white rounded-2xl p-8 md:p-10 border-l-4 border-red-600 shadow-sm">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-serif">&ldquo;</span>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed text-[var(--brand-copy)] font-medium pl-6">
                {policy.policyStatement}
              </p>
            </div>

            {/* Bullet Points as Cards */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--brand-navy)]">Key Principles</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {policy.bulletPoints.map((item, idx) => (
                  <div key={`bullet-${idx}`} className="group bg-white rounded-xl hover:shadow-lg transition-all duration-300 p-4 border border-[#eef4ff] hover:border-red-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-md flex items-center justify-center text-red-600 font-bold text-xs group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                      <p className="text-[var(--brand-copy)] text-sm leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Statement - Minimalist */}
            <div className="bg-white rounded-xl p-6 border border-[#d8e4f5] shadow-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-md font-semibold text-[var(--brand-navy)] mb-1">Performance Analysis</h3>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed">{policy.analysisStatement}</p>
                </div>
              </div>
            </div>

            {/* Golden Rules Section */}
            <div className="mt-4">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[var(--brand-navy)] mb-2">{policy.goldenRulesTitle}</h2>
                <div className="w-16 h-0.5 bg-red-600 rounded-full"></div>
                <p className="text-[var(--brand-muted)] text-sm mt-3">Non-negotiable standards for every team member</p>
              </div>

              <div className="space-y-3">
                {policy.goldenRules.map((rule, idx) => (
                  <div key={`rule-${idx}`} className="group flex items-start gap-3 p-4 bg-white rounded-lg border border-[#eef4ff] hover:border-red-200 hover:shadow-md transition-all">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                      <Award className="w-3 h-3 text-red-600" />
                    </div>
                    <p className="text-[var(--brand-copy)] text-sm leading-relaxed flex-1">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info Cards - Minimalist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#eef4ff]">
                <Heart className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--brand-navy)] text-sm">Health & Safety</h4>
                  <p className="text-xs text-[var(--brand-muted)] mt-1">Regular medical checkups and safety training</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#eef4ff]">
                <Globe className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--brand-navy)] text-sm">Environment</h4>
                  <p className="text-xs text-[var(--brand-muted)] mt-1">Sustainable practices & carbon reduction</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#eef4ff]">
                <Users className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--brand-navy)] text-sm">Quality Assurance</h4>
                  <p className="text-xs text-[var(--brand-muted)] mt-1">ISO certified processes for excellence</p>
                </div>
              </div>
            </div>

            {/* Footer Note - Simple */}
            <div className="pt-6 border-t border-[#d8e4f5] text-center">
              <div className="inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-red-500" />
                <p className="text-xs text-[var(--brand-muted)]">
                  This policy is binding for all employees, contractors, and visitors
                </p>
              </div>
              <p className="text-xs text-[var(--brand-muted)] mt-2">
                Last updated: June 5, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
