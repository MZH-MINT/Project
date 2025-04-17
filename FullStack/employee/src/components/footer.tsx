import React from 'react';
import '../style/footer.css'; // Import the external CSS file

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">&copy; 2025 Employee Management System | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
