import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const Loader = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeDot, setActiveDot] = useState<number>(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const previousPathnameRef = useRef<string>(location.pathname);
  const isInitialLoadRef = useRef(true);
  const fadeOutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dotsIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Timing constants
  const dotBlinkSpeed = 500; // 500ms per dot blink
  const totalDuration = 1800; // 1.8s total (3 dots × 600ms = 1800ms)
  const fadeOutDuration = 200; // 200ms fade-out

  // Fade out function
  const fadeOut = useCallback(() => {
    if (!loaderRef.current) {
      setIsLoading(false);
      // Comprehensive scroll restoration
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.body.style.touchAction = 'pan-y';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.touchAction = 'pan-y';
      return;
    }

    // Stop dots animation
    if (dotsIntervalRef.current) {
      clearInterval(dotsIntervalRef.current);
      dotsIntervalRef.current = null;
    }

    // Fade out animation
    loaderRef.current.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
    loaderRef.current.style.opacity = '0';

    // Remove from DOM after fade-out
    setTimeout(() => {
      setIsLoading(false);
      // Comprehensive scroll restoration for all browsers
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.body.style.touchAction = 'pan-y';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.touchAction = 'pan-y';
      
      // Force enable scrolling
      const root = document.getElementById('root');
      if (root) {
        root.style.overflow = '';
        root.style.overflowY = '';
        root.style.touchAction = 'pan-y';
      }
      
      if (loaderRef.current) {
        loaderRef.current.style.display = 'none';
      }
    }, fadeOutDuration);
  }, [fadeOutDuration]);

  // Prevent body and html scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
    } else {
      // Comprehensive scroll restoration
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.body.style.touchAction = 'pan-y';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.touchAction = 'pan-y';
      
      // Ensure root doesn't block scroll
      const root = document.getElementById('root');
      if (root) {
        root.style.overflow = '';
        root.style.overflowY = '';
        root.style.touchAction = 'pan-y';
      }
    }
  }, [isLoading]);

  // Dots animation: blink one-by-one (dot1 → dot2 → dot3) in sequence
  useEffect(() => {
    if (!isLoading) return;

    // Start with no dot active, then first dot will blink
    setActiveDot(-1);
    let blinkCount = 0; // Track how many dots have blinked

    const animateDots = () => {
      blinkCount++;
      
      // Sequence: dot1 (0) → dot2 (1) → dot3 (2)
      if (blinkCount === 1) {
        // First dot blinks
        setActiveDot(0);
      } else if (blinkCount === 2) {
        // Second dot blinks
        setActiveDot(1);
      } else if (blinkCount === 3) {
        // Third dot blinks - hide loader immediately
        setActiveDot(2);
        
        // Clear interval immediately
        if (dotsIntervalRef.current) {
          clearInterval(dotsIntervalRef.current);
          dotsIntervalRef.current = null;
        }
        
        // Hide loader immediately after third dot blinks
        setTimeout(() => {
          fadeOut();
        }, 100); // Small delay to show the third dot
      }
    };

    // Start animation immediately
    dotsIntervalRef.current = setInterval(animateDots, dotBlinkSpeed);

    return () => {
      if (dotsIntervalRef.current) {
        clearInterval(dotsIntervalRef.current);
        dotsIntervalRef.current = null;
      }
    };
  }, [isLoading, fadeOut]);

  // Handle initial load and page refresh
  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      startTimeRef.current = Date.now();
      
      // Ensure loader shows on refresh
      setIsLoading(true);
      setActiveDot(-1);
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
      
      if (loaderRef.current) {
        loaderRef.current.style.display = '';
        loaderRef.current.style.opacity = '1';
        loaderRef.current.style.transition = '';
      }

      // Fallback: hide loader after maximum duration (safety net)
      const fallbackTimeout = setTimeout(() => {
        if (isLoading) {
          fadeOut();
        }
      }, totalDuration + 500);

      return () => {
        clearTimeout(fallbackTimeout);
        if (dotsIntervalRef.current) {
          clearInterval(dotsIntervalRef.current);
        }
        // Safety: ensure scroll is restored on cleanup
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      };
    }
  }, [isLoading, fadeOut]);

  // Handle route changes (navbar navigation, footer, mobile drawer)
  useEffect(() => {
    const pathnameChanged = previousPathnameRef.current !== location.pathname;

    if (!isInitialLoadRef.current && pathnameChanged) {
      // Route changed - show loader
      previousPathnameRef.current = location.pathname;
      setIsLoading(true);
      setActiveDot(-1);
      startTimeRef.current = Date.now();
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowY = 'hidden';

      // Reset styles
      if (loaderRef.current) {
        loaderRef.current.style.display = '';
        loaderRef.current.style.opacity = '1';
        loaderRef.current.style.transition = '';
      }

      // Clear any existing timeouts and intervals
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
        fadeOutTimeoutRef.current = null;
      }
      if (dotsIntervalRef.current) {
        clearInterval(dotsIntervalRef.current);
        dotsIntervalRef.current = null;
      }
    }

    return () => {
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }
      if (dotsIntervalRef.current) {
        clearInterval(dotsIntervalRef.current);
      }
    };
  }, [location.pathname]);

  // Reset loader display when showing again
  useEffect(() => {
    if (isLoading && loaderRef.current) {
      loaderRef.current.style.display = '';
      loaderRef.current.style.opacity = '1';
      loaderRef.current.style.transition = '';
      setActiveDot(-1);
    }
  }, [isLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Comprehensive scroll restoration
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.body.style.touchAction = 'pan-y';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.touchAction = 'pan-y';
      
      const root = document.getElementById('root');
      if (root) {
        root.style.overflow = '';
        root.style.overflowY = '';
        root.style.touchAction = 'pan-y';
      }
      
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }
      if (dotsIntervalRef.current) {
        clearInterval(dotsIntervalRef.current);
      }
    };
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <style>{`
        @keyframes loader-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .loader-circle {
          animation: loader-spin 1s linear infinite;
        }

        .loader-text {
          font-size: 16px;
        }
        @media (min-width: 640px) {
          .loader-text {
            font-size: 18px;
          }
        }
        @media (min-width: 1024px) {
          .loader-text {
            font-size: 22px;
          }
        }

        .loader-dot {
          opacity: 0.4;
          transition: opacity 0.3s ease-in-out;
          font-size: 20px;
          line-height: 1;
          color: white;
          font-weight: bold;
          display: inline-block;
          min-width: 8px;
        }

        .loader-dot.active {
          opacity: 1;
        }

        @media (min-width: 640px) {
          .loader-dot {
            font-size: 24px;
            min-width: 10px;
          }
        }
        @media (min-width: 1024px) {
          .loader-dot {
            font-size: 28px;
            min-width: 12px;
          }
        }
      `}</style>
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none"
        style={{ backgroundColor: '#0C1B45', opacity: 1 }}
      >
        {/* Rotating circle loader - continuous rotation */}
        <div className="mb-6">
          <svg
            className="loader-circle w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[48px] lg:h-[48px]"
            viewBox="0 0 80 80"
          >
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Loading text */}
        <div
          className="text-white font-medium loader-text mb-2"
          style={{
            fontFamily: 'Inter, Raleway, sans-serif',
            fontWeight: 500,
          }}
        >
          Loading
        </div>

        {/* Three blinking dots - one-by-one sequence */}
        <div className="flex items-center gap-2 justify-center">
          <span className={`loader-dot ${activeDot === 0 ? 'active' : ''}`}>.</span>
          <span className={`loader-dot ${activeDot === 1 ? 'active' : ''}`}>.</span>
          <span className={`loader-dot ${activeDot === 2 ? 'active' : ''}`}>.</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
