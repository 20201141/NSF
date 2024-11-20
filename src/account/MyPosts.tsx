import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Post } from "../classes/Post";
//import "./MyPosts.css";

const getLoggedInUsername = (): string => {
  //fix later when implementing login feature
  return "pythonisgreat123";
}

// My Posts Component
const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const username = getLoggedInUsername();
  
  // get user's posts from DB
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/user-posts/${username}');
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
  }, [username]);

  // handlers
  const handleEdit = (post_id: number) => {
    console.log(`Edit post with ID: ${post_id}`);
  };

  const handleSolved = (post_id: number) => {
    console.log(`Mark post with ID ${post_id} as resolved`);
  };

  const handleNotifications = (post_id: number) => {
    console.log(`Toggle notifications for post with ID: ${post_id}`);
  };

  const handleDelete = async (post_id: number) => {
    console.log(`Delete post with ID: ${post_id}`);
  };

  // display posts
  return (
    <div>
      <h1>My Posts</h1>
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
              <div className="post-actions">
                <button onClick={() => handleEdit(post.post_id)}>Edit</button>
                <button onClick={() => handleSolved(post.post_id)} disabled={post.isresolved}>
                  Mark as Solved
                </button>
                <button onClick={() => handleNotifications(post.post_id)}>
                  {post.getnotif ? "Disable Notifications" : "Enable Notifications"}
                </button>
                <button onClick={() => handleDelete(post.post_id)}>Delete</button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default MyPosts;