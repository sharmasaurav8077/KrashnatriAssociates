/**
 * Custom smooth scroll implementation using requestAnimationFrame
 * Provides smooth scrolling behavior without external libraries
 */

interface ScrollOptions {
  behavior?: 'smooth' | 'auto';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
}

class SmoothScroll {
  private isScrolling = false;
  private scrollTarget: number | null = null;
  private scrollStart: number = 0;
  private scrollDistance: number = 0;
  private startTime: number = 0;
  private duration: number = 800; // milliseconds
  private easingFunction: (t: number) => number;

  constructor() {
    // Easing function: easeInOutCubic
    this.easingFunction = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    this.init();
  }

  private init() {
    // Handle anchor link clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (anchor && anchor.href) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            e.preventDefault();
            this.scrollToElement(targetElement, {
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      }
    });

    // Handle programmatic scrollTo calls
    this.interceptScrollTo();
  }

  private interceptScrollTo() {
    // Override window.scrollTo
    const originalScrollTo = window.scrollTo.bind(window);
    
    (window as any).scrollTo = (options?: ScrollToOptions | number, y?: number) => {
      // Handle object options with smooth behavior
      if (typeof options === 'object' && options && 'behavior' in options && options.behavior === 'smooth') {
        const scrollOpts = options as { top?: number; left?: number; behavior: string };
        const topValue = scrollOpts.top;
        if (typeof topValue === 'number') {
          this.smoothScrollTo(topValue);
        } else {
          this.smoothScrollTo(window.scrollY);
        }
        return;
      }
      
      // Handle object options with top property (non-smooth)
      if (typeof options === 'object' && options && 'top' in options) {
        const scrollOpts = options as { top?: number };
        const topVal = scrollOpts.top;
        if (typeof topVal === 'number' && !isNaN(topVal)) {
          this.smoothScrollTo(topVal);
        }
        return;
      }
      
      // Handle numeric arguments: window.scrollTo(x, y)
      if (typeof options === 'number' && typeof y === 'number') {
        this.smoothScrollTo(y);
        return;
      }
      
      // Fallback to original
      if (typeof options === 'number' && y !== undefined) {
        originalScrollTo(options, y);
      } else {
        originalScrollTo(options as any, y as any);
      }
    };

    // Override Element.scrollIntoView
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (options?: boolean | ScrollIntoViewOptions) {
      if (typeof options === 'object' && options.behavior === 'smooth') {
        const element = this as HTMLElement;
        const scrollY = window.scrollY + element.getBoundingClientRect().top;
        smoothScrollInstance.smoothScrollTo(scrollY);
      } else {
        originalScrollIntoView.call(this, options);
      }
    };
  }

  public scrollToElement(element: HTMLElement, options: ScrollOptions = {}) {
    const { block = 'start' } = options;
    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY;
    
    let targetY = scrollY + rect.top;
    
    // Adjust based on block option
    if (block === 'center') {
      targetY = scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
    } else if (block === 'end') {
      targetY = scrollY + rect.top - window.innerHeight + rect.height;
    }
    
    // Add offset for fixed navbar if needed
    const navbar = document.querySelector('nav');
    if (navbar && block === 'start') {
      const navbarHeight = navbar.getBoundingClientRect().height;
      targetY -= navbarHeight + 20; // 20px extra spacing
    }
    
    this.smoothScrollTo(targetY);
  }

  public smoothScrollTo(targetY: number) {
    if (this.isScrolling) {
      // Update target if already scrolling
      this.scrollTarget = targetY;
      return;
    }

    this.isScrolling = true;
    this.scrollStart = window.scrollY;
    this.scrollDistance = targetY - this.scrollStart;
    this.startTime = performance.now();
    this.scrollTarget = targetY;

    this.animate();
  }

  private animate = () => {
    const currentTime = performance.now();
    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    // Apply easing
    const easedProgress = this.easingFunction(progress);
    
    // Calculate current scroll position
    const currentY = this.scrollStart + this.scrollDistance * easedProgress;
    
    window.scrollTo(0, currentY);

    // Check if we've reached the target or duration
    if (progress < 1 && Math.abs(window.scrollY - (this.scrollTarget || 0)) > 1) {
      requestAnimationFrame(this.animate);
    } else {
      // Ensure we're exactly at the target
      window.scrollTo(0, this.scrollTarget || 0);
      this.isScrolling = false;
      this.scrollTarget = null;
    }
  };

  public setDuration(duration: number) {
    this.duration = duration;
  }

  public setEasingFunction(fn: (t: number) => number) {
    this.easingFunction = fn;
  }
}

// Create singleton instance
const smoothScrollInstance = new SmoothScroll();

// Export utility functions
export const smoothScrollTo = (targetY: number) => {
  smoothScrollInstance.smoothScrollTo(targetY);
};

export const scrollToElement = (element: HTMLElement, options?: ScrollOptions) => {
  smoothScrollInstance.scrollToElement(element, options);
};

export default smoothScrollInstance;
