import { useState, useEffect } from 'react';
import ModeIcon from '../../assets/icon-moon.svg'; 
import SunIcon from '../../assets/icon-sun.svg'

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

 
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode'); 
    } else {
      document.body.classList.remove('dark-mode'); 
    }
  }, [isDarkMode]); 

  return (
    <div className={`header ${isDarkMode ? 'dark' : ''}`}>
      <h2>devfinder</h2>
      <button onClick={toggleDarkMode}>
        <p >{isDarkMode ? 'LIGHT' : 'DARK'}</p>
        <img src={isDarkMode? SunIcon:ModeIcon} alt="Toggle Mode" />
      </button>
    </div>
  );
};

export default Header;
