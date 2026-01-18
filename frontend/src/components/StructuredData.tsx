import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface StructuredDataProps {
  type?: 'home' | 'about' | 'services' | 'contact' | 'faq' | 'default';
}

const StructuredData = ({ type = 'default' }: StructuredDataProps) => {
  const location = useLocation();
  const baseUrl = 'https://www.krashnatriassociates.com';
  const url = `${baseUrl}${location.pathname}`;

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: 'Krashnatri Associates',
    alternateName: 'Krashnatri Associates Survey Services',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.jpg`,
      width: 200,
      height: 50
    },
    image: `${baseUrl}/logo.jpg`,
    description: 'Professional topographic survey, land survey, and DGPS survey services in Meerut, Uttar Pradesh, India. Expert regulatory compliance, aviation NOC, highway approvals, and documentation support.',
    foundingDate: '2010',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8410261096',
      contactType: 'Customer Service',
      email: 'krashnatriassociates@gmail.com',
      areaServed: ['IN', 'Uttar Pradesh', 'Meerut'],
      availableLanguage: ['English', 'Hindi']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Aminagar Urf Bhurbaral',
      addressLocality: 'Meerut',
      postalCode: '250103',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN'
    },
    sameAs: [],
    knowsAbout: [
      'Topographic Survey',
      'Land Survey',
      'DGPS Survey',
      'Total Station Survey',
      'Regulatory Compliance',
      'Aviation NOC',
      'Highway Approvals',
      'Documentation Support'
    ]
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}#localbusiness`,
    name: 'Krashnatri Associates',
    alternateName: 'Krashnatri Associates Survey Services',
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.jpg`,
      width: 200,
      height: 50
    },
    url: baseUrl,
    telephone: '+91-8410261096',
    email: 'krashnatriassociates@gmail.com',
    description: 'Professional topographic survey, land survey, and DGPS survey services in Meerut, Uttar Pradesh, India. Expert regulatory compliance, aviation NOC, highway approvals, and documentation support.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Aminagar Urf Bhurbaral',
      addressLocality: 'Meerut',
      postalCode: '250103',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.9845,
      longitude: 77.7064
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    priceRange: '$$',
    areaServed: [
      {
        '@type': 'Country',
        name: 'India'
      },
      {
        '@type': 'State',
        name: 'Uttar Pradesh'
      },
      {
        '@type': 'City',
        name: 'Meerut'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 50,
      bestRating: 5,
      worstRating: 1
    },
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Bank Transfer, Cheque'
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}#service`,
    serviceType: 'Survey and Consultancy Services',
    name: 'Topographic Survey, Land Survey, and Regulatory Compliance Services',
    description: 'Professional survey services including topography mapping, DGPS survey, total station survey, regulatory compliance, aviation NOC, highway approvals, and documentation support across India',
    provider: {
      '@id': `${baseUrl}#organization`,
      '@type': 'LocalBusiness',
      name: 'Krashnatri Associates'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 50,
      bestRating: 5,
      worstRating: 1
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'India'
      },
      {
        '@type': 'State',
        name: 'Uttar Pradesh'
      },
      {
        '@type': 'City',
        name: 'Meerut'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Survey Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Topography & Mapping Survey',
            description: 'Land mapping, contour & site details'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'DGPS & Total Station Survey',
            description: 'High-accuracy land & boundary measurement'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Compliance Documentation Support',
            description: 'Survey-based documentation & filing help'
          }
        }
      ]
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      ...(location.pathname !== '/' ? [{
        '@type': 'ListItem',
        position: 2,
        name: location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Page',
        item: url
      }] : [])
    ]
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: 'Krashnatri Associates',
    description: 'Professional topographic survey, land survey, and DGPS survey services in Meerut, Uttar Pradesh, India. Expert regulatory compliance, aviation NOC, highway approvals, and documentation support.',
    publisher: {
      '@id': `${baseUrl}#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // WebPage Schema
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    url: url,
    name: typeof document !== 'undefined' ? document.title : 'Krashnatri Associates',
    isPartOf: {
      '@id': `${baseUrl}#website`
    },
    about: {
      '@id': `${baseUrl}#organization`
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.jpg`
    }
  };

  // FAQPage Schema (only for FAQ page)
  const faqSchema = type === 'faq' ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What survey services do you provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer three main services: Topography & Mapping Survey for land mapping and contour details, DGPS & Total Station Survey for high-accuracy land and boundary measurement, and Compliance Documentation Support for survey-based documentation and filing assistance.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does a typical survey project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Project duration depends on the site size and complexity. Small residential surveys typically take 3-5 days, while large industrial or highway projects may take 2-4 weeks. We provide detailed timelines during project planning.'
        }
      },
      {
        '@type': 'Question',
        name: 'What equipment do you use for surveys?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use modern DGPS (Differential Global Positioning System) and Total Station equipment for high-precision measurements. Our team is trained on the latest surveying technology to ensure accurate results.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you provide survey reports and documentation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide comprehensive survey reports including maps, contour details, boundary measurements, and all necessary documentation required for regulatory approvals and project planning.'
        }
      },
      {
        '@type': 'Question',
        name: 'What areas do you cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We primarily serve Delhi NCR and surrounding regions. We can also undertake projects across India depending on the scope and requirements. Contact us to discuss your specific location needs.'
        }
      }
    ]
  } : null;

  // Remove undefined properties from localBusinessSchema
  const cleanedLocalBusinessSchema = Object.fromEntries(
    Object.entries(localBusinessSchema).filter(([_, v]) => v !== undefined)
  );

  const schemas = [
    organizationSchema, 
    cleanedLocalBusinessSchema, 
    websiteSchema,
    serviceSchema, 
    breadcrumbSchema, 
    webpageSchema,
    ...(faqSchema ? [faqSchema] : [])
  ];

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;
