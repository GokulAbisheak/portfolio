"use client"

import React from 'react';
import Image from 'next/image';
import aboutData from '@/data/about.json';

const About = () => {
  const { profile, skills } = aboutData;

  return (
    <div id="about" className="min-h-screen w-full bg-slate-900 px-5 md:px-8 lg:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="relative w-[350px] h-[350px] mx-auto md:mx-0 group">
              {/* Outer ring with gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Middle ring with animation */}
              <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-teal-500/30 animate-spin-slow"></div>
                <div className="absolute inset-2 rounded-full border-2 border-blue-500/30 animate-spin-slow-reverse"></div>
              </div>
              
              {/* Inner image container */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-teal-500/20 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-12">About Me</h2>
            <h3 className="text-2xl font-semibold text-white">{profile.title}</h3>
            <p className="text-gray-300 leading-relaxed">
              {profile.description}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-teal-400 font-semibold">Education:</span>
                <span className="text-gray-300">{profile.education}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-teal-400 font-semibold">Location:</span>
                <span className="text-gray-300">{profile.location}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-teal-400 font-semibold">CGPA:</span>
                <span className="text-gray-300">{profile.cgpa}</span>
              </div>
            </div>
            <div className="pt-4">
              <h4 className="text-xl font-semibold text-white mb-3">Key Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-teal-500/10 text-teal-400 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
