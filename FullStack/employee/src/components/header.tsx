import React from 'react';
import '../style/header.css'; // Import the external CSS file

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="header-title">Employee Managing System by Zuhayr</h1>
        <nav className="header-nav">
          {/* Add navigation links here if needed */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
