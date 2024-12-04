import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetails.css';
import CommentDetails from './CommentDetails';
import { Comment } from '../classes/Comment';
import { Post } from '../classes/Post';
import JsonForm from '../jsonForm/JsonForm';
import { makeInputChangeHandler } from '../FormUtils';

type PostDetailsProps = {
  posts: Post[];
  loading: boolean;
};

type PostIdProp = {postId: string;};
const CommentList: React.FC<PostIdProp> = ({postId}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    async function getComments() {
      try {
        const resp = await fetch(`/api/comments/${postId}`);
        if(resp.ok) {
          const raw_data = await resp.text();
          console.log(`fetch('/api/comments/${postId}') =>`, raw_data)
          const data = JSON.parse(raw_data); // await resp.json();
          console.log('data successfully parsed');
          setComments(data);
        }
      } catch(_) {
        // setComments([]);
      }
    };
    getComments();
  }, []);
  return <>
    {
      comments
        .filter(comment => comment.parent_id == null)
        .sort((commentA, commentB) => (commentA.likes - commentB.likes))
        .map((_, ind) => <CommentDetails comments={comments} commentIndex={ind}/>)
    }
  </>;
}

const PostDetails: React.FC<PostDetailsProps> = ({ posts, loading }) => {
  const { postId } = useParams<{ postId: string }>();

  const [commentFormData, setCommentFormData] = useState({
    content: '',
    post_id: parseInt(postId || "0", 10)
  });

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
      <JsonForm
        formData={commentFormData}
        action='/api/comments'
        method='POST'
        className='post-details-comment-form'
      >
        <textarea name='content' onChange={makeInputChangeHandler(setCommentFormData)}></textarea>
        <div className='post-content-btn'>
          <button type='submit' className='comment-submit-btn'>Comment</button>
        </div>
        <input name='post_id' type='number' hidden value={post.post_id} />
        {/*<input name='parent_id' type='string' hidden value={'null'} />*/}
      </JsonForm>
      <CommentList postId={postId || "1"} />
    </>
  );
};

export default PostDetails;
