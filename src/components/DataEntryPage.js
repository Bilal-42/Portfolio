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

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', description: '', image: '', githubLink: '' }]
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      projects: updatedProjects
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process skills and interests as arrays
    const processedData = {
      ...formData,
      about: {
        ...formData.about,
        skills: formData.about.skills.split(',').map(skill => skill.trim()),
        interests: formData.about.interests.split(',').map(interest => interest.trim())
      }
    };
    
    setPortfolioData(processedData);
    navigate('/portfolio');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Portfolio Data Entry
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Information */}
          <div className="space-y-6 bg-gray-800/30 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold border-b border-gray-700 pb-3">Basic Information</h2>
            <div>
              <label className="block mb-2 text-gray-300">Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange(e, 'basic', null, 'name')}
                className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Short Bio:</label>
              <textarea
                value={formData.shortBio}
                onChange={(e) => handleInputChange(e, 'basic', null, 'shortBio')}
                className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
                rows="3"
              />
            </div>
          </div>
          
          {/* About Me */}
          <div className="space-y-6 bg-gray-800/30 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold border-b border-gray-700 pb-3">About Me</h2>
            <div>
              <label className="block mb-2 text-gray-300">Profile Picture URL:</label>
              <input
                type="text"
                value={formData.about.profilePicture}
                onChange={(e) => handleInputChange(e, 'about', null, 'profilePicture')}
                className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Skills (comma-separated):</label>
              <input
                type="text"
                value={formData.about.skills}
                onChange={(e) => handleInputChange(e, 'about', null, 'skills')}
                className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
                placeholder="React, JavaScript, CSS, etc."
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Interests (comma-separated):</label>
              <input
                type="text"
                value={formData.about.interests}
                onChange={(e) => handleInputChange(e, 'about', null, 'interests')}
                className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
                placeholder="Web Development, Photography, Travel, etc."
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Detailed Description:</label>
              <textarea
                value={formData.about.description}
                onChange={(e) => handleInputChange(e, 'about', null, 'description')}
                className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
                rows="5"
              />
            </div>
          </div>
          
          {/* Projects */}
          <div className="space-y-6 bg-gray-800/30 p-6 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold border-b border-gray-700 pb-3">Projects</h2>
              <button
                type="button"
                onClick={addProject}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Project
              </button>
            </div>
            
            {formData.projects.map((project, index) => (
              <div key={index} className="p-6 bg-gray-700/30 rounded-lg border border-gray-600 relative">
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="text-xl font-semibold mb-4">Project {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-300">Title:</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleInputChange(e, 'projects', index, 'title')}
                      className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300">GitHub Link:</label>
                    <input
                      type="text"
                      value={project.githubLink}
                      onChange={(e) => handleInputChange(e, 'projects', index, 'githubLink')}
                      className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300">Image URL:</label>
                    <input
                      type="text"
                      value={project.image}
                      onChange={(e) => handleInputChange(e, 'projects', index, 'image')}
                      className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-gray-300">Description:</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleInputChange(e, 'projects', index, 'description')}
                      className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Social Media Links */}
          <div className="space-y-6 bg-gray-800/30 p-6 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold border-b border-gray-700 pb-3">Social Media Links</h2>
              <button
                type="button"
                onClick={addSocialMedia}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Social Media
              </button>
            </div>
            
            {formData.socialMedia.map((social, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                <div>
                  <label className="block mb-2 text-gray-300">Platform Name:</label>
                  <input
                    type="text"
                    value={social.name}
                    onChange={(e) => handleInputChange(e, 'socialMedia', index, 'name')}
                    className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                    placeholder="GitHub, LinkedIn, etc."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-300">URL:</label>
                  <input
                    type="text"
                    value={social.url}
                    onChange={(e) => handleInputChange(e, 'socialMedia', index, 'url')}
                    className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                    placeholder="https://..."
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-12 rounded-lg text-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
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
