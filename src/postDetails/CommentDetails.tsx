import { Comment } from "../classes/Comment";
import { useState } from 'react';


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


  let [getReplies, setReplies] = useState(<></>);
  function onExpand() {
    const replies = comments
      .map((cmnt, id) => ({ cmnt, id }))
      .filter(({cmnt}) => cmnt.parent_id == commentIndex)
      .map(({id}) => id);
    const rendered_replies = replies.map((id) => <CommentDetails commentIndex={id} comments={comments} />);
    if(replies.length > 0) {
      setReplies(<div id={`comment-${commentIndex}-replies`} className="comment-replies">
        {rendered_replies}
      </div>);
    }
  }

  return <>
    <div className="comment-container">
      <div className="comment">
        <p>{comment.username} • {daysAgo(date)}</p>
        <p>{comment.content}</p>
        <button className="comment-replies-expand" onClick={onExpand}>replies</button>
      </div>
      {getReplies}
    </div>
  </>;
}

export default CommentDetails;
