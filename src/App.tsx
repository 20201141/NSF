import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

import logo from './images/logo.png';
import filter from './images/filter-32.svg';

import Forum from "./forum/Forum";
import PostDetails from "./postDetails/PostDetails"

import { Post } from "./classes/Post";


const App: React.FC = () => {

  const posts: Post[] = [
    {
      username: "bob123",
      date: "2024-11-05",
      category: "Question",
      title: "What is the difference between C and C++?",
      tags: ["C", "C++"],
      content: "I just started learning C and C++. It would help if someone could summarize or explain what is the difference in the usage of C vs C++? Can C and C++ programs be interchanged, or are they separate languages? If I learn C++ would I know C?",
    },
    {
      username: "pythonlover",
      date: "2024-11-05",
      category: "Discussion",
      title: "Python is the best language",
      tags: ["Python"],
      content: "I think Python is the best language without a single doubt in my mind. However, I don't want to be a close-minded individual, can someone change my mind on why it wouldn't be the case.",
    },
    {
      username: "idkwat",
      date: "2024-11-04",
      category: "Question",
      title: "Why is my Java code not working?!?!",
      tags: ["Java"],
      content: "Can someone please explain why my Java code won't run? I can't find the error online and my friends don't seem to understand it either.",
    },
    {
      username: "perrogrande",
      date: "2024-11-04",
      category: "Question",
      title: "What languages do companies usually look for?",
      tags: ["C++", "Java", "Python", "Go"],
      content: "What title says, what languages should I learn for companies to actualy looks at my application?",
    },
    {
      username: "firstuser",
      date: "2024-11-04",
      category: "Discussion",
      title: "The CS market is slowly getting better",
      tags: [""],
      content: "I think most CS majors are overreacting, I think the market is getting better. I think CS majors are just stuck in the past where you only needed to know simple leetcode to get a job. I think many CS majors are taking their major for granted and not putting in the work to actually be better than CS majors in the past, which is why they find it so hard to find internships/jobs.",
    },
  ];

  function searchPosts(posts: Post[], searchTerm: string): Post[] {
    const keywords = searchTerm.toLowerCase().split(" ");
    
    return posts.filter(post => {
      const titleMatches = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const tagsMatch = post.tags.some(tag => keywords.includes(tag.toLowerCase()));
      return titleMatches || tagsMatch;
    });
  }

  let [posts_, setPosts_] = useState(posts);

  const [searchTerm, setSearchTerm] = useState('');
  const PostSearch: React.FC = () => {
    const [filteredPosts, setFilteredPosts] = useState(posts);
  
    useEffect(() => {
      setFilteredPosts(searchPosts(posts, searchTerm));
    }, [searchTerm]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      if(filteredPosts.length >= 1)  setPosts_(filteredPosts)
    };

    return (
      <div className="search">
        <input 
          type="text" 
          placeholder="Search posts..." 
          value={searchTerm} 
          onChange={handleInputChange} 
          className="search-bar" 
          autoFocus
        />
      </div>
    );
  };
  
  
  return (
    <Router>
      <div className="app-container">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <Link to="/" className="home-icon">
            <img src={logo} className="App-logo" alt="Home" />
          </Link>
          <PostSearch />
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
                <Forum posts={posts_} />
              </div>} />
            <Route path="/create-post" element={<div>Create Post Component</div>} />
            <Route path="/builder" element={<div>Builder Component</div>} />
            <Route path="/account" element={<div>My Account Component</div>} />
            <Route path="/post/:postId" element={<PostDetails posts={posts_} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
