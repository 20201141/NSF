import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

import logo from './images/logo.png';
import filter from './images/filter-32.svg';

import Forum from "./forum/Forum";
import { Post } from "./classes/Post";


const App: React.FC = () => {

  const posts: Post[] = [
    {
      username: "bob123",
      date: "2024-11-05",
      category: "Question",
      title: "What is the difference between C and C++?",
      tags: ["C", "C++"],
    },
    {
      username: "pythonlover",
      date: "2024-11-05",
      category: "Discussion",
      title: "Python is the best language",
      tags: ["Python"],
    },
    {
      username: "idkwat",
      date: "2024-11-04",
      category: "Question",
      title: "Why is my Java code not working?!?!",
      tags: ["Java"],
    },
    {
      username: "perrogrande",
      date: "2024-11-04",
      category: "Question",
      title: "What languages do companies usually look for?",
      tags: ["C++", "Java", "Python", "Go"],
    },
    {
      username: "firstuser",
      date: "2024-11-04",
      category: "Discussion",
      title: "The CS market is slowly getting better",
      tags: [""],
    },
  ];
  
  return (
    <Router>
      <div className="app-container">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <Link to="/" className="home-icon">
            <img src={logo} className="App-logo" alt="Home" />
          </Link>
          <input type="text" placeholder="Search Post" className="search-bar" />
          <button className="filter-button">
            <img src={filter} className="Filter-logo" alt="Filter" />
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
            <Route path="/" element={
              <div>
                <Forum posts={posts} />
              </div>} />
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
