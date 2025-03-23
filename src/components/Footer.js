import React from 'react';

const Footer = ({ socialMedia, darkMode }) => {
  return (
    <footer className={`py-8 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            {socialMedia?.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl hover:opacity-80 transition-opacity ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;