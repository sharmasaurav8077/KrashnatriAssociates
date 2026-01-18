import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What survey services do you provide?',
      answer:
        'We offer three main services: Topography & Mapping Survey for land mapping and contour details, DGPS & Total Station Survey for high-accuracy land and boundary measurement, and Compliance Documentation Support for survey-based documentation and filing assistance.',
    },
    {
      question: 'How long does a typical survey project take?',
      answer:
        'Project duration depends on the site size and complexity. Small residential surveys typically take 3-5 days, while large industrial or highway projects may take 2-4 weeks. We provide detailed timelines during project planning.',
    },
    {
      question: 'What equipment do you use for surveys?',
      answer:
        'We use modern DGPS (Differential Global Positioning System) and Total Station equipment for high-precision measurements. Our team is trained on the latest surveying technology to ensure accurate results.',
    },
    {
      question: 'Do you provide survey reports and documentation?',
      answer:
        'Yes, we provide comprehensive survey reports including maps, contour details, boundary measurements, and all necessary documentation required for regulatory approvals and project planning.',
    },
    {
      question: 'What areas do you cover?',
      answer:
        'We primarily serve Delhi NCR and surrounding regions. We can also undertake projects across India depending on the scope and requirements. Contact us to discuss your specific location needs.',
    },
    {
      question: 'How do you ensure survey accuracy?',
      answer:
        'We use certified equipment, follow industry-standard surveying practices, and conduct quality checks at every stage. Our experienced surveyors ensure all measurements meet required accuracy standards.',
    },
    {
      question: 'Can you help with regulatory compliance and approvals?',
      answer:
        'Yes, our Compliance Documentation Support service includes assistance with survey-based documentation, filing for approvals, and regulatory compliance for highway, aviation, and other infrastructure projects.',
    },
    {
      question: 'What information do you need to start a survey project?',
      answer:
        'We need basic project details including site location, project type, area size, and specific requirements. Contact us for a consultation, and we will guide you through the process and provide a detailed quote.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <SEO
        title="FAQ - Frequently Asked Questions | Krashnatri Associates Survey Services"
        description="Frequently asked questions about topographic survey, land survey, DGPS survey, regulatory compliance, and documentation support services. Get answers about survey equipment, project duration, coverage areas, and more."
        keywords="survey FAQ, topographic survey questions, land survey FAQ, DGPS survey information, survey services FAQ"
        image="/logo.jpg"
      />
      <StructuredData type="faq" />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 break-words">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-100 max-w-3xl break-words">
            Find answers to common questions about our services
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 sm:px-6 py-4 text-left flex justify-between items-start sm:items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base break-words flex-1 text-left">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 mt-0.5 sm:mt-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm sm:text-base text-gray-600 break-words">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 break-words">
            Still Have Questions?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 break-words">
            We're here to help. Get in touch with our team.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm sm:text-base"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
