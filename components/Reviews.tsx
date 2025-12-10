import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <section className="py-24 bg-medical-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-medical-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-medical-100 text-medical-800 text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-medical-500 text-medical-500" />
            <span>5.0 Durchschnittsbewertung</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Patientenmeinungen
          </h2>
          <p className="text-slate-600">
            Wir legen größten Wert auf eine persönliche und kompetente Betreuung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-6 text-medical-300">
                <Quote size={40} strokeWidth={1} className="fill-medical-50" />
              </div>
              
              <h3 className="font-display font-semibold text-xl text-slate-900 mb-3">
                {review.title}
              </h3>
              
              <p className="text-slate-600 mb-6 flex-grow italic leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="border-t border-slate-100 pt-6 mt-auto">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-medium text-slate-900 block">{review.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};