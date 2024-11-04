import React from 'react';
import './ViewPost.css';
import Comment from './Comment';

class PostData {
  public title: string;
  public content: string;
  public builder_link: string;

  constructor(title: string, content: string, builder_link: string) {
    this.title = title;
    this.content = content;
    this.builder_link = builder_link;
  }
}

const postData = new PostData("Why isn't my code compiling?", "My code won't compile", "");
const comments: [] | null = null;

function ViewPost() {
  return (<>
    <div className="ViewPost-wrapper">
      <h1 className="ViewPost-title">{postData.title}</h1>
      <p className="ViewPost-content">{postData.content}</p>
      {(postData.builder_link != '') ? <iframe className="ViewPost-builder" src={postData.builder_link}></iframe> : ''}
    </div>
    <hr className="ViewPost-separator"/>
    {(comments??[])
      .sort((lhs: { date: number; }, rhs: { date: number; }) => lhs.date-rhs.date)
      .map((data: {
        date: number,
        content: string,
        username: string
      },i: number) => <Comment {...data} key={`comment-${i}`} />)}
    <hr className="ViewPost-separator"/>
    <form className="ViewPost-comment-form">
      <textarea className="ViewPost-comment-input" name="content" placeholder="comment here..."></textarea>
      <input type="hidden" name="post-id" value=""/>
      <input type="hidden" name="action-type" value="add-comment"/>
      <button className="ViewPost-comment-submit" type="submit">Comment</button>
    </form>
  </>);
}

export default ViewPost;
