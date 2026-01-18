import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

interface GalleryImage {
  url: string;
  publicId?: string;
  timestamp: number;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/upload/gallery`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Only update state if component is still mounted
        if (isMounted) {
          if (data.success && data.data?.images) {
            // Filter out invalid images: must have url and url must be a non-empty string
            const validImages = data.data.images.filter((img: GalleryImage) => 
              img && 
              img.url && 
              typeof img.url === 'string' && 
              img.url.trim().length > 0 &&
              img.url.startsWith('http') // Must be a valid URL
            );
            setImages(validImages);
          } else {
            setImages([]);
          }
        }
      } catch (err) {
        // Only log in development
        if (import.meta.env.DEV) {
          console.error('Error fetching gallery images:', err);
        }
        
        // Only update state if component is still mounted
        if (isMounted) {
          setError('Failed to load gallery images. Please try again later.');
          setImages([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGalleryImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <SEO
        title="Gallery - Survey Project Gallery | Krashnatri Associates"
        description="View our survey project gallery showcasing topographic surveys, land mapping, and field work. Professional survey services in Meerut, Uttar Pradesh, India."
        keywords="survey gallery, topographic survey images, land survey photos, survey project gallery"
        image="/logo.jpg"
      />
      <StructuredData />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 break-words">Gallery</h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-100 max-w-3xl break-words">
            Visual showcase of our work and projects
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                <p className="text-gray-600">Loading gallery...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">No images in gallery yet</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon for updates</p>
            </div>
          ) : images.length === 1 ? (
            <div className="flex justify-center w-full">
              <div className="w-full max-w-2xl bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={images[0].url}
                  alt="Survey project gallery image - Topographic survey, land mapping, and field work by Krashnatri Associates"
                  className="w-full h-auto object-contain max-h-[70vh] mx-auto block"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const container = target.closest('div');
                    if (container) {
                      container.style.display = 'none';
                    } else {
                      target.style.display = 'none';
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {images.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group w-full"
                >
                  <img
                    src={image.url}
                    alt={`Survey project gallery image ${index + 1} - Topographic survey, land mapping, and field work by Krashnatri Associates`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 block"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const container = target.closest('div');
                      if (container) {
                        container.style.display = 'none';
                      } else {
                        target.style.display = 'none';
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
