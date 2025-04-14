"use client";

import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaMedium } from "react-icons/fa6";
import { HiMail } from 'react-icons/hi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { platform: 'GitHub', url: 'https://github.com/GokulAbisheak', icon: FaGithub },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/gokulabisheak', icon: FaLinkedin },
    { platform: 'Instagram', url: 'https://instagram.com/gokulabisheak', icon: FaInstagram },
    { platform: 'Medium', url: 'https://medium.com/@gokulabisheak', icon: FaMedium },
  ];

  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Gokul Abisheak</h2>
            <p className="text-gray-400 text-sm">Software Engineer</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-teal-500 transition-colors"
                    aria-label={`Visit my ${link.platform} profile`}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
              <a
                href="mailto:gokulabisheak12@gmail.com"
                className="text-gray-400 hover:text-teal-500 transition-colors"
                aria-label="Send me an email"
              >
                <HiMail size={20} />
              </a>
            </div>
            
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Gokul Abisheak. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 