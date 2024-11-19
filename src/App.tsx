import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

import logo from './images/logo.png';
import filter from './images/filter-32.svg';

import Forum from "./forum/Forum";
import PostDetails from "./postDetails/PostDetails";

import UserSettings from "./account/UserSettings";
import Settings from "./account/UserSettings";
import MyPosts from "./account/UserSettings";
import Personalize from "./account/UserSettings";

type Post = {
  post_id: number;
  username: string;
  date: string;
  post_type: string;
  title: string;
  content: string;
  isresolved: boolean;
  code?: string;
  getnotif?: boolean;
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Unexpected data format:", data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="app-container">
        <div className="top-nav">
          <Link to="/" className="home-icon">
            <img src={logo} className="App-logo" alt="Home" />
          </Link>
          <input 
            type="text" 
            placeholder="Search posts..." 
            value={searchTerm} 
            onChange={handleSearch} 
            className="search-bar" 
          />
          <button className="filter-button">
            <img src={filter} className="Filter-logo" alt="Filter" />
          </button>
        </div>

        <div className="sidebar">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/create-post" className="menu-item">Create Post</Link>
          <Link to="/builder" className="menu-item">Builder</Link>
          <Link to="/account" className="menu-item">My Account</Link>
        </div>

        <div className="content">
          <Routes>

            <Route path="/" element={
              <div>
                <Forum posts={filteredPosts} />
              </div>} />
            <Route path="/create-post" element={<div>Create Post Component</div>} />
            <Route path="/builder" element={<div>Builder Component</div>} />
            <Route path="/account" element={<UserSettings />}>
              <Route index element={<Settings />} />
              <Route path="my-post" element={<MyPosts />} />
              <Route path="personalize" element={<Personalize />} />
            </Route> 
            <Route path="/post/:postId" element={<PostDetails posts={filteredPosts} loading={loading} />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
