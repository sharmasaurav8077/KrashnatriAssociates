import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProcessSectionProps {
  id?: string;
}

const ProcessSection = ({ id }: ProcessSectionProps) => {
  const features = [
    'Expert regulatory compliance consulting',
    'Comprehensive documentation support',
    'Aviation NOC and highway approval services',
    'Accurate topographic and mapping solutions',
    'End-to-end project management',
    'Timely delivery and client satisfaction',
  ];

  const images = [
    {
      src: '/assets/about/about-topography-1.png',
      alt: 'Topographic survey equipment and field work - Krashnatri Associates professional land survey services in Meerut, India',
    },
    {
      src: '/assets/about/about-topography-2.jpeg',
      alt: 'Professional topographic surveying and mapping services - DGPS and total station survey by Krashnatri Associates',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload all images to avoid lazy loading
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Auto-play every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id={id} className="py-10 md:py-12 lg:py-20 bg-white mb-12 sm:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-start md:items-center">
          {/* Image Slider - Left on Desktop, Second on Mobile */}
          <div className="order-2 md:order-1 w-full relative rounded-2xl min-h-[240px] sm:min-h-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-auto object-cover rounded-2xl aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3]"
                initial={{ opacity: currentIndex === 0 ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                loading="eager"
                {...({ fetchpriority: "high" } as any)}
                decoding="sync"
                width="800"
                height="600"
                onError={() => {
                  if (import.meta.env.DEV) {
                    console.error('Image failed to load:', images[currentIndex].src);
                  }
                }}
              />
            </AnimatePresence>
          </div>

          {/* Text Content - Right on Desktop, First on Mobile */}
          <div className="order-1 md:order-2 w-full min-w-0 mb-6 sm:mb-8 md:mb-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-contrast mb-3 sm:mb-4 md:mb-4 lg:mb-6 break-words">
              About Krashnatri Associates
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-relaxed break-words">
              We are a leading consultancy firm specializing in regulatory compliance, topographic surveys, and documentation support. With years of experience, we help businesses navigate complex approval processes with precision and efficiency.
            </p>
            <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-400 mr-2 sm:mr-2.5 md:mr-3 mt-0.5 flex-shrink-0"
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
                  <span className="text-xs sm:text-sm md:text-base text-gray-700 break-words flex-1 min-w-0">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
