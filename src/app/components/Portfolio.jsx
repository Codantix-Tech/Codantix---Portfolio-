'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'HTML/CSS/JS',
    'React',
    'Angular',
    'React Native',
    'Node.js',
    'Next.js',
    'Python',
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'A scalable e-commerce solution with seamless payment integration, real-time inventory management, and a robust analytics dashboard. Use cases: online retail, digital marketplaces, subscription services. Achieved 35% increase in client conversion rates.',
      image: 'https://picsum.photos/800/450?random=1',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      categories: ['React', 'Node.js'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'SaaS Analytics Dashboard',
      description:
        'A real-time analytics platform with interactive visualizations, user management, and subscription billing. Use cases: business intelligence, performance tracking. Delivered 40% faster insights.',
      image: 'https://picsum.photos/800/450?random=2',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Chart.js', 'Tailwind CSS'],
      categories: ['Next.js'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'Creative Agency Website',
      description:
        'A visually stunning website with animations and portfolio showcase. Use cases: brand building, client acquisition. Increased user engagement by 50%.',
      image: 'https://picsum.photos/800/450?random=3',
      tech: ['HTML', 'CSS', 'JavaScript', 'Framer Motion', 'Sanity'],
      categories: ['HTML/CSS/JS'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'Healthcare Management App',
      description:
        'A patient management system with appointment scheduling, secure medical records, and telemedicine features. Improved patient satisfaction by 45%.',
      image: 'https://picsum.photos/800/450?random=4',
      tech: ['React Native', 'Firebase', 'Node.js', 'Socket.io'],
      categories: ['React Native', 'Node.js'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'Real Estate Platform',
      description:
        'A property listing platform with advanced search, 3D virtual tours, and agent management. Drove 60% more leads for clients.',
      image: 'https://picsum.photos/800/450?random=5',
      tech: ['Angular', 'Express', 'MongoDB', 'Mapbox'],
      categories: ['Angular'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'Learning Management System',
      description:
        'An educational platform with course creation, progress tracking, and interactive modules. Enhanced student engagement by 55%.',
      image: 'https://picsum.photos/800/450?random=6',
      tech: ['React', 'Django', 'PostgreSQL', 'AWS', 'Docker'],
      categories: ['React', 'Python'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'Django Web Application',
      description:
        'A robust web app with secure user authentication, REST API, and admin panel. Use cases: content management, e-learning platforms. Reduced development time by 30%.',
      image: 'https://picsum.photos/800/450?random=7',
      tech: ['Python', 'Django', 'PostgreSQL', 'Bootstrap', 'Celery'],
      categories: ['Python'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'AI-Powered Chatbot',
      description:
        'An intelligent chatbot with natural language processing. Use cases: customer support automation, virtual assistants. Achieved 85% response accuracy.',
      image: 'https://picsum.photos/800/450?random=8',
      tech: ['Python', 'TensorFlow', 'NLTK', 'Flask', 'React'],
      categories: ['Python', 'React'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'Machine Learning Predictive Model',
      description:
        'An ML model for forecasting and analytics. Use cases: sales forecasting, fraud detection. Improved prediction accuracy by 40%.',
      image: 'https://picsum.photos/800/450?random=9',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter', 'TensorFlow'],
      categories: ['Python'],
      demoUrl: '#',
      codeUrl: '#',
    },
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) =>
          project.categories.includes(selectedCategory)
        );

  return (
    <section id="portfolio" className="py-12 sm:py-20 bg-bgPrimary text-textSecondary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-extrabold text-white mb-4 sm:mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-sky-400 to-blue-800 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover our innovative projects built with cutting-edge technologies. Filter by category to explore our expertise in web, mobile, and AI-driven solutions that deliver measurable results for clients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300
                ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-sky-500 to-blue-700 text-white shadow-lg shadow-sky-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-sky-400'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.length === 0 ? (
            <p className="text-center text-slate-300 col-span-full">
              No projects found for this category.
            </p>
          ) : (
            filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-slate-900 rounded-xl border border-slate-800 overflow-hidden
                           hover:border-sky-500 transition-all duration-500 transform hover:-translate-y-1
                           hover:shadow-[0_10px_20px_rgba(14,165,233,0.2)]"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-sky-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-slate-800 text-slate-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href={project.demoUrl}
                      className="group/btn relative flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-700
                                 hover:from-sky-600 hover:to-blue-800 text-white px-4 sm:px-5 py-2 rounded-lg font-medium text-sm sm:text-base
                                 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10">View Live Demo</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" />
                      <div className="absolute inset-0 bg-sky-400/30 scale-0 group-hover/btn:scale-100 origin-center transition-transform duration-500 rounded-lg blur-md" />
                    </a>
                    <a
                      href={project.codeUrl}
                      className="group/btn relative flex items-center justify-center space-x-2 border-2 border-slate-600
                                 hover:border-sky-500 text-sky-400 hover:text-sky-300 px-4 sm:px-5 py-2 rounded-lg font-medium text-sm sm:text-base
                                 transition-all duration-300"
                    >
                      <span className="relative z-10">View Code</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" />
                      <div className="absolute inset-0 bg-sky-500/10 scale-0 group-hover/btn:scale-100 origin-center transition-transform duration-700 rounded-lg blur-sm" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;