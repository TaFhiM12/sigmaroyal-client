'use client';

import { Copy, MapPin, Navigation, Share2 } from 'lucide-react';
import { useState } from 'react';

const OFFICE_LAT = 23.78024;
const OFFICE_LNG = 90.39459;
const OFFICE_ADDRESS =
  '3rd Floor, Achhia Manjil, House#383, Road No 28, Dhaka 1205';
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/Me6eCjeTcrvuUoJW8';
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${OFFICE_LAT},${OFFICE_LNG}`;
const OSM_URL = `https://www.openstreetmap.org/?mlat=${OFFICE_LAT}&mlon=${OFFICE_LNG}#map=17/${OFFICE_LAT}/${OFFICE_LNG}`;
const EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${OFFICE_LNG - 0.01}%2C${OFFICE_LAT - 0.006}%2C${OFFICE_LNG + 0.01}%2C${OFFICE_LAT + 0.006}&layer=mapnik&marker=${OFFICE_LAT}%2C${OFFICE_LNG}`;

export default function ContactMap() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'The Royal Utilisation Services (Pvt.) Ltd.',
      text: OFFICE_ADDRESS,
      url: GOOGLE_MAPS_URL,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fall back to copying the map link.
      }
    }

    copyToClipboard(GOOGLE_MAPS_URL);
  };

  return (
    <section className="border-t border-slate-200 bg-slate-100">
      <div className="grid lg:grid-cols-[380px_1fr]">
        <aside className="bg-blue-950 px-4 py-6 text-white md:px-8 lg:px-10">
          <div className="mb-4 inline-flex bg-red-600 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-white">
            Location
          </div>

          <h2 className="text-3xl font-extrabold leading-none tracking-normal text-white">
            Visit our corporate office
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-red-500" />
              <div>
                <p className="font-extrabold text-white">The Royal Utilisation Services (Pvt.) Ltd.</p>
                <p className="mt-1 leading-6 text-blue-100">{OFFICE_ADDRESS}</p>
                <p className="mt-2 font-mono text-xs font-bold text-blue-200">23.78024, 90.39459</p>
              </div>
            </div>

            <div className="grid gap-2">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-red-600 px-4 py-3 text-sm font-extrabold text-white transition-colors hover:bg-red-700"
              >
                Get directions
                <Navigation className="h-4 w-4" />
              </a>
              <a
                href={OSM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-white/20 px-4 py-3 text-sm font-bold text-blue-100 transition-colors hover:border-red-500 hover:text-white"
              >
                Open in OpenStreetMap
                <MapPin className="h-4 w-4" />
              </a>
              <button
                onClick={() => copyToClipboard(OFFICE_ADDRESS)}
                className="flex items-center justify-between border border-white/20 px-4 py-3 text-sm font-bold text-blue-100 transition-colors hover:border-red-500 hover:text-white"
              >
                {copied ? 'Copied address' : 'Copy address'}
                <Copy className="h-4 w-4" />
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-between border border-white/20 px-4 py-3 text-sm font-bold text-blue-100 transition-colors hover:border-red-500 hover:text-white"
              >
                Share location
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        <div className="h-[460px] min-h-[420px] bg-slate-200 lg:h-[620px]">
          <iframe
            title="The Royal Utilisation Services office location map"
            src={EMBED_URL}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
