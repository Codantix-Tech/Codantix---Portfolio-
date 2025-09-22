'use client';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <section className="min-h-screen bg-bgPrimary text-textSecondary relative overflow-hidden flex items-center justify-center">
      {/* Animated Mountains */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-full opacity-30"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 100C120 80 240 40 360 50C480 60 600 100 720 90C840 80 960 20 1080 30C1200 40 1320 90 1380 110L1440 120V120H0Z"
            fill="url(#mountain1)"
          >
            <animate
              attributeName="d"
              dur="20s"
              repeatCount="indefinite"
              values="
                M0 120L60 100C120 80 240 40 360 50C480 60 600 100 720 90C840 80 960 20 1080 30C1200 40 1320 90 1380 110L1440 120V120H0Z;
                M0 120L60 90C120 70 240 50 360 60C480 70 600 110 720 100C840 90 960 30 1080 40C1200 50 1320 100 1380 110L1440 120V120H0Z;
                M0 120L60 100C120 80 240 40 360 50C480 60 600 100 720 90C840 80 960 20 1080 30C1200 40 1320 90 1380 110L1440 120V120H0Z"
            />
          </path>
          <defs>
            <linearGradient id="mountain1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full h-full opacity-50"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 100L60 80C120 60 240 20 360 30C480 40 600 80 720 70C840 60 960 0 1080 10C1200 20 1320 70 1380 90L1440 100V100H0Z"
            fill="url(#mountain2)"
          >
            <animate
              attributeName="d"
              dur="25s"
              repeatCount="indefinite"
              values="
                M0 100L60 80C120 60 240 20 360 30C480 40 600 80 720 70C840 60 960 0 1080 10C1200 20 1320 70 1380 90L1440 100V100H0Z;
                M0 100L60 70C120 50 240 30 360 40C480 50 600 90 720 80C840 70 960 10 1080 20C1200 30 1320 80 1380 90L1440 100V100H0Z;
                M0 100L60 80C120 60 240 20 360 30C480 40 600 80 720 70C840 60 960 0 1080 10C1200 20 1320 70 1380 90L1440 100V100H0Z"
            />
          </path>
          <defs>
            <linearGradient id="mountain2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl sm:text-7xl font-poppins font-extrabold text-white mb-4 sm:mb-6">
          404 - <span className="bg-gradient-to-r from-sky-400 to-blue-800 bg-clip-text text-transparent">Page Not Found</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Oops! The page you’re looking for doesn’t exist. Let’s get you back to exploring Codantix Tech’s innovative solutions.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-700
                     hover:from-sky-600 hover:to-blue-800 text-white px-6 sm:px-8 py-3 rounded-lg font-medium text-sm sm:text-base
                     transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;