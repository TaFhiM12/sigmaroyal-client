// components/clients/ClientStats.tsx
import { Users, Shield, Trophy, Award } from 'lucide-react';

const partnershipStats = [
  { value: '100+', label: 'Active Partnerships', icon: <Users className="h-6 w-6" /> },
  { value: '25+', label: 'Years Average Partnership', icon: <Shield className="h-6 w-6" /> },
  { value: '98%', label: 'Retention Rate', icon: <Trophy className="h-6 w-6" /> },
  { value: 'ISO Certified', label: 'Quality Assurance', icon: <Award className="h-6 w-6" /> },
];

export default function ClientStats() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {partnershipStats.map((stat, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 text-center hover:border-red-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-lg mb-4">
                <div className="text-red-600">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}