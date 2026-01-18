import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: 'Digital Transformation for Tech Startup',
      industry: 'Technology',
      challenge:
        'A growing tech startup needed to scale their operations while maintaining agility.',
      solution:
        'Implemented cloud infrastructure and agile methodologies, resulting in 300% growth.',
      results: [
        '300% increase in operational capacity',
        '50% reduction in infrastructure costs',
        '90% improvement in deployment speed',
      ],
    },
    {
      title: 'Healthcare System Optimization',
      industry: 'Healthcare',
      challenge:
        'A hospital network needed to improve patient care efficiency and reduce costs.',
      solution:
        'Redesigned workflows and implemented data-driven decision making processes.',
      results: [
        '25% reduction in patient wait times',
        '15% cost savings',
        '95% patient satisfaction rate',
      ],
    },
    {
      title: 'Financial Services Modernization',
      industry: 'Finance',
      challenge:
        'A financial institution required compliance updates and digital transformation.',
      solution:
        'Modernized systems while ensuring full regulatory compliance and enhanced security.',
      results: [
        '100% regulatory compliance',
        '40% faster transaction processing',
        'Zero security incidents',
      ],
    },
  ];

  return (
    <div>
      <SEO
        title="Case Studies - Survey Project Case Studies | Krashnatri Associates"
        description="Explore detailed case studies of our survey projects including highway infrastructure, residential township surveys, and industrial park planning. Professional survey solutions in India."
        keywords="survey case studies, topographic survey examples, land survey projects, survey success stories"
        image="/logo.jpg"
      />
      <StructuredData />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 break-words">Case Studies</h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-100 max-w-3xl break-words">
            Real results from real clients
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 sm:py-16 md:py-24 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-12">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-5 sm:p-6 md:p-8 border border-gray-100 min-w-0"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-6">
                  <div className="min-w-0 flex-1">
                    <span className="inline-block bg-primary-100 text-primary-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2 break-words">
                      {study.industry}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
                      {study.title}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-4 sm:mb-6">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 break-words">
                      Challenge
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 break-words">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Solution
                    </h3>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Results
                  </h3>
                  <ul className="space-y-2">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how we can help you achieve similar results
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
