import React, { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import TasksListPage from './pages/TasksListPage';
import TaskPage from './pages/TaskPage';
import './App.css';

function App() {
  const storedDarkMode = localStorage.getItem('darkMode');
  const initialDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;

  const [isDarkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="app">
          <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          <Routes>
            <Route path="/" element={<TasksListPage />} />
            <Route path="/task/:id" element={<TaskPage />} />
            <Route path="/task/" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;