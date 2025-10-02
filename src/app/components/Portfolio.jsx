"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ArrowRight, ArrowLeft, Code, Filter, Sparkles } from "lucide-react";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const safeSrc = (src) => (typeof src === "string" ? encodeURI(src) : src);

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState(""); // empty = not chosen
  const [mediaIndexMap, setMediaIndexMap] = useState({});
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [cardWidth, setCardWidth] = useState(320);
  const [startIndex, setStartIndex] = useState(0);
  const gap = 16;

  const categories = useMemo(
    () => [
      { value: "", label: "Please select an option" },
      { value: "All", label: "All" },
      { value: "HTML/CSS/JS", label: "HTML/CSS/JS" },
      { value: "React", label: "React" },
      { value: "Angular", label: "Angular" },
      { value: "React Native", label: "React Native" },
      { value: "Node.js", label: "Node.js" },
      { value: "Next.js", label: "Next.js" },
      { value: "Python", label: "Python" },
      { value: "API", label: "API" },
    ],
    []
  );

  const projects = useMemo(
    () => [
      {
        title: "E-Commerce Platform",
        description: "Scalable e-commerce with real-time inventory and analytics.",
        media: ["/E-com.png"],
        tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
        categories: ["React", "Node.js"],
        demoUrl: "#",
        codeUrl: "#",
      },
      {
        title: "SaaS Analytics Dashboard",
        description: "Real-time charts, user management and billing flows.",
        media: ["/Saas.png", "/Saas-2.png"],
        tech: ["Next.js", "TypeScript", "Postgres", "Chart.js"],
        categories: ["Next.js"],
        demoUrl: "#",
        codeUrl: "#",
      },
      {
        title: "Creative Agency Website",
        description: "Visual site with animations and portfolio showcase.",
        media: ["/Agency Website.png"],
        tech: ["HTML", "CSS", "JavaScript"],
        categories: ["HTML/CSS/JS"],
        demoUrl: "#",
        codeUrl: "#",
      },
      {
        title: "FinTech Mobile Wallet",
        description: "Secure wallet with instant transfers and QR payments.",
        media: [
          "https://images.pexels.com/photos/4386372/pexels-photo-4386372.jpeg?w=900",
        ],
        tech: ["React Native", "Node.js", "GraphQL"],
        categories: ["React Native", "Node.js"],
        demoUrl: "#",
        codeUrl: "#",
      },
      {
        title: "Portfolio Website",
        description: "SEO-friendly portfolio with smooth animations.",
        media: [
          "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?w=900",
        ],
        tech: ["Next.js", "Tailwind", "Framer Motion"],
        categories: ["Next.js"],
        demoUrl: "#",
        codeUrl: "#",
      },
      {
        title: "IoT Smart Home Dashboard",
        description: "Control panel for lights, thermostats & cameras.",
        media: [
          "https://images.pexels.com/photos/3944302/pexels-photo-3944302.jpeg?w=900",
        ],
        tech: ["Angular", "Socket.io", "MongoDB"],
        categories: ["Angular", "Node.js"],
        demoUrl: "#",
        codeUrl: "#",
      },
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") return projects;
    return projects.filter((p) => p.categories.includes(selectedCategory));
  }, [selectedCategory, projects]);

  // responsive visibleCount
  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    setViewportWidth(window.innerWidth);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (viewportWidth >= 1024) setVisibleCount(3);
    else if (viewportWidth >= 640) setVisibleCount(2);
    else setVisibleCount(1);
  }, [viewportWidth]);

  // recompute cardWidth
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const compute = () => {
      const w = container.clientWidth;
      const totalGap = gap * (visibleCount - 1);
      const computed = Math.floor((w - totalGap) / visibleCount);
      setCardWidth(Math.max(220, computed));
    };
    compute();
    const obs = new ResizeObserver(compute);
    obs.observe(container);
    return () => obs.disconnect();
  }, [visibleCount, gap]);

  // scroll tracking
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let raf = null;
    const unit = cardWidth + gap;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const idx = Math.round(scroller.scrollLeft / unit);
        setStartIndex(clamp(idx, 0, Math.max(0, filteredProjects.length - 1)));
      });
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cardWidth, gap, filteredProjects.length]);

  const scrollToIndex = useCallback(
    (index) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const unit = cardWidth + gap;
      const maxStart = Math.max(0, filteredProjects.length - visibleCount);
      const idx = clamp(index, 0, maxStart);
      scroller.scrollTo({ left: idx * unit, behavior: "smooth" });
    },
    [cardWidth, gap, filteredProjects.length, visibleCount]
  );

  const handlePrev = () => scrollToIndex(startIndex - 1);
  const handleNext = () => scrollToIndex(startIndex + 1);

  const mediaIndexFor = (title) => mediaIndexMap[title] ?? 0;

  return (
    <section
      id="portfolio"
      className="bg-bgPrimary text-textSecondary py-8 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-3 py-1.5 mb-3">
            <Sparkles className="h-3 w-3 text-accent" />
            <span className="text-accent text-xs font-medium">
              Our Work Showcase
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-800 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-textSecondary max-w-2xl mx-auto leading-relaxed">
            Swipe or click to explore — each card can contain multiple media like an Instagram post.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="flex items-center gap-3 bg-bgSecondary rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-accent" />
              <span className="text-textSecondary text-sm font-medium">
                Filter by Technology:
              </span>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-sm font-medium
                         bg-gradient-to-r from-sky-900 to-blue-900 text-white
                         border border-sky-600 rounded-lg shadow-sm
                         focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/50
                         transition-all duration-300 hover:border-sky-400 hover:shadow-md cursor-pointer"
            >
              {categories.map((c) => (
                <option
                  key={c.value}
                  value={c.value}
                  className="bg-sky-950 text-white"
                >
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conditional rendering */}
        {!selectedCategory ? (
          <div className="text-center py-12">
            <p className="text-lg sm:text-xl font-medium text-textSecondary">
              ✨ Please select a category above to explore our projects.
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg sm:text-xl font-medium text-textSecondary">
              🚧 No projects found for this category.
            </p>
          </div>
        ) : (
          <div className="relative" ref={containerRef}>
            {/* Left arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-slate-800/60 hover:bg-slate-800 text-white p-2 rounded-full z-20 shadow-md hidden sm:inline-flex"
              style={{ backdropFilter: "blur(6px)" }}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Scrollable row */}
            <div
              ref={scrollerRef}
              className="flex gap-[16px] overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 scroll-smooth"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {filteredProjects.map((project, idx) => {
                const media = project.media?.length ? project.media : [];
                const mediaIndex = mediaIndexFor(project.title);

                return (
                  <article
                    key={project.title + idx}
                    className="scroll-snap-center flex-shrink-0 bg-bgSecondary rounded-lg border border-slate-600 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                    style={{
                      width: `${cardWidth}px`,
                      minWidth: `${cardWidth}px`,
                      maxWidth: `${cardWidth}px`,
                      scrollSnapAlign: "center",
                    }}
                  >
                    {/* Media */}
                    <div className="relative h-[180px] bg-black/5 overflow-hidden">
                      {media[mediaIndex]?.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video
                          src={safeSrc(media[mediaIndex])}
                          className="w-full h-full object-cover"
                          controls
                        />
                      ) : (
                        <img
                          src={safeSrc(media[mediaIndex])}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-3 flex flex-col h-[180px]">
                      <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-xs text-textSecondary mb-2 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2 pb-2 border-b border-slate-600/50">
                        {project.tech?.map((t, ti) => (
                          <span
                            key={ti}
                            className="bg-sky-950 text-sky-200 px-1 py-0.5 rounded-md text-[10px] font-medium border border-sky-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex gap-2">
                        <a
                          href={project.demoUrl}
                          className="flex-1 bg-gradient-to-r from-sky-500 to-blue-700 text-white px-2 py-2 rounded-md font-semibold text-xs text-center"
                        >
                          Live Demo
                        </a>
                        <a
                          href={project.codeUrl}
                          className="w-14 flex items-center justify-center border border-slate-600 rounded-md text-textSecondary hover:text-accent"
                        >
                          <Code className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNext}
              aria-label="Next"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-slate-800/60 hover:bg-slate-800 text-white p-2 rounded-full z-20 shadow-md hidden sm:inline-flex"
              style={{ backdropFilter: "blur(6px)" }}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
