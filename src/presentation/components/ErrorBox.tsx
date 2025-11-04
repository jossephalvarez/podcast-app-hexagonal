import React from 'react';

export const ErrorBox: React.FC<{ message: string }> = ({ message }) => (
  <div className="error-boundary">
    <strong>Error:</strong> {message}
  </div>
);
