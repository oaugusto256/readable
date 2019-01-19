import React from 'react';

const Error = ({ code, desc }) => {
  return (
    <div className="error-container">
      <p className="error-code">{code}</p>
      <p className="error-desc">{desc}</p>
    </div>
  );
}

export default Error;