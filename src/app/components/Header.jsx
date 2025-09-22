'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Phone, ChevronDown, ChevronLeft, Smartphone, Video } from 'lucide-react';

// Theme color constants
const theme = {
  primary: 'sky-500',
  secondary: 'slate-900',
  accent: 'sky-400',
  textPrimary: 'white',
  textSecondary: 'slate-400',
  bgPrimary: 'slate-900',
  bgSecondary: 'slate-800',
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const middlePoint = windowHeight / 2;
      setIsScrolled(scrollPosition > middlePoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Services', href: '#services', hasDropdown: true },
    { name: 'Portfolio', href: '#portfolio' },
    { 
      name: 'Query', 
      href: '#query', 
      description: 'Ask us anything about your project needs!' 
    },
  ];

  const services = [
    { 
      name: 'Search Engine Optimization (SEO)', 
      href: 'https://digipexsolutions.com/search-engine-optimization-seo/', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-6 h-6">
          <g transform="translate(-44.187 -2137.13)" fill="none">
            <g transform="translate(65.1 242.956)">
              <path fill="#38bdf8" d="M40.588 1945.764v3.455a3.435 3.435 0 0 1-3.43 3.454h-52.14c-1.901 0-3.46-1.54-3.431-3.454l.051-3.455" />
              <path stroke="#0ea5e9" strokeLinejoin="round" d="M40.588 1945.764v3.455a3.435 3.435 0 0 1-3.43 3.454h-52.14c-1.901 0-3.46-1.54-3.431-3.454l.051-3.455" />
              <path fill="#f1f5f9" d="M38.557 1927.8a2.748 2.748 0 0 0-2.745-2.764h-49.396a2.748 2.748 0 0 0-2.744 2.764l-2.032 17.964c0 2.073 1.137 4.146 3.79 4.146h50.957c2.656 0 4.201-2.073 4.201-4.146z" />
              <path fill="#38bdf8" d="m31.441 1925.227 1.373 21.919h-43.817l1.372-21.919" />
              <path fill="#0ea5e9" d="m-10.132 1925.328-1.371 22.318h44.316l-.154-1.972H-8.313c-1.1 0-1.04-.993-1.04-.993l1.158-19.353z" />
              <path stroke="#0ea5e9" d="m-13.385 1934.018-.412 4.146" />
              <ellipse cx="-14.068" cy="1940.237" fill="#0ea5e9" rx=".686" ry=".691" />
              <path fill="#e0f2fe" d="M35.933 1925.068a2.74 2.74 0 0 1 2.447 2.732l2.031 17.965c0 2.073-1.137 4.145-3.79 4.145h-50.958c-1.632 0-2.835-.787-3.523-1.873.337.08.692.136 1.078.136h50.957c2.654 0 3.79-2.073 3.79-4.146l-.044-.385c.023-.203.043-.408.043-.613l-2.031-17.961z" />
              <path fill="#0ea5e9" d="m31.441 1925.227 1.373 21.919h-43.817" />
              <path fill="#e0f2fe" d="M-13.882 1925.068a2.74 2.74 0 0 0-2.447 2.732l-2.031 17.965c0 2.073 1.137 4.145 3.79 4.145h50.958c1.632 0 2.835-.787 3.523-1.873a4.569 4.569 0 0 1-1.078.136h-50.957c-2.654 0-3.79-2.073-3.79-4.146.005-.664.012-.7 0-.998z" />
              <path fill="#0ea5e9" d="m-8.156 1945.675-2.848 1.47h43.777l-.115-1.47H-8.156z" />
              <path stroke="#0ea5e9" strokeLinecap="round" strokeLinejoin="round" d="m31.441 1925.227 1.373 21.919h-43.817l1.372-21.919" />
              <path stroke="#0ea5e9" d="M38.557 1927.8a2.748 2.748 0 0 0-2.745-2.764h-49.396a2.748 2.748 0 0 0-2.744 2.764l-2.032 17.964c0 2.073 1.137 4.146 3.79 4.146h50.957c2.656 0 4.201-2.073 4.201-4.146z" />
              <ellipse cx="-248.555" cy="1963.387" fill="#38bdf8" rx="1.377" ry="1.397" transform="matrix(.99978 .02112 .1447 .98948 0 0)" />
              <path fill="#0ea5e9" d="M35.328 1935.592c-1.036-.022-1.755.812-1.605 1.84.15 1.03 1.12 1.9 2.155 1.921 1.037.022 1.756-.812 1.606-1.84-.15-1.03-1.12-1.899-2.156-1.92zm.146.997c.485.01.93.404 1.002.902.073.498-.26.875-.743.865-.485-.01-.93-.404-1.002-.902-.073-.498.26-.875.743-.864z" />
            </g>
            <path fill="#0ea5e9" d="M66.188 2157.63h20c.83 0 1.5.669 1.5 1.5v19.923c0 .83-.67 1.5-1.5 1.5h-20c-.831 0-1.5-.67-1.5-1.5v-19.923c0-.831.669-1.5 1.5-1.5z" />
            <path fill="#38bdf8" d="M86.188 2180.553c.83 0 1.5-.669 1.5-1.5v-19.923c0-.831-.67-1.5-1.5-1.5v19.923c0 .831-.67 1.5-1.5 1.5h-20c0 .831.669 1.5 1.5 1.5h20z" />
            <path fill="#0ea5e9" d="M66.188 2157.63c-.831 0-1.5.669-1.5 1.5v19.923c0 .831.669 1.5 1.5 1.5v-19.923c0-.831.669-1.5 1.5-1.5h20c0-.831-.67-1.5-1.5-1.5h-20z" />
            <path fill="#0ea5e9" d="M64.688 2157.129a.5.5 0 0 0-.5.5v22.924a.5.5 0 0 0 .5.5h23a.5.5 0 0 0 .5-.5v-22.924a.5.5 0 0 0-.5-.5h-23zm.5 1h22v21.924h-22v-21.924z" />
            <path fill="none" stroke="#f1f5f9" strokeLinecap="round" strokeLinejoin="round" d="M75.045 2166.461v4m1.014-3.993h-1m-.007 4h1m-.07 0c1.15 0 2.077-.892 2.077-2s-.926-2-2.077-2m5.077 0h2m-1 4h-2m2-2c.554 0 1 .446 1 1s-.446 1-1 1m0-2h-1m0 0c-.554 0-1-.446-1-1s.446-1 1-1m-12.01 3.994 2-4 2 4m-3.295-.994h2.69" />
            <path fill="#f1f5f9" d="M76.244 2173.163a.994.994 0 0 0-.702 1.222l1.034 3.857-1.08.29c-.466.124-.725.654-.582 1.189l.023.088c.003.01.006.01.006.01a4.992 4.97 75 0 0 3.49 3.435 4.992 4.97 75 0 0 4.801-1.286 4.992 4.97 75 0 0 1.284-4.81l-.26-.974c-.144-.534-.634-.863-1.1-.739l-4.92 1.319-.775-2.893a.994.994 0 0 0-1.219-.707z" />
            <path fill="#e0f2fe" d="M83.506 2175.432a.773.773 0 0 0-.348.014l-.748.202c.157.133.287.31.348.537l.262.974a4.996 4.996 0 0 1-1.285 4.809 4.952 4.952 0 0 1-2.764 1.398 4.95 4.95 0 0 0 4.264-1.398 4.996 4.996 0 0 0 1.283-4.809l-.26-.974c-.107-.401-.411-.687-.752-.752z" />
            <path fill="#0ea5e9" d="M76.244 2172.664a.5.5 0 0 0-.129.017l.13-.017zm-.129.017a1.505 1.505 0 0 0-1.056 1.834l.26.963.515 1.928.129.482-.598.16c-.763.205-1.137 1.041-.933 1.801l.023.088a.5.5 0 0 0 .004.016.518.518 0 0 0 .033.086c.017.033.078.113.078.113l.016.012c.586 1.73 1.947 3.094 3.717 3.572a5.453 5.453 0 0 0 5.285-1.415 5.498 5.498 0 0 0 1.414-5.292l-.262-.974c-.203-.76-.948-1.296-1.71-1.092l-4.438 1.188-.647-2.409a1.503 1.503 0 0 0-1.83-1.06zm.258.965a.485.485 0 0 1 .607.353l.776 2.893a.5.5 0 0 0 .611.354l4.922-1.319c.168-.045.402.078.484.387l.262.973a4.494 4.494 0 0 1-1.154 4.328 4.45 4.45 0 0 1-4.317 1.156 4.494 4.494 0 0 1-3.14-3.092.5.5 0 0 0-.016-.047.5.5 0 0 0-.002 0l-.01-.037c-.082-.308.061-.533.229-.578l1.08-.289a.5.5 0 0 0 .354-.613l-.13-.48-.128-.483-.518-1.928-.258-.965a.484.484 0 0 1 .348-.61z" />
          </g>
        </svg>
      )
    },
    { 
      name: 'UI/UX Design', 
      href: 'https://digipexsolutions.com/ui-ux-design/', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
          <rect width="462" height="315" x="50" y="123.5" fill="#38bdf8" rx="17.5" ry="17.5" />
          <path fill="#0ea5e9" d="M67.5 123.5A17.52 17.52 0 0 0 50 141v267.5h414.5A17.52 17.52 0 0 0 482 391V123.5Z" />
          <rect width="462" height="315" y="73.5" fill="#38bdf8" rx="17.5" ry="17.5" />
          <path fill="#0ea5e9" d="M20 111a17.52 17.52 0 0 1 17.5-17.5H462V91a17.52 17.52 0 0 0-17.5-17.5h-427A17.52 17.52 0 0 0 0 91v280a17.52 17.52 0 0 0 17.5 17.5H20Z" />
          <rect width="145" height="55" x="287" y="303.5" fill="#0ea5e9" rx="17.5" ry="17.5" />
          <rect width="145" height="55" x="277" y="293.5" fill="#38bdf8" rx="17.5" ry="17.5" />
          <path fill="#0ea5e9" d="M287 341v-20a17.52 17.52 0 0 1 17.5-17.5h110a17.43 17.43 0 0 1 6.31 1.19 17.54 17.54 0 0 0-16.31-11.19h-110A17.52 17.52 0 0 0 277 311v20a17.54 17.54 0 0 0 11.19 16.31A17.43 17.43 0 0 1 287 341Z" />
          <path fill="#f1f5f9" d="M462 123.5V91a17.52 17.52 0 0 0-17.5-17.5h-427A17.52 17.52 0 0 0 0 91v32.5Z" />
          <path fill="#e0f2fe" d="M20 111a17.52 17.52 0 0 1 17.5-17.5H462V91a17.52 17.52 0 0 0-17.5-17.5h-427A17.52 17.52 0 0 0 0 91v32.5h20Z" />
          <path fill="#38bdf8" d="M190.45 254.33a7.5 7.5 0 0 1-5.45-12.68l22.1-23.15-22.1-23.15A7.5 7.5 0 1 1 195.88 185l27.05 28.33a7.52 7.52 0 0 1 0 10.36L195.88 252a7.45 7.45 0 0 1-5.43 2.33zm-115.9 0a7.45 7.45 0 0 1-5.43-2.33l-27.05-28.32a7.52 7.52 0 0 1 0-10.36L69.12 185A7.5 7.5 0 1 1 80 195.35L57.87 218.5 80 241.65a7.5 7.5 0 0 1-5.42 12.68zM146 268.5a7.49 7.49 0 0 1-7.14-5.23l-27-85a7.5 7.5 0 1 1 14.29-4.54l27 85a7.49 7.49 0 0 1-7.15 9.77z" />
          <path fill="#f1f5f9" d="M281 178.5h-13.5a7.5 7.5 0 0 1 0-15H281a7.5 7.5 0 0 1 0 15zm-36.5 170h-197a7.5 7.5 0 0 1 0-15h197a7.5 7.5 0 0 1 0 15zm0-40H93a7.5 7.5 0 0 1 0-15h151.5a7.5 7.5 0 0 1 0 15zm-190 0h-7a7.5 7.5 0 0 1 0-15h7a7.5 7.5 0 0 1 0 15zm360-130H316a7.5 7.5 0 0 1 0-15h98.5a7.5 7.5 0 0 1 0 15zm0 40h-147a7.5 7.5 0 0 1 0-15h147a7.5 7.5 0 0 1 0 15zm0 45h-147a7.5 7.5 0 0 1 0-15h147a7.5 7.5 0 0 1 0 15z" />
          <path fill="#38bdf8" d="M384.5 106h-10a7.5 7.5 0 0 1 0-15h10a7.5 7.5 0 0 1 0 15zm40 0h-10a7.5 7.5 0 0 1 0-15h10a7.5 7.5 0 0 1 0 15z" />
        </svg>
      )
    },
    { 
      name: 'Website Design and Development', 
      href: 'https://digipexsolutions.com/website-design-and-development/', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-6 h-6">
          <g fill="none">
            <path fill="#38bdf8" d="M44 63H20a1 1 0 0 1 0-2h24a1 1 0 0 1 0 2zm9-60H11a1 1 0 0 0-1 1v7h44V4a1 1 0 0 0-1-1zM31 8H14a1 1 0 0 1 0-2h17a1 1 0 0 1 0 2zm6 1a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm6 0a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm6 0a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm-39 4v20a1 1 0 0 0 1 1h42a1 1 0 0 0 1-1V13zm5.83 13.45a1 1 0 0 1-.28 1.38.94.94 0 0 1-.55.17 1 1 0 0 1-.83-.45l-2-3a1 1 0 0 1 0-1.1l2-3a1 1 0 0 1 1.66 1.1L14.2 24zM21 20.38l-2 7.74a1 1 0 0 1-1 .75 1.07 1.07 0 0 1-.25 0 1 1 0 0 1-.75-1.25l2-7.74a1 1 0 0 1 1.94.5zm4.86 4.17-2 3A1 1 0 0 1 23 28a.94.94 0 0 1-.55-.17 1 1 0 0 1-.28-1.38L23.8 24l-1.63-2.45a1 1 0 1 1 1.66-1.1l2 3a1 1 0 0 1 0 1.1zM52 29a3 3 0 0 1-3 3H32a3 3 0 0 1-3-3V19a3 3 0 0 1 3-3h17a3 3 0 0 1 3 3z" />
            <path fill="#38bdf8" d="M59 12v27H5V12a4.94 4.94 0 0 1 3-4.56V33a3 3 0 0 0 3 3h42a3 3 0 0 0 3-3V7.44A4.94 4.94 0 0 1 59 12ZM40.89 61H23.11l3.43-10h10.92l3.43 10z" />
            <path fill="#38bdf8" d="M5 41v3a5 5 0 0 0 5 5h44a5 5 0 0 0 5-5v-3zm28 5h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm5.13-16h-5.72L35 27.44a1 1 0 0 1 .81-.3 1 1 0 0 1 .73.45zm10.64 0h-8.24l-1.28-1.93 3-3.64a1 1 0 0 1 .76-.36.85.85 0 0 1 .75.34z" />
            <path fill="#38bdf8" d="M49 18H32a1 1 0 0 0-1 1v9.59L33.56 26a3 3 0 0 1 4.51.33l2.67-3.2A3 3 0 0 1 43 22.07a3 3 0 0 1 2.24 1l4.76 5.3V19a1 1 0 0 0-1-1Zm-13 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z" />
          </g>
        </svg>
      )
    },
    { 
      name: 'Mobile Application', 
      href: '#mobile', 
      icon: <Smartphone className="w-6 h-6 text-sky-400" />
    },
    { 
      name: 'Video Editing Services', 
      href: '#video', 
      icon: <Video className="w-6 h-6 text-sky-400" />
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (servicesDropdown) setServicesDropdown(false);
  };

  const toggleServicesDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setServicesDropdown(!servicesDropdown);
  };

  return (
    <nav className={`fixed top-0 w-full bg-${theme.bgPrimary}/95 backdrop-blur-sm border-b border-${theme.bgSecondary} z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-sky-500" />
            <span className="font-bold text-xl text-white">Codantix</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <>
                      <a
                        href="#"
                        onClick={toggleServicesDropdown}
                        className="text-slate-300 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesDropdown ? 'rotate-180' : ''}`} />
                      </a>
                      {servicesDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-slate-800 text-slate-300 rounded-md shadow-lg py-2 z-50 w-80">
                          <ul className="elementor-icon-list-items">
                            {services.map((service, index) => (
                              <li key={index} className="elementor-icon-list-item">
                                <a
                                  href={service.href}
                                  className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-700 transition-colors duration-200 w-full"
                                >
                                  <span className="elementor-icon-list-icon">
                                    {service.icon}
                                  </span>
                                  <span className="text-sm font-medium text-slate-300">{service.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <a
                        href={item.href}
                        className="text-slate-300 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                      {item.description && (
                        <div className="absolute hidden group-hover:block bg-slate-800 text-slate-300 text-xs p-2 rounded-md shadow-lg -bottom-12 left-1/2 transform -translate-x-1/2 w-48">
                          {item.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              <a
                href="#contact"
                className={`relative px-6 py-2 rounded-md text-sm font-semibold transition-all duration-300 flex items-center space-x-2 overflow-hidden group ${
                  isScrolled
                    ? `bg-${theme.primary} hover:bg-sky-600 text-white animate-pulse shadow-lg shadow-sky-500/25`
                    : 'text-slate-300 hover:text-sky-400 border border-slate-600 hover:border-sky-500'
                }`}
              >
                <Phone className={`h-4 w-4 transition-transform duration-300 ${isScrolled ? 'group-hover:rotate-12' : ''}`} />
                <span>Schedule Call</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-400 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`fixed inset-0 bg-${theme.bgPrimary} z-40 md:hidden transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex">
            <div className="w-64 bg-slate-800 p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Code2 className="h-6 w-6 text-sky-500" />
                  <span className="font-bold text-white">Codantix</span>
                </div>
                <button onClick={toggleMenu} className="text-slate-400 hover:text-white">
                  <ChevronLeft className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={toggleServicesDropdown}
                          className="text-slate-300 hover:text-sky-400 block py-2 px-3 rounded-md text-base font-medium transition-colors duration-200 w-full text-left flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {servicesDropdown && (
                          <div className="ml-4 space-y-2 mt-2">
                            <ul className="elementor-icon-list-items">
                              {services.map((service, index) => (
                                <li key={index} className="elementor-icon-list-item">
                                  <a
                                    href={service.href}
                                    className="flex items-center space-x-3 px-4 py-2 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors duration-200 w-full"
                                    onClick={toggleMenu}
                                  >
                                    <span className="elementor-icon-list-icon">
                                      {service.icon}
                                    </span>
                                    <span className="text-sm font-medium text-slate-300">{service.name}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.href}
                        className="text-slate-300 hover:text-sky-400 block py-2 px-3 rounded-md text-base font-medium transition-colors duration-200"
                        onClick={toggleMenu}
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
                <a
                  href="#contact"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-md text-center font-semibold transition-colors duration-200 mt-4 block"
                  onClick={toggleMenu}
                >
                  Schedule Call
                </a>
              </nav>
            </div>
            <div className="flex-1" onClick={toggleMenu}></div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;