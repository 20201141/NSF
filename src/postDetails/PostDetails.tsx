import React from "react";
import { Post } from "../classes/Post";
import { useParams } from "react-router-dom";
import "./PostDetails.css"; // Import the CSS file

const PostDetails: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const { postId } = useParams<{ postId: string }>();
  
  // Parse postId to a number
  const postIndex = parseInt(postId || "0", 10);
  const post = posts[postIndex]; // Get the post using the index

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-details">
      <p>{post.username} • {post.date}</p>
      <p>{post.category}</p>
      <h1>{post.title}</h1>
      <div className="tags">
        {post.tags.map((tag, idx) => (
          <span key={idx} className="tag">{tag}</span>
        ))}
      </div>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetails;
