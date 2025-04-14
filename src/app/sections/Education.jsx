"use client";

import React from "react";
import educationData from "@/data/education.json";
import Image from "next/image";

const Education = () => {
  const formatDate = (date) => {
    if (date != "Present") {
      const [year, month] = date.split("-");
      return new Date(year, month - 1).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } else {
      return date;
    }
  };

  return (
    <div
      id="education"
      className="min-h-screen w-full bg-slate-900 px-5 md:px-8 lg:px-12 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">Education</h2>
        <div className="space-y-12">
          {educationData.education.map((edu) => (
            <div
              key={edu.id}
              className="relative pl-8 border-l-2 border-teal-500"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500" />
              <div className="flex flex-col md:flex-row gap-6 mb-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white p-2 flex-shrink-0">
                  <Image
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-400">{edu.school}</p>
                  <p className="text-gray-500">{edu.location}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{edu.description}</p>
              <ul>
                {edu.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-teal-400 mt-1">•</span>
                    <p className="text-gray-300">{achievement}</p>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
