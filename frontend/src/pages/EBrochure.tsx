import { useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const EBrochure = () => {
  const brochureContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable right-click on brochure container
    const handleContextMenu = (e: MouseEvent) => {
      if (brochureContainerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        return false;
      }
    };

    // Disable drag & drop
    const handleDragStart = (e: DragEvent) => {
      if (brochureContainerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      if (brochureContainerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        return false;
      }
    };

    // Disable keyboard shortcuts (Ctrl+S, Ctrl+P, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (brochureContainerRef.current?.contains(e.target as Node)) {
        // Block Ctrl+S (Save), Ctrl+P (Print), Ctrl+A (Select All)
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'a')) {
          e.preventDefault();
          return false;
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <SEO
        title="E-Brochure - View Company Brochure | Krashnatri Associates"
        description="View the comprehensive Krashnatri Associates company brochure. Learn about our topographic survey, land survey, DGPS survey, and regulatory compliance services in Meerut, India."
        keywords="company brochure, survey services brochure, Krashnatri Associates brochure"
        image="/logo.jpg"
      />
      <StructuredData />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 break-words">E-Brochure</h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-100 max-w-3xl break-words">
            View our comprehensive company brochure
          </p>
        </div>
      </section>

      {/* Brochure Viewer Section */}
      <section className="py-4 sm:py-6 md:py-8 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div 
            ref={brochureContainerRef}
            className="bg-white rounded-lg shadow-lg overflow-hidden w-full"
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              pointerEvents: 'auto',
              position: 'relative',
              height: 'calc(100vh - 180px)',
              minHeight: '500px'
            }}
          >
            <iframe
              src="/brochure/company-brochure.pdf#toolbar=0"
              className="w-full h-full border-0"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
                pointerEvents: 'auto'
              }}
              title="Krashnatri Associates Company Brochure"
              allow="fullscreen"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EBrochure;
