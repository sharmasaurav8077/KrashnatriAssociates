import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ServicesSectionProps {
  id?: string;
}

const ServicesSection = ({ id }: ServicesSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2, margin: '0px 0px -100px 0px' });
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const services = [
    {
      icon: '🗺️',
      title: 'Topography & Mapping Survey',
      description: 'Land mapping, contour & site details.',
    },
    {
      icon: '📐',
      title: 'DGPS & Total Station Survey',
      description: 'High-accuracy land & boundary measurement.',
    },
    {
      icon: '📋',
      title: 'Compliance Documentation Support',
      description: 'Survey-based documentation & filing help.',
    },
  ];

  // Desktop: slide-up + fade + stagger
  const desktopCardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  // Tablet: shorter slide (20px) + fade
  const tabletCardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  // Mobile: fade only
  const mobileCardVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  // Desktop container: enables stagger
  const desktopContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Tablet/Mobile container: no stagger
  const noStaggerContainerVariants = {
    hidden: {},
    visible: {
      transition: {},
    },
  };

  const containerVariants = deviceType === 'desktop' ? desktopContainerVariants : noStaggerContainerVariants;
  const cardVariants = deviceType === 'mobile' ? mobileCardVariants : deviceType === 'tablet' ? tabletCardVariants : desktopCardVariants;

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className="py-10 md:py-12 lg:py-20 bg-gray-50 mt-12 sm:mt-0"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-10 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-contrast mb-3 md:mb-4 break-words">
            Our Services
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto break-words">
            Comprehensive consultancy solutions for your business needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              data-cursor-hover
              className="bg-white rounded-lg p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 min-w-0"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-3.5 md:mb-4 flex-shrink-0">{service.icon}</div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-contrast mb-2 sm:mb-2.5 md:mb-3 break-words leading-tight min-w-0">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed break-words min-w-0">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
