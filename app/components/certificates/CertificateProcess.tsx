// components/certificates/CertificateProcess.tsx
import { FileCheck, Search, Award, Shield, CheckCircle } from 'lucide-react';

const processSteps = [
  {
    number: "01",
    title: "Compliance Assessment",
    description: "Initial evaluation against international and local standards",
    icon: <Search className="h-6 w-6" />
  },
  {
    number: "02",
    title: "Documentation & Implementation",
    description: "Developing and implementing quality management systems",
    icon: <FileCheck className="h-6 w-6" />
  },
  {
    number: "03",
    title: "Audit & Evaluation",
    description: "Third-party verification and continuous monitoring",
    icon: <Shield className="h-6 w-6" />
  },
  {
    number: "04",
    title: "Certification & Renewal",
    description: "Obtaining certification and maintaining compliance",
    icon: <Award className="h-6 w-6" />
  },
];

export default function CertificateProcess() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="h-6 w-6 text-red-400" />
                <span className="text-sm font-semibold text-red-400 tracking-wider">
                  QUALITY PROCESS
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
                Our <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-red-300">Certification</span> Journey
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-700 -translate-x-1/2" />
                    )}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                          {step.number}
                        </div>
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 mb-3">
                          <div className="text-red-400">
                            {step.icon}
                          </div>
                          <h3 className="text-lg font-bold text-white">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Continuous Improvement
                    </h3>
                    <p className="text-gray-300">
                      Our commitment to quality extends beyond certification - it's embedded in our culture
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">9+</div>
                      <div className="text-sm text-gray-400">Certifications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">46+</div>
                      <div className="text-sm text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">100%</div>
                      <div className="text-sm text-gray-400">Compliance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}