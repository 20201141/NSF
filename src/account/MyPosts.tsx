import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Post } from "../classes/Post";
import "../forum/Forum.css";
import "./UserSettings.css";

// My Posts Component
const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
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


  // get user's posts from DB
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/user-posts");
        const data = await response.json();

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // display posts
  return (
    <div>
      <h1 style={{ color: isDark ? 'black' : 'white' }} >My Posts</h1>
      {posts.map((post) => (
        <div key={post.post_id} className="post-card">
          <div className="post-header">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="post-category">{post.post_type}</span>
              </div>
              <Link to={`/post/${post.post_id}`} className="post-title">
                {post.title}
              </Link>
              <div className="post-tags">
                <span className={`tag ${post.isresolved ? "resolved" : ""}`}>
                  {post.isresolved ? "Resolved" : "Unresolved"}
                </span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default MyPosts;