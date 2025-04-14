"use client";

import React from "react";
import experienceData from "@/data/experience.json";
import Image from "next/image";

const Experience = () => {
  const formatDate = (date) => {
    if (date === "Present") return date;
    const [year, month] = date.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      id="experience"
      className="min-h-screen w-full bg-slate-900 px-5 md:px-8 lg:px-12 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">Experience</h2>
        <div className="space-y-12">
          {experienceData.experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative pl-8 border-l-2 border-teal-500"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500" />
              <div className="flex flex-col md:flex-row gap-6 mb-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white p-2 flex-shrink-0">
                  <Image
                    src={exp.logo}
                    alt={`${exp.workPlace} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {exp.jobTitle}
                  </h3>
                  <p className="text-gray-400">{exp.workPlace}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {exp.endDate}
                  </p>
                </div>
              </div>
              <ul className="text-gray-300 mb-4">
                {exp.description.map((description, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1">•</span>
                    <p className="text-gray-300">{description}</p>
                  </div>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-teal-500/10 text-teal-400 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
