'use client';
import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content:
        'Codantix transformed our vision into a stunning, functional web application. Their attention to detail and technical expertise exceeded our expectations, boosting our user engagement by 40%.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateLabs',
      content:
        'Working with Rafay and the Codantix team was a game-changer. They delivered our SaaS platform ahead of schedule with exceptional quality, saving us 20% in development costs.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, CreativeSpace',
      content:
        'The portfolio website Codantix created for us has increased our client inquiries by 300%. Their design sense and innovative approach are truly remarkable.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-20 bg-bgPrimary text-textSecondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-extrabold text-white mb-4 sm:mb-6">
            What Our{' '}
            <span className="bg-gradient-to-r from-sky-400 to-blue-800 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Hear directly from our clients about how Codantix delivers innovative solutions, exceptional quality, and measurable results that drive success.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-slate-900 rounded-xl border border-slate-800 overflow-hidden
                         hover:border-sky-500 transition-all duration-500 transform hover:-translate-y-1
                         hover:shadow-[0_10px_20px_rgba(14,165,233,0.2)]"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="p-4 sm:p-6 flex flex-col relative z-10">
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-sky-400 mb-4" />
                <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6 leading-relaxed italic flex-grow">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-sky-400 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.431 8.332 1.209-6.001 5.853 1.416 8.26L12 18.897l-7.415 3.903 1.416-8.26-6.001-5.853 8.332-1.209L12 .587z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;