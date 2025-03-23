import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import axios from 'axios';

const Portfolio = ({ portfolioData, darkMode, setDarkMode }) => {
  const [remoteProjects, setRemoteProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Effect for dynamic project data fetching (example using GitHub API)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Example API endpoint - in a real app, you would use your own endpoint
        // This is just a placeholder to demonstrate the concept
        const response = await axios.get('https://api.github.com/users/octocat/repos');
        
        // Merge with existing projects data
        const enhancedProjects = portfolioData.projects.map((project, index) => {
          if (response.data[index]) {
            return {
              ...project,
              stars: response.data[index].stargazers_count,
              lastUpdated: response.data[index].updated_at
            };
          }
          return project;
        });
        
        setRemoteProjects(enhancedProjects);
      } catch (error) {
        console.error('Error fetching project data:', error);
        // Fall back to the user-provided projects
        setRemoteProjects(portfolioData.projects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [portfolioData.projects]);

  // If no portfolio data is available, redirect to data entry page
  if (!portfolioData) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      {/* Orbit Background */}
      <div className="orbit-background fixed top-0 left-0 right-0 bottom-0 overflow-hidden -z-10">
        <div className="stars"></div>
        <div className="orbit orbit-1"></div>
        <div className="orbit orbit-2"></div>
        <div className="orbit orbit-3"></div>
        <div className="planet"></div>
      </div>
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero name={portfolioData.name} shortBio={portfolioData.shortBio} />
      <About 
        profilePicture={portfolioData.about.profilePicture}
        skills={portfolioData.about.skills}
        interests={portfolioData.about.interests}
        description={portfolioData.about.description}
        darkMode={darkMode}
      />
      <Projects 
        projects={loading ? portfolioData.projects : remoteProjects} 
        isLoading={loading}
        darkMode={darkMode}
      />
      <Contact 
        formSubmitted={formSubmitted} 
        setFormSubmitted={setFormSubmitted} 
        darkMode={darkMode}
      />
      <Footer 
        socialMedia={portfolioData.socialMedia} 
        darkMode={darkMode}
      />
    </div>
  );
};

export default Portfolio;