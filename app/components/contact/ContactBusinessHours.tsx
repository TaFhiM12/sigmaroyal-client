// components/contact/ContactBusinessHours.tsx
import { Clock, Calendar } from 'lucide-react';

export default function ContactBusinessHours() {
  const businessHours = [
    { day: 'Saturday', hours: '9:00 AM - 10:00 PM', note: '' },
    { day: 'Sunday', hours: '9:00 AM - 10:00 PM', note: '' },
    { day: 'Monday', hours: '9:00 AM - 10:00 PM', note: '' },
    { day: 'Tuesday', hours: '9:00 AM - 10:00 PM', note: '' },
    { day: 'Wednesday', hours: '9:00 AM - 10:00 PM', note: '' },
    { day: 'Thursday', hours: '9:00 AM - 10:00 PM', note: '' },
    { day: 'Friday', hours: 'Closed', note: 'Emergency support available' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
          <Clock className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Business Hours</h2>
          <p className="text-gray-600 text-sm">Current status: <span className="text-green-600 font-medium">Open ⋅ Closes 10 PM</span></p>
        </div>
      </div>

      <div className="space-y-4">
        {businessHours.map((item) => (
          <div
            key={item.day}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-900">{item.day}</span>
            </div>
            <div className="text-right">
              <span className={`font-medium ${item.day === 'Friday' ? 'text-red-600' : 'text-gray-700'}`}>
                {item.hours}
              </span>
              {item.note && (
                <p className="text-xs text-gray-500 mt-1">{item.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Emergency Support</h4>
          <p className="text-sm text-blue-700">
            For urgent matters outside business hours, call our emergency line:
            <a href="tel:+8801712345678" className="block font-bold text-blue-900 mt-1">
              +88 01712345678
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}