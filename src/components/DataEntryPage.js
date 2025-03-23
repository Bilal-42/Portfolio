import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataEntryPage = ({ setPortfolioData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    shortBio: '',
    about: {
      profilePicture: '',
      skills: '',
      interests: '',
      description: ''
    },
    projects: [
      { title: '', description: '', image: '', githubLink: '' },
      { title: '', description: '', image: '', githubLink: '' },
      { title: '', description: '', image: '', githubLink: '' }
    ],
    socialMedia: [
      { name: '', url: '' }
    ]
  });

  const handleInputChange = (e, section, index, field) => {
    const { value } = e.target;
    
    if (section === 'basic') {
      setFormData({
        ...formData,
        [field]: value
      });
    } else if (section === 'about') {
      setFormData({
        ...formData,
        about: {
          ...formData.about,
          [field]: value
        }
      });
    } else if (section === 'projects') {
      const updatedProjects = [...formData.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value
      };
      
      setFormData({
        ...formData,
        projects: updatedProjects
      });
    } else if (section === 'socialMedia') {
      const updatedSocialMedia = [...formData.socialMedia];
      updatedSocialMedia[index] = {
        ...updatedSocialMedia[index],
        [field]: value
      };
      
      setFormData({
        ...formData,
        socialMedia: updatedSocialMedia
      });
    }
  };

  const addSocialMedia = () => {
    setFormData({
      ...formData,
      socialMedia: [...formData.socialMedia, { name: '', url: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process skills as an array
    const processedData = {
      ...formData,
      about: {
        ...formData.about,
        skills: formData.about.skills.split(',').map(skill => skill.trim())
      }
    };
    
    setPortfolioData(processedData);
    navigate('/portfolio');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Portfolio Data Entry</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">Basic Information</h2>
            <div>
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange(e, 'basic', null, 'name')}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Short Bio:</label>
              <textarea
                value={formData.shortBio}
                onChange={(e) => handleInputChange(e, 'basic', null, 'shortBio')}
                className="w-full p-2 bg-gray-700 rounded"
                required
                rows="3"
              />
            </div>
          </div>
          
          {/* About Me */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">About Me</h2>
            <div>
              <label className="block mb-2">Profile Picture URL:</label>
              <input
                type="text"
                value={formData.about.profilePicture}
                onChange={(e) => handleInputChange(e, 'about', null, 'profilePicture')}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Skills (comma-separated):</label>
              <input
                type="text"
                value={formData.about.skills}
                onChange={(e) => handleInputChange(e, 'about', null, 'skills')}
                className="w-full p-2 bg-gray-700 rounded"
                required
                placeholder="React, JavaScript, CSS, etc."
              />
            </div>
            <div>
              <label className="block mb-2">Interests:</label>
              <input
                type="text"
                value={formData.about.interests}
                onChange={(e) => handleInputChange(e, 'about', null, 'interests')}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Detailed Description:</label>
              <textarea
                value={formData.about.description}
                onChange={(e) => handleInputChange(e, 'about', null, 'description')}
                className="w-full p-2 bg-gray-700 rounded"
                required
                rows="5"
              />
            </div>
          </div>
          
          {/* Projects */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">Projects</h2>
            
            {formData.projects.map((project, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-3">Project {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Title:</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleInputChange(e, 'projects', index, 'title')}
                      className="w-full p-2 bg-gray-600 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">GitHub Link:</label>
                    <input
                      type="text"
                      value={project.githubLink}
                      onChange={(e) => handleInputChange(e, 'projects', index, 'githubLink')}
                      className="w-full p-2 bg-gray-600 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Image URL:</label>
                    <input
                      type="text"
                      value={project.image}
                      onChange={(e) => handleInputChange(e, 'projects', index, 'image')}
                      className="w-full p-2 bg-gray-600 rounded"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2">Description:</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleInputChange(e, 'projects', index, 'description')}
                      className="w-full p-2 bg-gray-600 rounded"
                      required
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Social Media Links */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">Social Media Links</h2>
            
            {formData.socialMedia.map((social, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-700 rounded-lg mb-4">
                <div>
                  <label className="block mb-2">Platform Name:</label>
                  <input
                    type="text"
                    value={social.name}
                    onChange={(e) => handleInputChange(e, 'socialMedia', index, 'name')}
                    className="w-full p-2 bg-gray-600 rounded"
                    required
                    placeholder="GitHub, LinkedIn, etc."
                  />
                </div>
                <div>
                  <label className="block mb-2">URL:</label>
                  <input
                    type="text"
                    value={social.url}
                    onChange={(e) => handleInputChange(e, 'socialMedia', index, 'url')}
                    className="w-full p-2 bg-gray-600 rounded"
                    required
                    placeholder="https://..."
                  />
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addSocialMedia}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors"
            >
              Add Social Media
            </button>
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-lg font-semibold transition-colors"
            >
              Generate Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataEntryPage;
