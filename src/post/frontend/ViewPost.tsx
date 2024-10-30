import React from 'react';
import './ViewPost.css';
import Comment from './Comment';

function processCommentData({date, username, content}) {
  let username = 'placeholder'
  return <Comment
    date={date}
    username={username}
    content={content}
  />;
}

function ViewPost() {
  let props = {};
  return (<>
    <h1 className="ViewPost-title"></h1>
    <p className="ViewPost-content"></p>
    <iframe className="ViewPost-builder" href={props.builder_link}></iframe>
    <textarea className="ViewPost-comment-input" placeholder="comment here..."></textarea>
    <button className="ViewPost-comment-submit">Comment</button>
    <hr className="ViewPost-post-separator"/>
    {(props.comments??[]).sort((dataL, dataR) => {
      if(dataL.post_time < dataR.post_time) { return -1; }
      else if(dataL.post_time > dataR.post_time) { return 1; }
      else { return 0; }
    }).map(processCommentData)}
  </>);
}

export default ViewPost;
