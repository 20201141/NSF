import React from 'react';
import { Link } from 'react-router-dom';
import './Forum.css';
import { Post } from '../classes/Post';

type ForumProps = {
  posts: Post[];
};

const Forum: React.FC<ForumProps> = ({ posts }) => {
  return (
    <div className="forum">
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
