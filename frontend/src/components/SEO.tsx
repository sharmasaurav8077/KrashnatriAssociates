import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}

const SEO = ({ 
  title, 
  description, 
  keywords = '', 
  image = '/logo.jpg',
  type = 'website',
  noindex = false
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = 'https://www.krashnatriassociates.com';
  const url = `${baseUrl}${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const defaultKeywords = [
    'Topographic survey',
    'Land survey',
    'DGPS survey',
    'Total station survey',
    'Regulatory compliance',
    'Aviation NOC',
    'Highway approvals',
    'Documentation support',
    'Consultancy services',
    'Survey services India',
    'Land survey Meerut',
    'Topographic mapping',
    'Site survey',
    'Boundary survey',
    'Survey services Pan India',
    'DGPS & total station',
    'Survey consultancy India',
    'Krashnatri Associates'
  ].join(', ');

  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Krashnatri Associates" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Krashnatri Associates" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Meerut, Uttar Pradesh, India" />
      <meta name="geo.position" content="28.9845;77.7064" />
      <meta name="ICBM" content="28.9845, 77.7064" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="theme-color" content="#0B2254" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=yes" />
      
      {/* Additional Open Graph Tags */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={title} />
      
      {/* Additional Twitter Tags */}
      <meta name="twitter:site" content="@krashnatriassociates" />
      <meta name="twitter:creator" content="@krashnatriassociates" />
      <meta name="twitter:image:alt" content={title} />
    </Helmet>
  );
};

export default SEO;
