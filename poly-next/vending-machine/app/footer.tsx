import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-green-800 py-6">
      <div className="md:px-12 lg:px-28">
        <div className="container m-auto space-y-3 text-gray-600 dark:text-gray-300">
          <div className="text-center">
            <span className="text-sm tracking-wide">
              Copyright © STUDIO X <span id="year"></span> | All right reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
