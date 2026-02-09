// components/contact/ContactInfo.tsx (Updated)
import { MapPin, Mail, Phone, Clock, Users, Award, Building } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
          <Building className="h-5 w-5 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Office Locations</h2>
      </div>

      <div className="space-y-8">
        {/* Corporate Office (Main) */}
        <div className="space-y-4 pb-6 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
              <MapPin className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-lg">Corporate Office</h3>
                <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">
                  Primary
                </span>
              </div>
              
              <div className="mt-2 space-y-1">
                <p className="text-gray-700">
                  <span className="font-semibold">The Royal Utilisation Services (Pvt.) Ltd.</span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">দি রয়েল ইউটিলাইজেশন সার্ভিসেস (প্রাঃ) লিঃ</span>
                </p>
                <p className="text-gray-600">3rd Floor, Achhia Manjil</p>
                <p className="text-gray-600">House#383, Road No 28</p>
                <p className="text-gray-600">New DOHS, Mohakhali</p>
                <p className="text-gray-800 font-semibold">Dhaka 1206, Bangladesh</p>
                
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Open ⋅ Closes 10 PM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-gray-500">Q9JV+3Q Dhaka</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="tel:+8802222281246"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 rounded-lg transition-colors text-sm"
                >
                  <Phone className="h-3 w-3" />
                  +88 02222281246
                </a>
                <a
                  href="https://maps.app.goo.gl/Me6eCjeTcrvuUoJW8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 rounded-lg transition-colors text-sm"
                >
                  <MapPin className="h-3 w-3" />
                  View on Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Head Office */}
        <div className="space-y-4 pb-6 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mt-1">
              <Users className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Head Office</h3>
              <div className="space-y-1">
                <p className="text-gray-600">28/A, Nayapaltan (4th Floor)</p>
                <p className="text-gray-600">VIP Road</p>
                <p className="text-gray-800 font-semibold">Dhaka-1000, Bangladesh</p>
              </div>
              <div className="mt-3">
                <a
                  href="tel:+8802222229238"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" />
                  +88 02222229238
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sirajgonj Office */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mt-1">
              <Award className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Sirajgonj Office</h3>
              <div className="space-y-1">
                <p className="text-gray-600">Wasim Villa, Masumpur</p>
                <p className="text-gray-800 font-semibold">Sirajgonj, Bangladesh</p>
              </div>
              <div className="mt-3">
                <a
                  href="tel:+8802588831606"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" />
                  +88 02588831606
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">Direct Contact</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Numbers
                </h4>
                <div className="space-y-2">
                  <a href="tel:+8802222281246" className="block text-gray-700 hover:text-red-600 transition-colors font-medium">
                    +88 02222281246 (Corporate)
                  </a>
                  <a href="tel:+8802222229238" className="block text-gray-600 hover:text-red-600 transition-colors">
                    +88 02222229238 (Head Office)
                  </a>
                  <a href="tel:+8802588831606" className="block text-gray-600 hover:text-red-600 transition-colors">
                    +88 02588831606 (Sirajgonj)
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Addresses
                </h4>
                <div className="space-y-2">
                  <a href="mailto:info@sigma-royal.com" className="block text-gray-700 hover:text-red-600 transition-colors font-medium">
                    info@sigma-royal.com
                  </a>
                  <a href="mailto:sales@sigma-royal.com" className="block text-gray-600 hover:text-red-600 transition-colors">
                    sales@sigma-royal.com
                  </a>
                  <a href="mailto:support@sigma-royal.com" className="block text-gray-600 hover:text-red-600 transition-colors">
                    support@sigma-royal.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block">Website</span>
                <a href="https://www.sigma-royal.com" target="_blank" rel="noopener noreferrer" 
                   className="block text-red-600 hover:text-red-700 font-medium">
                  sigma-royal.com
                </a>
              </div>
              <div>
                <span className="text-gray-500 block">Google Maps</span>
                <a href="https://maps.app.goo.gl/Me6eCjeTcrvuUoJW8" target="_blank" rel="noopener noreferrer"
                   className="block text-red-600 hover:text-red-700 font-medium">
                  View Location
                </a>
              </div>
              <div>
                <span className="text-gray-500 block">Business Type</span>
                <span className="block text-gray-700 font-medium">Private Limited</span>
              </div>
              <div>
                <span className="text-gray-500 block">Established</span>
                <span className="block text-gray-700 font-medium">46+ Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}