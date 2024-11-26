import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetails.css';
import CommentDetails from './CommentDetails';
import { Comment } from '../classes/Comment';
import { Post } from '../classes/Post';

type PostDetailsProps = {
  posts: Post[];
  loading: boolean;
};

const PostDetails: React.FC<PostDetailsProps> = ({ posts, loading }) => {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  /*const [activator, activate] = useState(false);

  useEffect(() => {
    async function getComments() {
      try {
        const resp = await fetch(`/comments/${postId}`);
        const data = await resp.json();
        setComments(data);
      } catch(err) {
        setComments([]);
      }
    };
    getComments();
  }, [activator])*/
  setComments(postId === "1" ? [{
     content: "yessir",
     date: "11/26/24",
     likes: 1,
     username: "python",
     parent_id: 1,
  }] : []);


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

  // activate(true); // hack

  return (
    <>
      <div className="post-details">
        <p>{post.username} • {new Date(post.date).toLocaleString()}</p>
        <p>Category: {post.post_type}</p>
        <h1>{post.title}</h1>
        <p>{post.content}</p>

        {/* Tags */}
        <div className="tags">
          {post.tags && post.tags.split(',').map((tag, index) => (
            <span key={index} className="tag">{tag.trim()}</span>
          ))}
        </div>
        
        {post.isresolved && <p>Status: Resolved</p>}
        {post.code && (
          <div>
            <h3>Code:</h3>
            <pre>{post.code}</pre>
          </div>
        )}
        {post.getnotif && <p>Notifications: Enabled</p>}
      </div>
      <form action='/api/comments' method='POST' className='post-details-comment-form'>
        <textarea name='content'></textarea>
        <div className='post-content-btn'>
          <button type='submit' className='comment-submit-btn'>Comment</button>
        </div>
        <input name='post_id' type='number' hidden value={post.post_id} />
        {/*<input name='parent_id' type='string' hidden value={'null'} />*/}
      </form>
      {
        comments
          .sort((commentA, commentB) => (commentA.likes - commentB.likes))
          .map((_, ind) => <CommentDetails comments={comments} commentIndex={ind}/>)
      }
    </>
  );
};

export default PostDetails;
