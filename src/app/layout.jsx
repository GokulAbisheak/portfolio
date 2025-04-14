import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

// Metadata configuration
export const metadata = {
  title: {
    default: 'Gokul Abisheak | Software Engineer',
    template: '%s | Gokul Abisheak'
  },
  description: 'Portfolio website of Gokul Abisheak, a Software Engineer specializing in full-stack development, DevOps, and cloud technologies.',
  keywords: ['Gokul Abisheak', 'Software Engineer', 'Full Stack Developer', 'DevOps Engineer', 'Web Development', 'React', 'Node.js', 'JavaScript', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Gokul Abisheak' }],
  creator: 'Gokul Abisheak',
  publisher: 'Gokul Abisheak',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gokulabisheak.dev',
    siteName: 'Gokul Abisheak Portfolio',
    title: 'Gokul Abisheak | Software Engineer',
    description: 'Portfolio website of Gokul Abisheak, a Software Engineer specializing in full-stack development, DevOps, and cloud technologies.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gokul Abisheak Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gokul Abisheak | Software Engineer',
    description: 'Portfolio website of Gokul Abisheak, a Software Engineer specializing in full-stack development, DevOps, and cloud technologies.',
    creator: '@gokulabisheak',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 