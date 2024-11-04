import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <Link to="/" className="home-icon">
            <img src="icon.png" alt="Home" />
          </Link>
          <input type="text" placeholder="Search Post" className="search-bar" />
          <button className="filter-button">
            <img src="filter-icon.png" alt="Filter" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="sidebar">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/create-post" className="menu-item">Create Post</Link>
          <Link to="/builder" className="menu-item">Builder</Link>
          <Link to="/account" className="menu-item">My Account</Link>
        </div>

        {/* Main Content Area */}
        <div className="content">
          <Routes>
            <Route path="/" element={<div>Home Component</div>} />
            <Route path="/create-post" element={<div>Create Post Component</div>} />
            <Route path="/builder" element={<div>Builder Component</div>} />
            <Route path="/account" element={<div>My Account Component</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
