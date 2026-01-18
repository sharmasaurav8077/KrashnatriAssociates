import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const images = [
  {
    src: '/assets/about/about-topography-1.png',
    alt: 'Topographic survey work - Professional land mapping and contour surveys by Krashnatri Associates in Meerut, India',
  },
  {
    src: '/assets/about/about-topography-2.jpeg',
    alt: 'Survey equipment operation - DGPS and total station survey services for high-accuracy land and boundary measurement',
  },
];

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-swap slideshow every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const services = [
    {
      title: 'Topography & Mapping Survey',
      description: 'Accurate land mapping & contour surveys.',
    },
    {
      title: 'DGPS & Total Station Survey',
      description: 'High-precision land & boundary surveys.',
    },
    {
      title: 'Compliance Documentation Support',
      description: 'Documentation & filing support for approvals.',
    },
  ];

  const whyChooseUs = [
    'Accurate results',
    'Modern equipment',
    'Timely delivery',
    'Transparent pricing',
  ];

  return (
    <div className="py-8 sm:py-10 md:py-15 lg:py-20 bg-white">
      <SEO
        title="About Us - Krashnatri Associates | Professional Survey Services"
        description="Learn about Krashnatri Associates - a professional firm providing land survey and topographic survey services in Meerut, India. We deliver accurate site data using modern technology and experienced surveyors."
        keywords="about Krashnatri Associates, survey company Meerut, topographic survey experts, land survey professionals"
        image="/assets/about/about-topography-1.png"
      />
      <StructuredData type="about" />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 safe-area-inset-x">
        {/* About Section */}
        <section className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="w-full max-w-6xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2 items-center py-6 sm:py-8 md:py-12 min-h-[300px] sm:min-h-[350px] md:min-h-[500px]">
            {/* Image Slideshow with Crossfade */}
            <div className="w-full order-2 md:order-1 relative aspect-[4/3] rounded-lg overflow-hidden shadow bg-gray-100 touch-none will-change-contents">
              {images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  initial={{ opacity: index === 0 ? 1 : 0 }}
                  animate={{ 
                    opacity: currentImageIndex === index ? 1 : 0,
                    zIndex: currentImageIndex === index ? 10 : 1
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="w-full h-full rounded-lg object-cover absolute inset-0 select-none touch-none"
                  loading="eager"
                  {...(index === 0 && { fetchpriority: "high" as any })}
                  decoding="sync"
                  draggable="false"
                        onError={() => {
                          if (import.meta.env.DEV) {
                            console.error('Image failed to load:', image.src);
                          }
                        }}
                />
              ))}
            </div>

            {/* Text Content */}
            <div className="order-1 md:order-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-contrast mb-4 sm:mb-6 md:mb-8">
                About Krashnatri Associates
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Krashnatri Associates is a professional firm providing land survey and topographic survey services. We deliver accurate site data using modern technology and experienced surveyors to support planning and construction projects.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-contrast mb-4 sm:mb-6 md:mb-8">
            Services
          </h2>
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {services.map((service, index) => (
              <div key={index} className="flex items-start">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-contrast mb-4 sm:mb-6 md:mb-8">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-8">
            Accurate results, modern equipment, timely delivery, and transparent pricing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-500 mr-2 sm:mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm sm:text-base md:text-lg text-gray-700 font-medium break-words">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
