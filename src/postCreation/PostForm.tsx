import React from 'react';
import { useState } from 'react';
import './PostForm.css';

const PostTypeChoice: React.FC<{
  for:string, value:string // args
  state:[string, React.Dispatch<React.SetStateAction<string>>]
}> = (props) => {
  const [selected_post_type,selectType] = props.state;
  function is_selected(target_value: string) {
    return target_value == selected_post_type;
  }
  return <>
    <input type='radio' checked={is_selected(props.value)}
      id={props.for+'-type'} name='post_type' value={props.value} />
    <label 
      htmlFor={props.for+'-type'} 
      onClick={() => selectType(props.value)}
      className='post-form-type'>
      {props.for}
    </label>
  </>;
}

const PostForm: React.FC = () => {
  const [openPopup, setPopup] = useState(false);
  const post_type_state = useState('Question');
  return (
    <form className="post-form">
      <h1>Create Post</h1>
      <div>
        <input className='post-form-title' name='title' type='text' placeholder='Title' />
        <input type='checkbox' name='getnotif' />
        <span className='post-form-tags-btn' onClick={() => setPopup(!openPopup)}>Tags</span>
        <div className={'post-form-tags'+(openPopup?'':' dont-display')}>
          Type:&nbsp;
          <PostTypeChoice for='Question' value='question' state={post_type_state}/>
          <PostTypeChoice for='Discussion' value='discussion' state={post_type_state}/>
          <br/>
          Tags:&nbsp;
          <label><input name='tags' type='checkbox' value='c' />C</label>
          <label><input name='tags' type='checkbox' value='c++' />C++</label>
          <label><input name='tags' type='checkbox' value='python' />Python</label>
          <label><input name='tags' type='checkbox' value='java' />Java</label>
          <label><input name='tags' type='checkbox' value='swift' />Swift</label>
        </div>
      </div>
      <textarea name='content' placeholder='Description' className='post-form-content'>
      </textarea>
      <div className='builder-form'>
        <div className='builder-settings'>
          <p><label>Language:
            <select name='builder-language'>
              <option value='c++'>C++</option>
              <option value='c'>C</option>
              <option value='python'>Python</option>
            </select>
          </label></p>
          <p><label>Compiler:
            <select name='builder-language'>
              <option value='spyder'>spyder</option>
              <option value='g++'>g++</option>
              <option value='gcc'>gcc</option>
              <option hidden value='tsc'>tsc</option>
            </select>
          </label></p>
          <p><label>Operating System:
            <select name='builder-language'>
              <option value='win11'>Windows 11</option>
              <option value='ubuntu'>Ubuntu</option>
            </select>
          </label></p>
        </div>
        <input className='builder-input' type='file' />
        <div className='builder-output'></div>
      </div>
      <div>
      </div>
      <center><input type='submit' value='Post' className='post-form-submit' /></center>
    </form>
  );
};

export default PostForm;
