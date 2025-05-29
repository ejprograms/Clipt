
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen grid-bg font-inter flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-white/80 text-xl mb-8">Page not found</p>
        <Link 
          to="/" 
          className="inline-block gradient-white text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
