import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  id?: string;
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      id={id} 
      className="relative w-full min-h-[500px] sm:min-h-[550px] md:h-[65vh] lg:h-[80vh]"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/topography-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'center top' : 'center',
        }}
        role="img"
        aria-label="Topographic land survey with GNSS equipment"
      >
        {/* Preload image to ensure it's used immediately */}
        <img
          src="/images/topography-hero.jpg"
          alt="Topographic land survey with GNSS equipment - Krashnatri Associates professional survey services"
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
          loading="eager"
          {...({ fetchpriority: "high" } as any)}
          decoding="sync"
          width="1920"
          height="1080"
        />
        {/* Dark Overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[500px] sm:min-h-[550px] md:h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-0">
        <div className="max-w-7xl mx-auto text-center w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-4 lg:mb-6 leading-tight break-words px-2">
            Precision Regulatory Compliance & Survey Experts
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 mb-4 sm:mb-5 md:mb-6 lg:mb-10 max-w-3xl mx-auto leading-relaxed break-words px-2">
            We help clients obtain aviation NOC, highway approvals, and regulatory compliance with accuracy and documentation support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mt-2 sm:mt-0">
            <Link
              to="/contact"
              className="bg-white text-primary-500 px-5 py-2.5 md:px-8 md:py-3 lg:px-10 lg:py-4 rounded-lg font-semibold text-xs sm:text-sm md:text-base lg:text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
