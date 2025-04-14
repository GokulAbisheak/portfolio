export function generatePortfolioJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gokul Abisheak",
    "url": "https://gokulabisheak.dev",
    "image": "/images/profile.jpg",
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Codeworks Technologies (Pvt) Ltd"
    },
    "description": "Software Engineer specializing in full-stack development, DevOps, and cloud technologies.",
    "email": "mailto:gokulabisheak12@gmail.com",
    "telephone": "+94777123456",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kandy",
      "addressCountry": "Sri Lanka"
    },
    "sameAs": [
      "https://github.com/GokulAbisheak",
      "https://linkedin.com/in/gokul-abisheak",
      "https://instagram.com/gokulabisheak",
      "https://medium.com/@gokulabisheak"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Sri Lanka Institude of Information Technology"
    },
    "knowsAbout": [
      "Full Stack Development",
      "React",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "DevOps",
      "Cloud Technologies"
    ]
  };
} 