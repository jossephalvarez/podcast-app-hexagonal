import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <main className="notfound-container">
    <h1 className="notfound-title">404 - Page Not Found</h1>
    <p className="notfound-message">Sorry, the page doesnt exist or has been moved.</p>
    <Link to="/" className="notfound-button">
      Back to Home
    </Link>
  </main>
);
