import React from 'react';
import { useParams } from 'react-router-dom';
import './PostDetails.css';
import CommentDetails from './CommentDetails';
import { Comment } from '../classes/Comment';
import { Post } from '../classes/Post';

type PostDetailsProps = {
  posts: Post[];
  loading: boolean;
  username: string;
};

const PostDetails: React.FC<PostDetailsProps> = ({ posts, loading, username }) => {
  const { postId } = useParams<{ postId: string }>();

  console.log("Loading:", loading);
  console.log("Posts:", posts);
  console.log("postId from URL:", postId);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Ensure posts is an array before trying to use .find()
  if (!Array.isArray(posts)) {
    console.error("posts is not an array:", posts);
    return <div>Data format error: posts is not an array.</div>;
  }

  const post = posts.find((p) => p.post_id === parseInt(postId || "0", 10));
  console.log("Matched Post:", post);

  if (!post) {
    return <div>Post not found</div>;
  }

  const comments: Comment[] = [];

  return (<>
    <div className="post-details">
      <p>{post.username} • {new Date(post.date).toLocaleString()}</p>
      <p>Category: {post.post_type}</p>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.isresolved && <p>Status: Resolved</p>}
      {post.code && (
        <div>
          <h3>Code:</h3>
          <pre>{post.code}</pre>
        </div>
      )}
      {post.getnotif && <p>Notifications: Enabled</p>}
    </div>
    {
      comments
        .sort((commentA, commentB) => (commentA.likes - commentB.likes))
        .map((_, ind) => <CommentDetails comments={comments} commentIndex={ind} username={username}/>)
    }
  </>);
};

export default PostDetails;
