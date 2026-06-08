// components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
      if (!apiUrl) {
        throw new Error('Contact API URL is not configured');
      }

      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact us directly.');
      console.error('Contact form error:', error);
    }
  };

  const fieldClass =
    'w-full border-0 border-b border-white/35 bg-transparent px-0 py-3 text-sm font-semibold text-white outline-none transition-colors placeholder:text-transparent focus:border-red-500';
  const labelClass = 'block text-sm font-extrabold text-white';

  return (
    <div className="relative overflow-hidden bg-blue-950 px-6 py-8 md:px-9 md:py-10">
      <div className="pointer-events-none absolute right-0 top-0 grid grid-cols-3 gap-0 opacity-12">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="h-12 w-12 bg-white [clip-path:polygon(0_0,100%_0,100%_100%)]"
          />
        ))}
      </div>

      <div className="relative">
        <h2 className="max-w-xs text-3xl font-extrabold leading-none tracking-normal text-white md:text-4xl">
          Send us a message
        </h2>

        {status === 'success' && (
          <div className="mt-6 border border-green-200 bg-green-50 p-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-bold text-green-800">Message sent successfully.</p>
                <p className="text-sm text-green-700">We will get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 border border-red-200 bg-red-50 p-3">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-bold text-red-800">Error sending message</p>
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-7">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={fieldClass}
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={fieldClass}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="subject" className={labelClass}>
              Inquiry topic *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className={`${fieldClass} resize-y`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="group inline-flex border border-white/50 bg-transparent text-sm font-extrabold text-white transition-colors hover:border-red-600 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="px-6 py-4">
              {status === 'loading' ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending
                </span>
              ) : (
                'Submit'
              )}
            </span>
            <span className="flex w-14 items-center justify-center border-l border-white/50 transition-colors group-hover:border-white/40">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
