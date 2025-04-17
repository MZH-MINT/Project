import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import IconButton from '@mui/material/IconButton';
import { useThemeToggle } from '../components/ThemeContext'; // ✅ import the theme context
import '../style/header.css';

const Header: React.FC = () => {
  const toggleTheme = useThemeToggle(); // ✅ use the theme toggle function

  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="header-title">Employee Managing System by Zuhayr</h1>
        
        <nav className="header-nav">
          {/* Add navigation links here if needed */}
          
          {/* ✅ Theme Toggle Button */}
          <IconButton color="inherit" onClick={toggleTheme}>
            <Brightness4Icon />
          </IconButton>
        </nav>
      </div>
    </header>
  );
};

export default Header;
