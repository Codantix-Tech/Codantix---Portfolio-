"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Code2,
  Phone,
  ChevronDown,
  Smartphone,
  Video,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const middlePoint = window.innerHeight / 2;
      setIsScrolled(window.scrollY > middlePoint);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "#services", hasDropdown: true },
    { name: "Portfolio", href: "#portfolio" },
    {
      name: "Query",
      href: "#query",
      description: "Ask us anything about your project needs!",
    },
  ];

  const services = [
    {
      name: "SEO",
      href: "#seo",
      icon: <Smartphone className="w-5 h-5 text-accent" />,
    },
    {
      name: "UI/UX Design",
      href: "#uiux",
      icon: <Smartphone className="w-5 h-5 text-accent" />,
    },
    {
      name: "Web Dev",
      href: "#web",
      icon: <Smartphone className="w-5 h-5 text-accent" />,
    },
    {
      name: "Mobile Apps",
      href: "#mobile",
      icon: <Smartphone className="w-5 h-5 text-accent" />,
    },
    {
      name: "Video Editing",
      href: "#video",
      icon: <Video className="w-5 h-5 text-accent" />,
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
    <nav className="fixed top-0 left-0 right-0 w-full bg-bgPrimary/95 backdrop-blur-md border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-accent" />
            <span className="font-bold text-xl text-white">Codantix</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={toggleServicesDropdown}
                        className="text-textSecondary hover:text-accent px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            servicesDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {servicesDropdown && (
                        <div className="absolute top-full left-0 mt-2 bg-bgSecondary text-textSecondary rounded-md shadow-lg py-2 z-50 w-64">
                          <ul>
                            {services.map((service, idx) => (
                              <li key={idx}>
                                <a
                                  href={service.href}
                                  className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-700/40"
                                >
                                  {service.icon}
                                  <span className="text-sm">{service.name}</span>
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
                        className="text-textSecondary hover:text-accent px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item.name}
                      </a>
                      {item.description && (
                        <div className="absolute hidden group-hover:block bg-bgSecondary text-textSecondary text-xs p-2 rounded-md shadow-lg -bottom-12 left-1/2 transform -translate-x-1/2 w-48">
                          {item.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* CTA Button with professional animation */}
              <a
                href="#contact"
                className={`relative px-6 py-2 rounded-md text-sm font-semibold flex items-center space-x-2 overflow-hidden group transition-all duration-500 ${
                  isScrolled
                    ? "bg-gradient-to-r from-sky-400 to-blue-700 text-white shadow-md hover:shadow-lg hover:scale-105"
                    : "text-textSecondary border border-slate-600 hover:border-accent"
                }`}
              >
                <Phone className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative z-10 group-hover:text-white">
                  Schedule Call
                </span>
                {/* Subtle gradient reveal effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-textSecondary hover:text-accent"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-bgSecondary border-t border-slate-800 text-textSecondary">
          <ul className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700/50 hover:text-accent"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="block w-full text-center px-6 py-3 mt-2 rounded-md bg-gradient-to-r from-sky-400 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Schedule Call
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
