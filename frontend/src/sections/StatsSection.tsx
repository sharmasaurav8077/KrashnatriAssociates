import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface StatsSectionProps {
  id?: string;
}

const StatsSection = ({ id }: StatsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    { target: 10, label: 'Years Experience' },
    { target: 500, label: 'Happy Clients' },
    { target: 1000, label: 'Projects Completed' },
    { target: 250, label: 'Approvals Secured' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      statRefs.current.forEach((statRef, index) => {
        if (!statRef) return;

        const targetValue = stats[index].target;

        // Set initial value
        statRef.textContent = '0+';

        // Create a counter object for GSAP to animate
        const counter = { value: 0 };

        gsap.to(counter, {
          value: targetValue,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true, // Only animate once
            toggleActions: 'play none none none',
          },
          onUpdate: function () {
            // Update the text content with the animated value
            const currentValue = Math.floor(counter.value);
            statRef.textContent = `${currentValue}+`;
          },
          onComplete: function () {
            // Ensure final value is set
            statRef.textContent = `${targetValue}+`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="py-10 sm:py-12 md:py-16 lg:py-20 bg-primary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center min-w-0">
              <div
                ref={(el) => {
                  statRefs.current[index] = el;
                }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-1.5 md:mb-2 break-words"
              >
                0+
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg text-primary-100 break-words px-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
