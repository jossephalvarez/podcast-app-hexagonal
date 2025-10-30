import React from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../../application/hooks/useLoading';

export const Header: React.FC = () => {
  const { loading } = useLoading();

  return (
    <header className="header">
      <Link to="/">
        <h1>Podcast App</h1>
      </Link>

      {loading && (
        <div
          style={{
            width: '20px',
            height: '20px',
            border: '2px solid #ccc',
            borderTop: '2px solid #0070f3',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}
    </header>
  );
};
