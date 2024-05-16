// Loading2.jsx
import React from 'react';
import './LoadingStyle.css'; // Ensure you have the CSS in the correct path

const Loading2 = () => {
  return (
    <div className="loader">
      <span className="loader-text">Processing</span>
      <span className="load"></span>
    </div>
  );
};

export default Loading2;
