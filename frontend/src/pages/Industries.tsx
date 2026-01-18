import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const Industries = () => {
  const industries = [
    {
      name: 'Technology',
      description:
        'Helping tech companies scale, innovate, and stay ahead of the curve.',
      icon: '💻',
    },
    {
      name: 'Healthcare',
      description:
        'Supporting healthcare organizations in delivering better patient outcomes.',
      icon: '🏥',
    },
    {
      name: 'Finance',
      description:
        'Navigating regulatory challenges and optimizing financial operations.',
      icon: '💰',
    },
    {
      name: 'Manufacturing',
      description:
        'Driving efficiency and innovation in manufacturing processes.',
      icon: '🏭',
    },
    {
      name: 'Retail',
      description:
        'Transforming retail experiences and optimizing supply chains.',
      icon: '🛍️',
    },
    {
      name: 'Energy',
      description:
        'Supporting the transition to sustainable energy solutions.',
      icon: '⚡',
    },
    {
      name: 'Education',
      description:
        'Enhancing educational institutions with modern solutions.',
      icon: '📚',
    },
    {
      name: 'Real Estate',
      description:
        'Optimizing property management and investment strategies.',
      icon: '🏢',
    },
  ];

  return (
    <div>
      <SEO
        title="Industries We Serve - Survey Services Across Industries | Krashnatri Associates"
        description="Krashnatri Associates provides professional survey and consultancy services across multiple industries including technology, healthcare, finance, manufacturing, retail, energy, education, and real estate in India."
        keywords="survey services industries, topographic survey for industries, land survey services, survey consultancy"
        image="/logo.jpg"
      />
      <StructuredData />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 break-words">
            Industries We Serve
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-100 max-w-3xl break-words">
            Specialized expertise across diverse sectors
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 text-center min-w-0"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{industry.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 break-words">
                  {industry.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 break-words">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-900 text-center break-words">
            Industry Expertise
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 break-words">
              Our consultants bring deep industry knowledge and understanding of
              sector-specific challenges. We combine this expertise with
              cross-industry best practices to deliver innovative solutions
              that drive real results.
            </p>
            <p className="text-base sm:text-lg text-gray-600 break-words">
              Whether you're in a traditional industry looking to modernize or
              a cutting-edge sector seeking to scale, we have the experience and
              insights to help you succeed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
