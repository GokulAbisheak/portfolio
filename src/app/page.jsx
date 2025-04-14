"use client";

import { useState } from "react";
import TypingAnimation from "./components/TypingAnimation";
import Terminal from "./components/Terminal";
import Experience from "./sections/Experience";
import About from "./sections/About";
import { HiCommandLine, HiArrowDown } from "react-icons/hi2";
import Education from "./sections/Education";
import Image from "next/image";
import homeData from "@/data/home.json"
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import { FaGithub, FaLinkedin, FaInstagram, FaMedium } from 'react-icons/fa';
import { generatePortfolioJsonLd } from './json-ld';
import Head from 'next/head';

export default function Home() {
  const [isClose, setIsClose] = useState(true);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Default social links if not provided in homeData
  const socialLinks = homeData.socialLinks || [
    { platform: 'GitHub', url: 'https://github.com/GokulAbisheak', icon: 'FaGithub' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/gokulabisheak', icon: 'FaLinkedin' },
    { platform: 'Instagram', url: 'https://instagram.com/gokulabisheak', icon: 'FaInstagram' },
    { platform: 'Medium', url: 'https://medium.com/@gokulabisheak', icon: 'FaMedium' },
  ];

  return (
    <>
      <Head>
        <title>Gokul Abisheak | Software Engineer</title>
        <meta name="description" content="Portfolio website of Gokul Abisheak, a Software Engineer specializing in full-stack development, DevOps, and cloud technologies." />
        <link rel="canonical" href="https://gokulabisheak.dev" />
      </Head>
      
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePortfolioJsonLd())
        }}
      />
      
      <div className="overflow-x-hidden">
        {/* Hero Section */}
        <div id="home" className="min-h-screen w-full bg-slate-900 px-3 md:px-5 lg:px-8 pt-16">
          <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="w-full flex items-center order-2 md:order-1 pb-10 md:pb-0">
              <div className="flex flex-col gap-2">
                <h1 className="text-5xl md:text-7xl font-bold text-white">{homeData.name}</h1>
                <TypingAnimation texts={homeData.roles} speed={150} />
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon === 'FaGithub' ? FaGithub : 
                                link.icon === 'FaLinkedin' ? FaLinkedin : 
                                link.icon === 'FaInstagram' ? FaInstagram : 
                                link.icon === 'FaMedium' ? FaMedium : null;
                    
                    return (
                      <a 
                        key={link.platform}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-slate-800 p-3 rounded-full text-white hover:bg-teal-500 transition-colors"
                        aria-label={`Visit my ${link.platform} profile`}
                      >
                        {Icon && <Icon className="text-xl" />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center order-1 md:order-2">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  <Image
                    src={homeData.image || "/images/profile.jpg"}
                    alt="Gokul Abisheak"
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="absolute -inset-4 rounded-full border-4 border-teal-500/20 animate-spin-slow"></div>
                <div className="absolute -inset-8 rounded-full border-4 border-blue-500/10 animate-spin-slower"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="bg-slate-800 text-white p-3 rounded-full hover:bg-teal-500 transition-colors"
              aria-label="Scroll to About section"
            >
              <HiArrowDown className="text-xl" />
            </button>
          </div>
        </div>

        {/* Terminal */}
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            onClick={() => setIsClose(!isClose)}
            className="bg-slate-800 text-white p-2 rounded-lg hover:bg-teal-500 transition-colors flex items-center gap-2"
          >
            <HiCommandLine className="text-xl" />
            <span className="hidden md:inline">Terminal</span>
          </button>
        </div>
        {!isClose && <Terminal isClose={isClose} setIsClose={setIsClose} />}

        {/* Sections */}
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
