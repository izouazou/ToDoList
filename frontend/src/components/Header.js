import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; 

const Header = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <div className="header">
      <h1>To Do List</h1>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? <FiMoon size="34px" /> : <FiSun size="34px" />}
      </button>
    </div>
  );
};

export default Header;








