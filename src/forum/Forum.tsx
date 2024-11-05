// components/Forum.tsx
import React from "react";
import { Post } from "../classes/Post";
import { Link } from "react-router-dom";
import "./Forum.css";

type ForumProps = {
  posts: Post[];
};

const Forum: React.FC<ForumProps> = ({ posts }) => {
  return (
    <div className="forum">
      {posts.map((post, index) => (
        <div key={index} className="post-card">
          <div className="post-header">
            <span>{post.username} • {post.date}</span>
            <span className="post-category">{post.category}</span>
          </div>
          <Link to={`/post/${index}`} className="post-title"> {/* Updated Link */}
            {post.title}
          </Link>
          <div className="post-tags">
            {post.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      <button className="floating-button" onClick={
        () => 
          "Here"
        }>
      +
      </button> 
    </div>
  );
};

export default Forum;
