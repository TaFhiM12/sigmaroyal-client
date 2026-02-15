import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <div className="text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <div className="text-9xl font-bold text-gray-900 opacity-5">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl md:text-8xl font-bold text-red-600">404</div>
            </div>
          </div>

          {/* Icon */}
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="h-8 w-8 text-red-600" />
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              <Search className="h-4 w-4" />
              Contact Support
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              You might be looking for:
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/projects', label: 'Projects' },
                { href: '/clients', label: 'Clients' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Try searching for what you need or check our{' '}
              <Link href="/sitemap" className="text-red-600 hover:text-red-700 font-medium">
                sitemap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}