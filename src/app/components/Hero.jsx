'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import * as THREE from 'three';
import { Canvas, extend } from '@react-three/fiber';
import { Torus, Points, OrbitControls, shaderMaterial } from '@react-three/drei';
import Image from 'next/image';
import IdeaBulbCursor from './IdeaBulbCursor';

// Custom shader material for particles
const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uHover: 0,
    uColor: new THREE.Color('#38bdf8'), // sky-400
    uSize: 0.02,
    uOpacity: 0.5,
  },
  `
    attribute float offset;
    uniform float uTime;
    uniform float uHover;
    uniform float uSize;
    void main() {
      vec3 pos = position;
      if (uHover > 0.5) {
        float pulse = sin(uTime * 2.0 + offset) * 0.1;
        pos *= (1.0 + pulse * 0.2);
      }
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = uSize * (300.0 / -modelViewMatrix[3][2]);
    }
  `,
  `
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uHover;
    void main() {
      float alpha = uOpacity * (uHover > 0.5 ? 0.8 : 0.5);
      gl_FragColor = vec4(uColor, alpha);
    }
  `
);
extend({ ParticleMaterial });

function Scene({ isHovered }) {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [particlePositions, setParticlePositions] = useState(null);
  const [particleOffsets, setParticleOffsets] = useState(null);

  useEffect(() => {
    const numParticles = 10;
    const positions = new Float32Array(numParticles * 3);
    const offsets = new Float32Array(numParticles);
    for (let i = 0; i < numParticles; i++) {
      const radius = 1.5;
      const theta = (i / numParticles) * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      offsets[i] = Math.random() * 0.1;
    }
    setParticlePositions(positions);
    setParticleOffsets(offsets);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => [prev[0] + 0.01, prev[1] + 0.01, prev[2] + 0.01]);
    }, 32);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      <Torus args={[1, 0.4, 8, 32]} rotation={rotation} scale={isHovered ? 1.1 : 1}>
        <meshStandardMaterial color="#0ea5e9" wireframe />
      </Torus>
      {particlePositions && particleOffsets && (
        <Points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={particlePositions}
              count={particlePositions.length / 3}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-offset"
              array={particleOffsets}
              count={particleOffsets.length}
              itemSize={1}
            />
          </bufferGeometry>
          <particleMaterial
            uTime={Date.now() * 0.001}
            uHover={isHovered ? 1.0 : 0.0}
            uColor="#38bdf8"
            uSize={0.02}
            uOpacity={0.5}
            transparent
            attach="material"
          />
        </Points>
      )}
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

