import React from 'react';
import { Link } from 'react-router-dom';
import './Forum.css';

type Post = {
  post_id: number;
  username: string;
  date: string;
  post_type: string;
  title: string;
  content: string;
  isresolved: boolean;
};

type ForumProps = {
  posts: Post[];
};

const Forum: React.FC<ForumProps> = ({ posts }) => {
  return (
    <div className="forum">
      {posts.map((post) => (
        <div key={post.post_id} className="post-card">
          <div className="post-header">
            <span>{post.username} • {new Date(post.date).toLocaleString()}</span>
            <span className="post-category">{post.post_type}</span>
          </div>
          <Link to={`/post/${post.post_id}`} className="post-title">
            {post.title}
          </Link>
          <p>{post.content}</p>
          {post.isresolved && <p>Status: Resolved</p>}
        </div>
      ))}
    </div>
  );
};

export default Forum;
