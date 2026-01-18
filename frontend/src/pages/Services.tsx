import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const Services = () => {
  const services = [
    {
      title: 'Topography & Mapping Survey',
      description: 'Land mapping, contour & site details.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
    {
      title: 'DGPS & Total Station Survey',
      description: 'High-accuracy land & boundary measurement.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Compliance Documentation Support',
      description: 'Survey-based documentation & filing help.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <SEO
        title="Survey Services - Topography, DGPS & Total Station Survey | Krashnatri Associates"
        description="Professional survey services including Topography & Mapping Survey, DGPS & Total Station Survey, and Compliance Documentation Support in Meerut, India. High-accuracy land and boundary measurement services."
        keywords="topography survey, mapping survey, DGPS survey, total station survey, land survey services, boundary survey, site survey"
        image="/logo.jpg"
      />
      <StructuredData type="services" />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 break-words">Our Services</h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-100 max-w-3xl break-words">
            Comprehensive consultancy solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100 min-w-0"
              >
                <div className="text-primary-600 mb-3 sm:mb-4">{service.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 break-words">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 break-words">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 break-words">
            Need Custom Solutions?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 break-words">
            We can tailor our services to meet your specific requirements
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm sm:text-base"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
