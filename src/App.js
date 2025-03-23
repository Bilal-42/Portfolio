import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataEntryPage from './components/DataEntryPage';
import Portfolio from './components/Portfolio';
import './App.css';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <div className={darkMode ? 'dark' : 'light'}>
        <Routes>
          <Route path="/" element={<DataEntryPage setPortfolioData={setPortfolioData} />} />
          <Route 
            path="/portfolio" 
            element={
              <Portfolio 
                portfolioData={portfolioData} 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
              />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
