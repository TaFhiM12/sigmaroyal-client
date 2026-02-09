// components/clients/ClientTestimonials.tsx
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "The Royal Utilisation Services has been our trusted partner for over a decade. Their expertise in energy infrastructure is unmatched, delivering projects on time with exceptional quality standards.",
    name: "Md. Hasan Ali",
    position: "Director, PetroEnergy Bangladesh",
    rating: 5
  },
  {
    quote: "Working with this team has transformed our LPG distribution network. Their innovative solutions and commitment to safety have significantly improved our operational efficiency.",
    name: "Ayesha Rahman",
    position: "CEO, GasTech Solutions",
    rating: 5
  }
];

export default function ClientTestimonials() {
  return (
    <section className="bg-linear-to-b from-white to-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Quote className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold text-red-700 tracking-wider">
              CLIENT TESTIMONIALS
            </span>
            <Quote className="h-5 w-5 text-red-600" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-red-600">Clients Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-6">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 bg-linear-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}