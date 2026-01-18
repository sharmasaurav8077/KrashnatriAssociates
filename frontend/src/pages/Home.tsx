import HeroSection from '../sections/HeroSection';
import ProcessSection from '../sections/ProcessSection';
import ServicesSection from '../sections/ServicesSection';
import StatsSection from '../sections/StatsSection';
import ContactSection from '../sections/ContactSection';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const Home = () => {
  return (
    <div>
      <SEO
        title="Krashnatri Associates - Topographic Survey & Land Survey Services in Meerut, India"
        description="Professional topographic survey, land survey, and DGPS survey services in Meerut, Uttar Pradesh. Expert regulatory compliance, aviation NOC, highway approvals, and documentation support. Contact us for accurate site data and mapping solutions."
        keywords="topographic survey, land survey, DGPS survey, total station survey, Meerut, Uttar Pradesh, India, regulatory compliance, aviation NOC, highway approvals"
        image="/images/topography-hero.jpg"
      />
      <StructuredData type="home" />
      <HeroSection id="hero" />
      
      <ScrollReveal>
        <ProcessSection id="intro" />
      </ScrollReveal>

      {/* ServicesSection has its own scroll reveal animation built-in */}
      <ServicesSection id="services" />

      <ScrollReveal>
        <StatsSection id="stats" />
      </ScrollReveal>

      <ScrollReveal>
        <ContactSection id="contact" />
      </ScrollReveal>
    </div>
  );
};

export default Home;
