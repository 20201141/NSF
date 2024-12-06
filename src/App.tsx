import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Post } from './classes/Post'
import './App.css';

import logo from './images/logo.png';
import filter from './images/filter-32.svg';
import PageNotFound from "./PageNotFound";

import Forum from "./forum/Forum";
import Builder from "./builder/Builder";
import PostDetails from "./postDetails/PostDetails";
import PostForm from "./postCreation/PostForm";

import Login from "./account/Login";
import UserSettings from "./account/UserSettings";
import Settings from './account/Settings';
import MyPosts from './account/MyPosts';
import Personalize from './account/Personalize';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // User Account
  const [isAccount, setIsAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [redirectLink, setRedirectLink] = useState<string>("/");

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

  const handleProtectedLink = (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (!isLoggedIn) {
      event.preventDefault();
      setRedirectLink(link);
      setIsAccount(true);
    } else {
      setIsLoggedIn(true);
    }
  };


  const [isDark, setIsDark] = useState<boolean>(false);

  // fetch user's preference from DB
  useEffect(() => {
    const fetchThemePreference = async () => {
      try {
        const response = await fetch('/api/user-theme');
        const data = await response.json();
        console.log("isDark:", data.isDark);
        setIsDark(data.isDark);
      } catch (error) {
        console.error("Error fetching theme preference:", error);
      }
    };
    fetchThemePreference();
  }, []);

  return (
    <Router>
      <div className= {isDark ? "app-container" : "app-container-dark"}>
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

        <Login 
          isOpen={isAccount} 
          onClose={() => setIsAccount(false)} 
          onLoginSuccess={() => {
            setIsLoggedIn(true); 
            setIsAccount(false);
            window.location.href = redirectLink;
          }} 
        />
        <div className="sidebar">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/create-post" className="menu-item">Create Post</Link>
          <Link to="/builder" className="menu-item">Builder</Link>
          <Link to="/account" className="menu-item">My Account</Link>
        </div>

        <div className={isDark ? "content" : "content-dark"}>
          <Routes>

            <Route path="/" element={
              <div>
                <Forum posts={filteredPosts} />
              </div>} />
            <Route path="/create-post" element={<PostForm />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/account" element={<UserSettings />} >
              <Route index element={<Settings />} />
              <Route path="my-posts" element={<MyPosts />} />
              <Route path="personalize" element={<Personalize isDark={isDark} setIsDark={setIsDark} />} />
            </Route>
            <Route path="/post/:postId" element={<PostDetails posts={filteredPosts} loading={loading} />} />
            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
