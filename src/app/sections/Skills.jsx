"use client"

import React from 'react';
import Image from 'next/image';
import skillsData from '@/data/skills.json';

const Skills = () => {
  return (
    <div id="skills" className="min-h-screen w-full bg-slate-900 px-5 md:px-8 lg:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">Skills</h2>
        
        <div className="space-y-16">
          {skillsData.categories.map((category) => (
            <div key={category.id} className="space-y-8">
              <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    className="aspect-square rounded p-4 hover:bg-slate-700 transition-colors duration-300 flex flex-col items-center justify-center gap-3"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white p-2">
                      <Image
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-lg font-medium text-white text-center">{skill.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills; 