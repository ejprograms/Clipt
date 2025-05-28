
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center p-6">
      <div className="animate-float">
        <h1 className="text-4xl font-bold text-white gradient-white bg-clip-text animate-gradient-shift">
          CLIPT
        </h1>
      </div>
    </header>
  );
};
