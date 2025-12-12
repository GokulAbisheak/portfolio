"use client"

import React, { useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaMedium, FaLocationDot } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { HiMail, HiPhone } from 'react-icons/hi';
import contactData from '@/data/contact.json';

// Icon mapping object
const iconMap = {
  FaLinkedin,
  FaGithub,
  AiFillInstagram,
  FaMedium,
  HiMail,
  HiPhone,
  FaLocationDot
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  // Helper function to render the appropriate icon component
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="text-xl" /> : null;
  };

  return (
    <div id="contact" className="min-h-screen w-full bg-slate-900 px-3 md:px-5 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">{contactData.title}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-white mb-6">{contactData.subtitle}</h3>
              
              <div className="space-y-6">
                {Object.entries(contactData.contactInfo).map(([key, info]) => (
                  <div key={key} className="flex items-start gap-4">
                    <div className="bg-teal-500 p-3 rounded-lg text-white">
                      {renderIcon(info.icon)}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{info.label}</h4>
                      {key === 'email' ? (
                        <a href={`mailto:${info.value}`} className="text-gray-300 hover:text-teal-500 transition-colors cursor-pointer">
                          {info.value}
                        </a>
                      ) : key === 'phone' ? (
                        <a href={`tel:${info.value}`} className="text-gray-300 hover:text-teal-500 transition-colors cursor-pointer">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-300">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-white mb-6">Connect With Me</h3>
              
              <div className="flex flex-wrap gap-4">
                {contactData.socialLinks.map((link) => (
                  <a 
                    key={link.platform}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-teal-500 transition-colors cursor-pointer"
                  >
                    {renderIcon(link.icon)}
                    <span>{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">{contactData.form.title}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {contactData.form.fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-white mb-2">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      rows="5"
                      className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder={field.placeholder}
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : contactData.form.submitButton}
              </button>
              
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-900/50 text-green-300 rounded-lg">
                  {contactData.form.successMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 