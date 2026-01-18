import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const Projects = () => {
  const projects = [
    {
      title: 'Highway Infrastructure Project',
      category: 'Infrastructure',
      description: 'Land & alignment survey for highway development.',
    },
    {
      title: 'Residential Township Survey',
      category: 'Real Estate',
      description: 'Land and topographic survey for housing projects.',
    },
    {
      title: 'Industrial Park Planning',
      category: 'Industrial',
      description: 'Site survey and planning support for industrial areas.',
    },
  ];

  return (
    <div>
      <SEO
        title="Projects - Survey Projects & Case Studies | Krashnatri Associates"
        description="Explore our survey projects including highway infrastructure, residential township surveys, and industrial park planning. Professional land and topographic survey services in Meerut, India."
        keywords="survey projects, highway survey, residential survey, industrial survey, topographic survey projects"
        image="/logo.jpg"
      />
      <StructuredData />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 break-words">Our Projects</h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-100 max-w-3xl break-words">
            Showcasing our successful projects and achievements
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100 min-w-0"
              >
                <span className="inline-block bg-primary-100 text-primary-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-3 break-words">
                  {project.category}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 break-words">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 break-words">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
