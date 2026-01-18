import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const navLinks = [
    { path: '/', label: 'Home', sectionId: 'hero' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services', sectionId: 'services' },
    { path: '/projects', label: 'Projects' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact Us', sectionId: 'contact' },
    { path: '/e-brochure', label: 'E-Brochure' },
  ];

  const isActive = (path: string) => {
    // For home page, only active if exactly on '/'
    if (path === '/') {
      return location.pathname === '/';
    }
    // For other pages, check exact match
    return location.pathname === path;
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Account for sticky header (81px offset)
      const headerOffset = 81;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    // Close mobile menu (works on all devices, but especially important on mobile/tablet)
    setIsOpen(false);

    // If link has a sectionId, handle section scrolling or navigation
    if (link.sectionId) {
      e.preventDefault();
      
      if (location.pathname === link.path || (link.path === '/' && location.pathname === '/')) {
        // Already on the target page, scroll to section
        setTimeout(() => {
          scrollToSection(link.sectionId!);
        }, 50);
      } else {
        // On a different page - navigate first
        navigate(link.path);
        
        // Wait for navigation to complete, then check for section
        setTimeout(() => {
          const section = document.getElementById(link.sectionId!);
          if (section) {
            // Section exists on the new page, scroll to it
            scrollToSection(link.sectionId!);
          } else {
            // Section doesn't exist, scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 200);
      }
    }
    // For other links without sectionId, let React Router handle navigation normally
  };

  const handleGetQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Close mobile menu if open
    setIsOpen(false);
    
    if (location.pathname === '/') {
      // Already on home page, scroll to contact section
      scrollToSection('contact');
    } else {
      // Navigate to home page, then scroll
      navigate('/');
      setTimeout(() => {
        scrollToSection('contact');
      }, 100);
    }
  };

  // Handle scroll detection for auto-hide navbar
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY || window.pageYOffset;

          // Show navbar at the top of the page
          if (currentScrollY <= 10) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current) {
            // Scrolling down - hide navbar
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up - show navbar
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    // Add scroll event listener (works for both mouse wheel and touch scroll)
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-100"
      style={{ 
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 240ms ease-out',
        pointerEvents: 'auto',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left aligned */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              {/* KA Icon Badge */}
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#0B2254] to-[#073068] flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm sm:text-base">KA</span>
              </div>
              {/* Company Name */}
              <div className="flex items-center gap-1">
                <span className="text-black font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">
                  Krashnatri
                </span>
                <span className="text-[#0B2254] font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">
                  Associates
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex lg:items-center lg:flex-1 lg:justify-center lg:min-w-0">
            <nav className="flex items-center flex-wrap justify-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-3 xl:px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease flex-shrink-0 relative z-10 ${
                    isActive(link.path)
                      ? 'text-[#073068] font-semibold'
                      : 'text-[#0B2254] font-normal hover:text-[#073068]'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:ml-6">
            <Link
              to="/"
              onClick={handleGetQuoteClick}
              className="bg-primary-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl hover:bg-accent-400 transition-all duration-200 transform hover:scale-105"
            >
              Get Quote
            </Link>
          </div>

          {/* Tablet Navigation - Reduced spacing */}
          <div className="hidden md:flex lg:hidden md:items-center md:flex-1 md:justify-center md:min-w-0">
            <nav className="flex items-center flex-wrap justify-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-2 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-200 ease flex-shrink-0 relative z-10 ${
                    isActive(link.path)
                      ? 'text-[#073068] font-semibold'
                      : 'text-[#0B2254] font-normal hover:text-[#073068]'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile/Tablet menu button - Only hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 ease break-words relative z-10 ${
                  isActive(link.path)
                    ? 'text-[#073068] font-semibold'
                    : 'text-[#0B2254] font-normal hover:text-[#073068]'
                }`}
                style={{ pointerEvents: 'auto' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
