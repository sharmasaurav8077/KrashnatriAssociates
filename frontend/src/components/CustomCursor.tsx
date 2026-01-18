import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 });
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const outerPositionRef = useRef({ x: 0, y: 0 });
  const magneticTargetRef = useRef<{ x: number; y: number; strength: number } | null>(null);

  // Calculate cursor sizes based on device
  const getCursorSizes = () => {
    if (isTablet) {
      // Tablet: 20% reduction
      return {
        innerBase: 4.8, // 6px * 0.8
        outerBase: 16, // 20px * 0.8
        innerHover: 5.76, // 7.2px * 0.8
        outerHover: 22.4, // 28px * 0.8
      };
    }
    // Desktop: Full size
    return {
      innerBase: 6,
      outerBase: 20,
      innerHover: 7.2,
      outerHover: 28,
    };
  };

  useEffect(() => {
    // Detect touch device using both methods for maximum compatibility
    const isTouchDevice = () => {
      // Method 1: Check for touch event support
      const hasTouchSupport = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      
      // Method 2: Check for coarse pointer (touch/pen)
      const pointerCoarseQuery = window.matchMedia('(pointer: coarse)');
      const hasCoarsePointer = pointerCoarseQuery.matches;
      
      // If either method detects touch, it's a touch device
      return hasTouchSupport || hasCoarsePointer;
    };

    const checkDevice = () => {
      const isTouch = isTouchDevice();
      // Only enable on non-touch devices (desktop with mouse/pointer fine)
      const isNonTouch = !isTouch;
      setIsDesktop(isNonTouch);
      
      // Tablet detection: non-touch but screen width 768px-1023px
      if (isNonTouch) {
        const width = window.innerWidth;
        setIsTablet(width >= 768 && width < 1024);
      } else {
        setIsTablet(false);
      }
    };

    checkDevice();
    
    // Listen for pointer media query changes
    const pointerCoarseQuery = window.matchMedia('(pointer: coarse)');
    const pointerFineQuery = window.matchMedia('(pointer: fine)');
    
    const handlePointerChange = () => checkDevice();
    pointerCoarseQuery.addEventListener('change', handlePointerChange);
    pointerFineQuery.addEventListener('change', handlePointerChange);
    window.addEventListener('resize', checkDevice);

    return () => {
      pointerCoarseQuery.removeEventListener('change', handlePointerChange);
      pointerFineQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // Find nearest interactive element for magnetic effect
  const findNearestInteractiveElement = (x: number, y: number): { x: number; y: number; strength: number } | null => {
    const interactiveSelectors = 'a, button, [data-cursor-hover], [role="button"]';
    const elements = document.querySelectorAll<HTMLElement>(interactiveSelectors);
    const magneticRadius = 80; // Distance in pixels to activate magnetic effect
    interface NearestType {
      element: HTMLElement;
      distance: number;
    }
    let nearest: NearestType | null = null;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

      if (distance < magneticRadius && (!nearest || distance < nearest.distance)) {
        nearest = { element, distance };
      }
    }

    if (nearest === null) {
      return null;
    }

    const rect = nearest.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = nearest.distance;
    const strength = 1 - distance / magneticRadius; // 0 to 1, stronger when closer
    return { x: centerX, y: centerY, strength: strength * 0.3 }; // Max 30% pull
  };

  useEffect(() => {
    // Only enable on desktop/tablet (hover-capable devices)
    if (!isDesktop) return;

    // Update cursor position
    const updateCursor = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Find magnetic target
      magneticTargetRef.current = findNearestInteractiveElement(mouseX, mouseY);

      // Calculate final position with magnetic effect
      let finalX = mouseX;
      let finalY = mouseY;

      if (magneticTargetRef.current) {
        const { x: targetX, y: targetY, strength } = magneticTargetRef.current;
        finalX = mouseX + (targetX - mouseX) * strength;
        finalY = mouseY + (targetY - mouseY) * strength;
      }

      targetPositionRef.current = { x: finalX, y: finalY };
      setInnerPosition({ x: finalX, y: finalY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        !!target.closest('[data-cursor-hover]') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Animate outer ring with delay (lerp)
    const animateOuterRing = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      const updateOuter = () => {
        const currentX = outerPositionRef.current.x;
        const currentY = outerPositionRef.current.y;
        const targetX = targetPositionRef.current.x;
        const targetY = targetPositionRef.current.y;

        // Lerp factor for smooth delayed movement
        const lerpFactor = 0.15;

        const newX = lerp(currentX, targetX, lerpFactor);
        const newY = lerp(currentY, targetY, lerpFactor);

        outerPositionRef.current = { x: newX, y: newY };

        if (Math.abs(newX - currentX) > 0.5 || Math.abs(newY - currentY) > 0.5) {
          setOuterPosition({ x: newX, y: newY });
        }

        animationFrameRef.current = requestAnimationFrame(updateOuter);
      };

      updateOuter();
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    // Start outer ring animation
    animateOuterRing();

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDesktop]);

  // Don't show custom cursor on touch devices (mobile)
  if (!isDesktop) {
    return null;
  }

  const sizes = getCursorSizes();

  return (
    <>
      {/* Outer ring with delayed movement */}
      <div
        className="pointer-events-none"
        style={{
          position: 'fixed',
          left: `${outerPosition.x}px`,
          top: `${outerPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          transition: 'none',
          mixBlendMode: 'normal',
        }}
      >
        <div
          className="rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${sizes.outerBase}px`,
            height: `${sizes.outerBase}px`,
            border: '2px solid',
            borderColor: isHovering ? '#3BA0FF' : 'rgba(11,34,84,0.6)',
            backgroundColor: 'transparent',
            mixBlendMode: 'normal',
            transform: isHovering ? `scale(${sizes.outerHover / sizes.outerBase})` : 'scale(1)',
          }}
        />
      </div>
      {/* Inner dot with instant movement */}
      <div
        className="pointer-events-none"
        style={{
          position: 'fixed',
          left: `${innerPosition.x}px`,
          top: `${innerPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          transition: 'none',
          mixBlendMode: 'normal',
        }}
      >
        <div
          className="rounded-full transition-all duration-200 ease-out"
          style={{
            width: `${sizes.innerBase}px`,
            height: `${sizes.innerBase}px`,
            backgroundColor: '#0B2254',
            mixBlendMode: 'normal',
            transform: isHovering ? `scale(${sizes.innerHover / sizes.innerBase})` : 'scale(1)',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
