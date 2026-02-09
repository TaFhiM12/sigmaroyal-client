'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Navigation,
  Share2,
  Star,
  Clock,
  Phone,
  Maximize2,
  Minimize2,
  Download,
  Copy,
  Mail,
} from 'lucide-react';

export default function ContactMap() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const OFFICE_LAT = 23.794233;
  const OFFICE_LNG = 90.403330;
  const OFFICE_ADDRESS = "House#383, (3rd floor), Road#28, New DOHS, Mohakhali, Dhaka-1206";

  const googleMapsUrl = 'https://maps.app.goo.gl/Me6eCjeTcrvuUoJW8';
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${OFFICE_LAT},${OFFICE_LNG}`;
  const openStreetMapUrl = `https://www.openstreetmap.org/?mlat=${OFFICE_LAT}&mlon=${OFFICE_LNG}#map=17/${OFFICE_LAT}/${OFFICE_LNG}`;

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10;
  };

  const distance = userLocation
    ? calculateDistance(userLocation.lat, userLocation.lng, OFFICE_LAT, OFFICE_LNG)
    : null;

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'The Royal Utilisation Services (Pvt.) Ltd.',
      text: 'Visit our corporate office',
      url: googleMapsUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyToClipboard(googleMapsUrl);
      }
    } else {
      copyToClipboard(googleMapsUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const calculateEta = () => {
    if (!distance) return 'Unknown';
    const averageSpeed = 20; // km/h for Dhaka traffic
    const minutes = Math.round((distance / averageSpeed) * 60);
    return `${minutes} minutes`;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  The Royal Utilisation Services (Pvt.) Ltd.
                </h3>
                <p className="text-sm text-gray-600">
                  Corporate Office • 3rd Floor, Achhia Manjil
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-gray-700">4.5</span>
                <span className="text-xs text-gray-500">(20)</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Clock className="h-3 w-3" />
                <span>Open ⋅ Closes 10 PM</span>
              </div>
              <button
                onClick={() => copyToClipboard(`${OFFICE_LAT}, ${OFFICE_LNG}`)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
              >
                <MapPin className="h-3 w-3" />
                <span>Copy GPS</span>
              </button>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col gap-2">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm transition-colors"
            >
              <Navigation className="h-4 w-4" />
              <span className="hidden sm:inline">Directions</span>
            </a>
            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {isFullscreen ? 'Exit' : 'Fullscreen'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className={`relative bg-gray-100 ${isFullscreen ? 'h-[calc(100vh-12rem)]' : 'h-96 md:h-112.5'}`}>
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 z-10">
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-8 w-8 text-red-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-ping" />
                </div>
              </div>
              <p className="text-gray-500 font-medium">Loading location map...</p>
            </div>
          </div>
        )}

        {/* Map Image */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/map/map.png"
            alt="Exact location of The Royal Utilisation Services office"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onLoad={() => setImageLoaded(true)}
            quality={100}
          />
          
          {/* Interactive Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-xl ring-4 ring-red-200 animate-pulse">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-600" />
            </div>
          </div>

          {/* Map Actions Overlay */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <button
              onClick={getUserLocation}
              className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              title="Calculate Distance"
            >
              <Navigation className="h-4 w-4 text-blue-600" />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              title="Share Location"
            >
              <Share2 className="h-4 w-4 text-green-600" />
            </button>
            <a
              href="/map/map.png"
              download="The-Royal-Utilisation-Services-Location.png"
              className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              title="Download Map"
            >
              <Download className="h-4 w-4 text-purple-600" />
            </a>
          </div>

          {/* Location Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Exact Location Pinpointed</p>
                    <p className="text-sm text-gray-600 mt-1">
                      This map shows our exact building location in Mohakhali DOHS
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => copyToClipboard(OFFICE_ADDRESS)}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                      >
                        Copy Address
                      </button>
                      <button
                        onClick={() => copyToClipboard(`${OFFICE_LAT}, ${OFFICE_LNG}`)}
                        className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                      >
                        Copy GPS
                      </button>
                      <button
                        onClick={() => copyToClipboard(googleMapsUrl)}
                        className="text-xs px-2 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors"
                      >
                        Copy Map Link
                      </button>
                    </div>
                  </div>
                </div>
                {copied && (
                  <div className="text-xs text-green-600 font-medium animate-pulse">
                    Copied!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Distance Calculator */}
          {userLocation && distance && (
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Navigation className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Your Distance</span>
                </div>
                <p className="text-lg font-bold text-blue-700">{distance} km</p>
                <p className="text-xs text-gray-500">ETA: ~{calculateEta()}</p>
                <button
                  onClick={() => setUserLocation(null)}
                  className="text-xs text-gray-400 hover:text-gray-600 mt-1"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loading Indicator */}
        <div className={`absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity duration-300 ${imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent"></div>
            <p className="mt-2 text-sm text-gray-600">Loading map image...</p>
          </div>
        </div>
      </div>

      {/* Quick Info & Actions Panel */}
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Address & Coordinates */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500" />
                Complete Address
              </h4>
              <div className="space-y-2 text-gray-700">
                <p className="font-medium">The Royal Utilisation Services (Pvt.) Ltd.</p>
                <p className="text-gray-600">দি রয়েল ইউটিলাইজেশন সার্ভিসেস (প্রাঃ) লিঃ</p>
                <div className="mt-3 space-y-1 bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">3rd Floor, Achhia Manjil</p>
                  <p className="text-sm">House#383, Road No 28</p>
                  <p className="text-sm">New DOHS, Mohakhali</p>
                  <p className="text-sm font-semibold text-gray-900">Dhaka 1206, Bangladesh</p>
                </div>
              </div>
            </div>

            {/* GPS Coordinates */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-gray-500">Latitude</p>
                    <button
                      onClick={() => copyToClipboard(OFFICE_LAT.toString())}
                      className="text-xs text-gray-400 hover:text-gray-600"
                      title="Copy"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="font-mono font-semibold text-gray-800">{OFFICE_LAT.toFixed(6)}° N</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-gray-500">Longitude</p>
                    <button
                      onClick={() => copyToClipboard(OFFICE_LNG.toString())}
                      className="text-xs text-gray-400 hover:text-gray-600"
                      title="Copy"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="font-mono font-semibold text-gray-800">{OFFICE_LNG.toFixed(6)}° E</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Google Plus Code</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono font-semibold text-gray-800">Q9JV+3Q Dhaka</p>
                  <button
                    onClick={() => copyToClipboard("Q9JV+3Q Dhaka")}
                    className="text-xs text-gray-400 hover:text-gray-600"
                    title="Copy"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <a
                  href="tel:+8802222281246"
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Phone className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <span className="text-gray-700 group-hover:text-gray-900 block">Call Office</span>
                      <span className="text-xs text-gray-500">+88 02222281246</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-600">Tap to call</div>
                </a>

                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Share2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900">Share This Location</span>
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-600">Copy link</div>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-xs">G</span>
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">Google Maps</span>
                  </a>
                  <a
                    href={openStreetMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xs">OSM</span>
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">OpenStreetMap</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-sm font-semibold text-gray-900">📌</p>
                  <p className="text-xs text-gray-500">Exact Location</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">📍</p>
                  <p className="text-xs text-gray-500">Mohakhali DOHS</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">🏢</p>
                  <p className="text-xs text-gray-500">3rd Floor</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">🚗</p>
                  <p className="text-xs text-gray-500">Parking Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download & Share Options */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            <a
              href="/map/map.png"
              download="The-Royal-Utilisation-Services-Location-Map.png"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              <Download className="h-4 w-4" />
              Download Map Image
            </a>
            <a
              href={`mailto:?subject=Location of The Royal Utilisation Services&body=Here's our office location:%0D%0A%0D%0A${OFFICE_ADDRESS}%0D%0AGPS: ${OFFICE_LAT}, ${OFFICE_LNG}%0D%0AGoogle Maps: ${googleMapsUrl}`}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Mail className="h-4 w-4" />
              Send via Email
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`The Royal Utilisation Services Office Location:\n\n${OFFICE_ADDRESS}\nGPS: ${OFFICE_LAT}, ${OFFICE_LNG}\nGoogle Maps: ${googleMapsUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-green-50 transition-colors text-sm"
            >
              <span className="text-green-600">💬</span>
              Share on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Close Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 z-50 p-3 bg-red-600 text-white rounded-full shadow-xl hover:bg-red-700 transition-colors"
        >
          <Minimize2 className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}