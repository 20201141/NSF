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
  let [openPopup, setPopup] = useState(false);
  const [formData, setFormData] = useState<PostFormProps>({
    title: "",
    content: "",
    post_type: "",
    getnotif: false,
    tags: "",
    code: "",
  });

  const getNotifColor = formData.getnotif ? "#28303f" : "#ccc";

  const handleNotif = () => {
    setFormData((prev) => ({ ...prev, getnotif: !prev.getnotif}));
  };

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
      return { ...prev, tags: tagsArray.join(", ") };
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

      if (response.redirected) {
        window.location.assign("/");
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  return (
    <div className="post-form">
      <h1 className="create-post-h1">Create a Post</h1>
      <div className="create-post-content">
        <div className="first-line">
          <input className="create-label-title" type="text" name="title" value={formData.title} placeholder="Title" onChange={(e) => handleInputChange(e, setFormData)} required />
          <div onClick={handleNotif} className="create-post-notif">
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m4.45549 13.88-.57156-.4856zm.87927-2.0415-.74523-.0844zm13.33044 0 .7453-.0844zm.8793 2.0415.5716-.4856zm-1.2241-5.08597-.7453.08443zm-12.64076 0 .74523.08443zm10.02266 10.46917c.1454-.3879-.0512-.8201-.4391-.9655s-.8201.0512-.9655.4391zm-6-.5264c-.14536-.3879-.57763-.5845-.9655-.4391s-.58446.5776-.4391.9655zm8.4676-2.4868h-12.33976v1.5h12.33976zm-.5948-7.37154.3449 3.04444 1.4905-.1688-.3449-3.04449zm-11.49511 3.04444.34488-3.04444-1.49047-.16885-.34487 3.04449zm-1.05293 2.4428c.58467-.6882.95069-1.5402 1.05293-2.4428l-1.49046-.1688c-.06915.6104-.31633 1.1822-.7056 1.6403zm12.89294-2.4428c.1023.9026.4683 1.7546 1.0529 2.4428l1.1432-.9713c-.3893-.4581-.6365-1.0299-.7056-1.6403zm-12.08986 4.3271c-.88679 0-1.45088-1.1219-.80308-1.8843l-1.14313-.9713c-1.41902 1.6703-.30565 4.3556 1.94621 4.3556zm12.33976 1.5c2.2518 0 3.3652-2.6853 1.9462-4.3556l-1.1432.9713c.6478.7624.0838 1.8843-.803 1.8843zm.8957-9.04039c-.4152-3.66488-3.4377-6.45961-7.0656-6.45961v1.5c2.8302 0 5.2419 2.18698 5.5751 5.12846zm-12.64073.16885c.33321-2.94148 2.7449-5.12846 5.57513-5.12846v-1.5c-3.62788 0-6.65044 2.79473-7.0656 6.45961zm7.87283 9.85834c-.3227.8611-1.2131 1.5132-2.2977 1.5132v1.5c1.6855 0 3.1516-1.0175 3.7023-2.4868zm-2.2977 1.5132c-1.0846 0-1.975-.6521-2.2977-1.5132l-1.4046.5264c.55065 1.4693 2.0168 2.4868 3.7023 2.4868z"
                fill={getNotifColor}
              />
            </svg>
          </div>
          <span className="create-post-tags-btn" onClick={() => setPopup(!openPopup)}>Tags</span>
          <div className={"create-post-tags" + (openPopup ? "": " dont-display")}>
            <div>
              Type&nbsp;
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
              Tags&nbsp;
              <label><input name="tags" type="checkbox" value="c" onChange={handleCheckbox} />C</label>
              <label><input name="tags" type="checkbox" value="c++" onChange={handleCheckbox} />C++</label>
              <label><input name="tags" type="checkbox" value="python" onChange={handleCheckbox} />Python</label>
              <label><input name="tags" type="checkbox" value="java" onChange={handleCheckbox} />Java</label>
              <label><input name="tags" type="checkbox" value="swift" onChange={handleCheckbox} />Swift</label>
            </div>
          </div>
        </div>
        <textarea className="create-post-desc" name="content" placeholder="Description..." onChange={(e) => handleInputChange(e, setFormData)} required />
        <div className="create-post-builder"><Builder /></div>
        <div className="create-post-submit">
          <button className="create-post-submit-btn" onClick={handleSubmit}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
