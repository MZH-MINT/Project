import React from 'react';


const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Managing system by zuhayr</h1>
        <nav className="space-x-4">
        </nav>
      </div>
    </header>
  );
};

export default Header;
