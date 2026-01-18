/**
 * Magnetic hover effect utility
 * Translates interactive elements 4-8px towards cursor on hover
 */

import { useEffect, type RefObject } from 'react';

interface MagneticHoverOptions {
  maxTranslate?: number; // Maximum translation distance in pixels (default: 8)
  minTranslate?: number; // Minimum translation distance in pixels (default: 4)
}

/**
 * Initialize magnetic hover effect for all interactive elements using event delegation
 * Only works on hover-capable devices
 * Works with dynamically added elements
 */
export const initMagneticHover = (options: MagneticHoverOptions = {}) => {
  const { maxTranslate = 8, minTranslate = 4 } = options;

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

  // Only enable on non-touch devices (desktop with mouse/pointer fine)
  if (isTouchDevice()) {
    return () => {}; // Return no-op cleanup function
  }

  const interactiveSelectors = [
    'a',
    'button',
    '.btn',
    '.card',
    '.service-card',
    '.nav-item',
    '[data-cursor]',
    '[data-cursor-hover]',
    '[data-magnetic-hover]',
  ];
  
  const isInteractiveElement = (element: HTMLElement): boolean => {
    if (interactiveSelectors.some(selector => element.matches(selector))) {
      return true;
    }
    // Check if element is inside an interactive element
    return !!element.closest(interactiveSelectors.join(','));
  };

  let currentElement: HTMLElement | null = null;
  let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
  let mouseOutHandler: ((e: MouseEvent) => void) | null = null;

  const cleanupCurrentElement = () => {
    if (currentElement) {
      currentElement.style.transform = '';
      currentElement.style.transition = '';
      currentElement = null;
    }
    if (mouseMoveHandler) {
      document.removeEventListener('mousemove', mouseMoveHandler);
      mouseMoveHandler = null;
    }
    if (mouseOutHandler) {
      document.removeEventListener('mouseout', mouseOutHandler, true);
      mouseOutHandler = null;
    }
  };

  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Find the interactive element (could be the target or a parent)
    let element: HTMLElement | null = target;
    while (element && !isInteractiveElement(element)) {
      element = element.parentElement;
    }

    // If we're already tracking this element, don't re-attach listeners
    if (element === currentElement) return;

    // Cleanup previous element
    cleanupCurrentElement();

    if (!element) {
      return;
    }

    currentElement = element;

    mouseMoveHandler = (moveEvent: MouseEvent) => {
      if (!currentElement) return;

      const rect = currentElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate offset from element center to cursor
      const offsetX = moveEvent.clientX - centerX;
      const offsetY = moveEvent.clientY - centerY;

      // Calculate distance from center
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      // Calculate translation distance (4-8px based on cursor distance)
      // Closer to edge = more translation
      const maxDistance = Math.max(rect.width, rect.height) / 2;
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      
      // Interpolate between min and max translate
      const translateDistance = minTranslate + (maxTranslate - minTranslate) * normalizedDistance;

      // Calculate direction vector (normalized)
      const directionX = offsetX / (distance || 1);
      const directionY = offsetY / (distance || 1);

      // Apply translation towards cursor
      const translateX = directionX * translateDistance;
      const translateY = directionY * translateDistance;

      currentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
      currentElement.style.transition = 'transform 0.1s ease-out';
    };

    mouseOutHandler = (outEvent: MouseEvent) => {
      // Check if we're leaving the element
      const relatedTarget = outEvent.relatedTarget as HTMLElement;
      if (currentElement && (!relatedTarget || !currentElement.contains(relatedTarget))) {
        cleanupCurrentElement();
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseout', mouseOutHandler, true);
  };

  // Use event delegation on document with mouseover (which bubbles)
  document.addEventListener('mouseover', handleMouseOver, true);

  // Cleanup function
  return () => {
    document.removeEventListener('mouseover', handleMouseOver, true);
    cleanupCurrentElement();
    // Reset all interactive elements
    const elements = document.querySelectorAll<HTMLElement>(interactiveSelectors.join(','));
    elements.forEach((element) => {
      element.style.transform = '';
      element.style.transition = '';
    });
  };
};

/**
 * React hook for magnetic hover effect on a specific element
 */
export const useMagneticHover = (
  ref: RefObject<HTMLElement>,
  options: MagneticHoverOptions = {}
) => {
  const { maxTranslate = 8, minTranslate = 4 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

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

    // Only enable on non-touch devices (desktop with mouse/pointer fine)
    if (isTouchDevice()) {
      return;
    }

    const handleMouseEnter = () => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;
        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

        const maxDistance = Math.max(rect.width, rect.height) / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const translateDistance = minTranslate + (maxTranslate - minTranslate) * normalizedDistance;

        const directionX = offsetX / (distance || 1);
        const directionY = offsetY / (distance || 1);

        const translateX = directionX * translateDistance;
        const translateY = directionY * translateDistance;

        element.style.transform = `translate(${translateX}px, ${translateY}px)`;
        element.style.transition = 'transform 0.1s ease-out';
      };

      const handleMouseLeave = () => {
        element.style.transform = '';
        element.style.transition = 'transform 0.2s ease-out';
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    };

    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.style.transform = '';
      element.style.transition = '';
    };
  }, [ref, maxTranslate, minTranslate]);
};
