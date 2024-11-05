// components/Forum.tsx
import React from "react";
import { Post } from "../classes/Post";
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
          <a href="Hello" className="post-title">
            {post.title}
          </a>
          <div className="post-tags">
            {post.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      <button className="floating-button" onClick={() => "Here"}>
      +
      </button> 
    </div>
  );
};

export default Forum;
