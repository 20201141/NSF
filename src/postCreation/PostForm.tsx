import React, { useState } from 'react';
import './PostForm.css';
import Builder from '../builder/Builder';
import { handleInputChange } from '../FormUtils';

interface PostFormProps {
  title: string;
  content: string;
  post_type: string;
  getnotif: boolean;
  tags: string;
  code: string;
}

const PostForm: React.FC = () => {
  // deno-lint-ignore prefer-const
  let [openPopup, setPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    post_type: "",
    getnotif: false,
    tags: "",
    code: "",
  });

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let tagsArray = prev.tags.split(" ").filter(Boolean);
      // add tags
      if (checked) { 
        if (!tagsArray.includes(value)) {
          tagsArray.push(value);
        }
      } else {
        // remove tag
        tagsArray = tagsArray.filter((tag) => tag !== value);
      }
      return { ...prev, tags: tagsArray.join(" ") };
    });
  };

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, post_type: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        console.log("post info: ", data);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  return (
    <div>
      <h1>Create a Post</h1>
      <div className="create-post-content">
        <input className="create-label" type="text" name="title" value={formData.title} placeholder="Title" onChange={(e) => handleInputChange(e, setFormData)} required />
        <input className="create-label" type="checkbox" name="getnotif" checked={formData.getnotif} onChange={(e) => setFormData((prev) => ({ ...prev, getnotif: e.target.checked }))} />
        <span className="create-post-tags-btn" onClick={() => setPopup(!openPopup)}>Tags</span>
        <div className={"create-post-tags" + (openPopup ? "": " dont-display")}>
          <div>
            Type:&nbsp;
            <label>
              <input type="radio" name="post_type" value="Question" checked={formData.post_type === "Question"} onChange={handleRadio} />
              Question
            </label>
            <label>
              <input type="radio" name="post_type" value="Discussion" checked={formData.post_type === "Discussion"} onChange={handleRadio}/>
              Discussion
            </label>
          </div>
          <div>
            Tags:&nbsp;
            <label><input name="tags" type="checkbox" value="c" onChange={handleCheckbox} />C</label>
            <label><input name="tags" type="checkbox" value="c++" onChange={handleCheckbox} />C++</label>
            <label><input name="tags" type="checkbox" value="python" onChange={handleCheckbox} />Python</label>
            <label><input name="tags" type="checkbox" value="java" onChange={handleCheckbox} />Java</label>
            <label><input name="tags" type="checkbox" value="swift" onChange={handleCheckbox} />Swift</label>
          </div>
        </div>
        <textarea className="create-post-label" name="content" placeholder="Description..." onChange={(e) => handleInputChange(e, setFormData)} required />
        <div className="create-post-builder"><Builder /></div>
        <button className="create-post-submit" onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default PostForm;
