import React from "react";
import "../../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-icons">
          <a href="https://github.com/walter10x" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/youwrivero1403rusername" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://facebook.com/walterrivero" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com/walterrivero865" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/+34602438304" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <p className="footer-text">© 2024 Walter Rivero. All rights reserved.</p>
      </div>
    </footer>
  );
};


