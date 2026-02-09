'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>

          {/* Error Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h1>
          
          <p className="text-gray-600 mb-6">
            We apologize for the inconvenience. An unexpected error has occurred.
            {error.digest && (
              <span className="block text-sm text-gray-500 mt-2">
                Error ID: {error.digest}
              </span>
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          {/* Technical Details (Collapsible) */}
          <details className="mt-8 border border-gray-200 rounded-lg">
            <summary className="cursor-pointer p-4 text-sm font-medium text-gray-700 hover:text-gray-900">
              Technical Details
            </summary>
            <div className="p-4 bg-gray-50 text-left">
              <code className="text-xs text-gray-600 break-all">
                {error.message || 'Unknown error occurred'}
              </code>
            </div>
          </details>

          {/* Support Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If the problem persists, please contact our support team at{' '}
              <a href="mailto:support@sigma-royal.com" className="text-red-600 hover:text-red-700">
                support@sigma-royal.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}