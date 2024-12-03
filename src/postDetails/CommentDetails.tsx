import React from 'react';
import { Comment } from '../classes/Comment';
import { useState } from 'react';
import { handleInputChange } from '../FormUtils.ts';
import JsonForm from '../jsonForm/JsonForm';
import { useParams } from 'react-router-dom';


function daysAgo(date: Date) {
  // return date.toDateString();

  const now = new Date();
  if(date.getFullYear() < now.getFullYear()) {
    return date.toDateString();
  }
  else if(date.getMonth() < now.getMonth()) {
    const diff = now.getMonth() - date.getMonth();
    return diff === 1 ? ("1 month ago") : (diff.toString() + " months ago");
  }
  else if(date.getDay() < now.getDay()) {
    let diff = now.getDay() - date.getDay();
    if(diff >= 7) {
      diff = Math.floor(diff / 7);
      return diff.toString() + (diff !== 1 ? " weeks ago" : " week ago");
    }
    else {
      return diff.toString() + (diff !== 1 ? " days ago" : " day ago");
    }
  }
  else if(date.getMinutes() < now.getMinutes()) {
    const diff = now.getMinutes() - date.getMinutes();
    return diff.toString() + (diff !== 1 ? " minutes ago" : " minute ago");
  }
  else {
    return "now";
  }
}

const CommentDetails: React.FC<{ commentIndex: number, comments: Comment[] }> = ({ commentIndex, comments }) => {
  const comment = comments[commentIndex]; // Get the comment using the index
  const date: Date = new Date(comment.date);
  const [likes, setLikes] = useState(comment.likes);
  const [userLiked, setUserLiked] = useState(false);

  const [getReplies, setReplies] = useState(<></>);
  function onExpand() {
    const replies = comments
      .map((cmnt, id) => ({ cmnt, id }))
      .filter(({cmnt}) => cmnt.parent_id === comment.comment_id)
      .map(({id}) => id);
    const rendered_replies = replies.map((id) => <CommentDetails commentIndex={id} comments={comments} />);
    if(replies.length > 0) {
      setReplies(<div id={`comment-${commentIndex}-replies`} className="comment-replies">
        {rendered_replies}
      </div>);
    }
  }

  const toggleLike = async () => {
    try {
      const response = await fetch(`/comments/${comment.comment_id}/likes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({increment: !userLiked}),
      });
      
      const data = await response.json();

      if (response.ok) {
        setLikes(data.likes);
        setUserLiked(!userLiked);
      } else {
        console.error("Failed to update likes:", data.message);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const { postId } = useParams<{ postId: string }>();
  const [formData, setFormData] = useState({
    content: '',
    parent_id: comment.comment_id,
    post_id: parseInt(postId || "0", 10)
  });
  const [replyMakerInput, setReplyMakerInput] = useState(<></>);
  let isReplying = false;
  function makeReply() {
    isReplying = !isReplying;
    if(isReplying) {
      setReplyMakerInput(<JsonForm action='/api/comments' method='POST' className='' formData={formData}>
        <textarea 
          name="content" onChange={e => handleInputChange(e, setFormData)}
          className="comment-reply-form-input" placeholder="Comment here..."
        ></textarea>
        <div className="comment-submit-btn">
          <button type='submit'>Comment</button>
        </div>
      </JsonForm>);
    }
  }

  return <>
    <div className="comment-container">
      <div className="comment">
        <p className='comment-meta'>
          <span>{comment.username} • {daysAgo(date)}</span>
          <button className='comment-reply-button' onClick={makeReply}>Reply</button>
        </p>
        <p>{comment.content}</p>
        <p className='comment-meta'>
          <span className="likes-section">
            <button onClick={toggleLike}>Like</button> ({likes} {likes !== 1 ? 'likes' : 'like'})
          </span>
          <button className="comment-replies-expand" onClick={onExpand}>Show Replies</button>
        </p>
      </div>
      {replyMakerInput}
      {getReplies}
    </div>
  </>;
}

export default CommentDetails;
