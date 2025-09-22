'use client';
import React from 'react';
import { Code2, Github, Linkedin, Mail, Heart, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bgPrimary border-t border-slate-800 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code2 className="h-8 w-8 text-sky-400" />
              <span className="font-poppins font-extrabold text-xl text-white">Codantix</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              We engineer scalable digital experiences that drive business growth and user engagement.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-sky-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-sky-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@codantix.com"
                className="w-10 h-10 bg-slate-800 hover:bg-sky-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+923352184071"
                className="w-10 h-10 bg-slate-800 hover:bg-sky-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
            <p className="text-slate-300 mt-4 text-sm sm:text-base">
              Call us: <a href="tel:+923352184071" className="hover:text-sky-400 transition-colors duration-300">+92 335 2184071</a>
            </p>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-white font-poppins font-semibold text-lg sm:text-xl mb-4">Services</h3>
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base">
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors duration-300">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors duration-300">
                  SaaS Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors duration-300">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors duration-300">
                  API Development
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-white font-poppins font-semibold text-lg sm:text-xl mb-4">Company</h3>
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base">
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-sky-400 transition-colors duration-300">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sky-400 transition-colors duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors duration-300">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 Codantix. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm mt-4 sm:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by the Codantix team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;