function Hero({ counters = { projects: 50, leads: 10000, support: 24 } }) {
  const [is3DHovered, setIs3DHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [contextLost, setContextLost] = useState(false);
  const [animatedProjects, setAnimatedProjects] = useState(0);
  const [animatedLeads, setAnimatedLeads] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            let projectCount = 0;
            const projectInterval = setInterval(() => {
              if (projectCount < counters.projects) {
                projectCount += Math.ceil((counters.projects - projectCount) / 10);
                setAnimatedProjects(projectCount);
              } else {
                clearInterval(projectInterval);
                setAnimatedProjects(counters.projects);
              }
            }, 50);

            let leadsCount = 0;
            const leadsInterval = setInterval(() => {
              if (leadsCount < counters.leads) {
                leadsCount += Math.ceil((counters.leads - leadsCount) / 50);
                setAnimatedLeads(leadsCount);
              } else {
                clearInterval(leadsInterval);
                setAnimatedLeads(counters.leads);
              }
            }, 20);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, [counters.projects, counters.leads]);

  return (
    <section
      id="home"
      className="bg-bgPrimary text-textSecondary pt-32 md:pt-40 pb-10 md:pb-16 flex items-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10"
        onMouseEnter={() => setIs3DHovered(true)}
        onMouseLeave={() => setIs3DHovered(false)}
      >
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-bgPrimary">
              <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          {contextLost ? (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              WebGL Context Lost. Please refresh the page.
            </div>
          ) : (
            <Canvas
              camera={{ position: [0, 0, 5] }}
              gl={{ powerPreference: 'high-performance', alpha: true }}
              onCreated={({ gl }) => {
                const canvas = gl.getContext().canvas;
                canvas.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault();
                  setContextLost(true);
                });
                canvas.addEventListener('webglcontextrestored', () =>
                  setContextLost(false)
                );
              }}
            >
              <Scene isHovered={is3DHovered} />
            </Canvas>
          )}
        </Suspense>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-poppins font-extrabold text-white mb-6 group">
            Transform Your{' '}
            <IdeaBulbCursor>
              <span className="font-pencil transition-all duration-300 group-hover:font-bold">
                Ideas
              </span>
            </IdeaBulbCursor>{' '}
            with
            <span className="bg-gradient-to-r from-sky-400 to-blue-800 bg-clip-text text-transparent font-extrabold">
              Codantix
            </span>
          </h1>
          <p className="text-lg sm:text-2xl text-textSecondary mb-8 max-w-3xl mx-auto leading-relaxed">
            We craft custom web and mobile apps, paired with smart marketing, to
            turn your vision into scalable success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="#contact"
              className="group relative bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 
                 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg lg:text-xl
                 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/30 
                 flex items-center space-x-2 overflow-hidden"
            >
              <span className="relative z-10">Start Your Journey</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-sky-400/30 scale-0 group-hover:scale-100 origin-center transition-transform duration-500 rounded-xl blur-md"></div>
            </a>
            <a
              href="#portfolio"
              className="group relative border-2 border-slate-600 hover:border-sky-500 text-textSecondary hover:text-sky-400 
                 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg lg:text-xl
                 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
              <span className="relative z-10">Explore Our Work</span>
              <div className="absolute inset-0 bg-sky-500/10 scale-0 group-hover:scale-100 origin-center transition-transform duration-700 rounded-xl blur-sm"></div>
            </a>
          </div>

          <div className="text-center text-sm text-slate-500 mb-8 max-w-2xl mx-auto space-y-2">
            <p>Get personalized guidance to accelerate your business growth without the overwhelm.</p>
            <p>Discover proven strategies that have transformed startups into industry leaders.</p>
          </div>

          <div className="mt-10 relative">
            <Image
              src="/watch-this-1.svg"
              alt="Watch This"
              width={182}
              height={179}
              className="absolute -top-16 left-26 -translate-x-1/2 z-20 w-[120px] h-[118px] sm:w-[150px] sm:h-[147px] md:w-[182px] md:h-[179px]"
            />
            <video
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg relative z-10"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-sm text-slate-500 mt-2">[Placeholder Video - Replace with Your Own]</p>
          </div>

          <div
            ref={statsRef}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div
              className={`text-center p-4 bg-bgSecondary rounded-lg transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              } ${isMobile ? 'animate-[fade-in_0.8s_ease-out_forwards]' : 'animate-[slide-up_0.8s_ease-out_forwards]'}`}
            >
              <div className="text-3xl font-bold text-accent mb-2">{isVisible ? animatedProjects : 0}+</div>
              <div className="text-textSecondary">Projects Delivered</div>
            </div>
            <div
              className={`text-center p-4 bg-bgSecondary rounded-lg transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              } ${isMobile ? 'animate-[fade-in_0.8s_ease-out_0.2s_forwards]' : 'animate-[slide-up_0.8s_ease-out_0.2s_forwards]'}`}
            >
              <div className="text-3xl font-bold text-accent mb-2">{isVisible ? (animatedLeads / 1000).toFixed(0) : 0}k+</div>
              <div className="text-textSecondary">Leads Generated</div>
            </div>
            <div
              className={`text-center p-4 bg-bgSecondary rounded-lg transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              } ${isMobile ? 'animate-[fade-in_0.8s_ease-out_0.4s_forwards]' : 'animate-[slide-up_0.8s_ease-out_0.4s_forwards]'}`}
            >
              <div className="text-3xl font-bold text-accent mb-2">{counters.support}/7</div>
              <div className="text-textSecondary">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;