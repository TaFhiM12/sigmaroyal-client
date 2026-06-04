import Image from "next/image";
import Link from "next/link";
import { QhsePolicyResponse } from "@/types/qhse";
import { Shield, CheckCircle, Award, TrendingUp, Heart, Globe, Users, Sparkles, FileText, Target, Leaf } from "lucide-react";

export const dynamic = "force-dynamic";

async function getQhsePolicy() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qhse-policy`, {
    cache: "no-store",
  });

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
      <section className="min-h-screen bg-linear-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-6 animate-pulse">
            <Shield className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Policy Not Found</h1>
          <p className="text-red-200 text-lg mb-2">Our QHSE guidelines are being updated</p>
          <p className="text-gray-400">Please check back soon or contact our compliance team</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50">
      {/* Unique Hero Section - Minimalist Split Layout (No Overlapping Banner) */}
      <div className="relative overflow-hidden">
        {/* Top Accent Bar */}
        <div className="h-1 bg-linear-to-r from-red-600 via-red-500 to-transparent w-full" />
        
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full border border-red-200">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-xs font-semibold text-red-700 uppercase tracking-wider">QHSE Policy</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {policy.pageTitle}
              </h1>
              
              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment to Quality, Health, Safety, and Environment excellence in every operation.
              </p>
              
              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">ISO 45001</div>
                    <div className="text-xs text-gray-500">Certified</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">ISO 14001</div>
                    <div className="text-xs text-gray-500">Environment</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">Zero Harm</div>
                    <div className="text-xs text-gray-500">Goal</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Hero Image Card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/20 to-transparent z-10" />
                <Image
                  src={policy.heroImageUrl}
                  alt={policy.pageTitle}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-red-600 to-transparent opacity-20 z-10" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-2 z-20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-gray-700">Active Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24">
              {/* Section Title Card */}
              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-red-400" />
                  <h2 className="text-xl font-bold">{policy.sectionTitle}</h2>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>ISO 45001:2018 Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>ISO 14001:2015 Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Annual Review: 2024</span>
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

              {/* Stats Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-2xl font-bold text-red-600">0</div>
                    <div className="text-xs text-gray-600">Lost Time Injuries</div>
                  </div>
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-2xl font-bold text-red-600">100%</div>
                    <div className="text-xs text-gray-600">Compliance Rate</div>
                  </div>
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-2xl font-bold text-red-600">500+</div>
                    <div className="text-xs text-gray-600">Trainings</div>
                  </div>
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-2xl font-bold text-red-600">15+</div>
                    <div className="text-xs text-gray-600">Safety Awards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Policy Statement - Minimalist Quote */}
            <div className="relative bg-linear-to-r from-gray-50 to-white rounded-2xl p-8 md:p-10 border-l-4 border-red-600 shadow-sm">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-serif">&ldquo;</span>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-medium pl-6">
                {policy.policyStatement}
              </p>
            </div>

            {/* Bullet Points as Cards */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Key Principles</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {policy.bulletPoints.map((item, idx) => (
                  <div key={`bullet-${idx}`} className="group bg-white rounded-xl hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 hover:border-red-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-md flex items-center justify-center text-red-600 font-bold text-xs group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Statement - Minimalist */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-1">Performance Analysis</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{policy.analysisStatement}</p>
                </div>
              </div>
            </div>

            {/* Golden Rules Section */}
            <div className="mt-4">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{policy.goldenRulesTitle}</h2>
                <div className="w-16 h-0.5 bg-red-600 rounded-full"></div>
                <p className="text-gray-500 text-sm mt-3">Non-negotiable standards for every team member</p>
              </div>

              <div className="space-y-3">
                {policy.goldenRules.map((rule, idx) => (
                  <div key={`rule-${idx}`} className="group flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-red-200 hover:shadow-md transition-all">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                      <Award className="w-3 h-3 text-red-600" />
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed flex-1">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info Cards - Minimalist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <Heart className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Health & Safety</h4>
                  <p className="text-xs text-gray-500 mt-1">Regular medical checkups and safety training</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <Globe className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Environment</h4>
                  <p className="text-xs text-gray-500 mt-1">Sustainable practices & carbon reduction</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <Users className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Quality Assurance</h4>
                  <p className="text-xs text-gray-500 mt-1">ISO certified processes for excellence</p>
                </div>
              </div>
            </div>

            {/* Footer Note - Simple */}
            <div className="pt-6 border-t border-gray-200 text-center">
              <div className="inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-red-500" />
                <p className="text-xs text-gray-500">
                  This policy is binding for all employees, contractors, and visitors
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Last updated: June 5, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
