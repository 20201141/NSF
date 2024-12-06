import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Forum.css';
import { Post } from '../classes/Post';
import Personalize from '../account/Personalize';

type ForumProps = {
  posts: Post[];
};

const Forum: React.FC<ForumProps> = ({ posts }) => {

  const [isDark, setIsDark] = useState<boolean>(false);

  // fetch user's preference from DB
  useEffect(() => {
    const fetchThemePreference = async () => {
      try {
        const response = await fetch('/api/user-theme');
        const data = await response.json();
        setIsDark(data.isDark);
      } catch (error) {
        console.error("Error fetching theme preference:", error);
      }
    };
    fetchThemePreference();
  }, []);


//{isDark ? "app-container" : "app-container-dark"}
  return (
    <div className={isDark ? "forum" : "forum-dark"}>
      {posts.map((post) => {
        return (
          <div key={post.post_id} className="post-card">
            <div className="post-header">
              <span>{post.username} • {new Date(post.date).toLocaleString()}</span>
              <span className="post-category">{post.post_type}</span>
            </div>
            <Link to={`/post/${post.post_id}`} className="post-title">
              {post.title}
            </Link>
            <p>{post.content}</p>

            {/* Display Tags */}
            <div className="post-tags">
              {post.tags && post.tags.split(',').map((tag, index) => (
                <span key={index} className="tag">{tag.trim()}</span>
              ))}
            </div>
            {post.isresolved && <p>Status: Resolved</p>}
          </div>
        );
      })}
    </div>
  );
};

export default Forum;
