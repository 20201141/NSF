import React from 'react';
import './Comment.css';

interface CommentProps {
  date: number,
  content: string,
  username: string
};

function Comment(props: CommentProps) {
  return <div className="Comment">
    <u className="Comment-username">{props.username}</u>
    <br/>
    <p className="Comment-content">{props.content}</p>
  </div>
}

export default Comment;
