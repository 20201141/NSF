// components/PostDetails.tsx
import React from "react";
import { Post } from "../classes/Post";
import { useParams } from "react-router-dom";

const PostDetails: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const { postId } = useParams<{ postId: string }>();
  
  // Parse postId to a number
  const postIndex = parseInt(postId || "0", 10);
  const post = posts[postIndex]; // Get the post using the index

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-details" style={{ backgroundColor: '#4f87ff', borderRadius: '10px', padding: '16px', color: 'white', width: '750px' }}>
      <p>{post.username} • {post.date}</p>
      <p>{post.category}</p>
      <h1>{post.title}</h1>
      <div className="tags" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {post.tags.map((tag, idx) => (
          <span key={idx} className="tag" style={{ backgroundColor: '#EFEFEF', color: '#000', padding: '4px 8px', borderRadius: '8px' }}>{tag}</span>
        ))}
      </div>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetails;
