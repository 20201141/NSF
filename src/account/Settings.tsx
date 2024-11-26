import React, { useEffect, useState } from "react";
import "./UserSettings.css";
import { UserAccount } from "../classes/UserAccount";

// User Settings Component
const Settings: React.FC = () => {
  // change password feature
  const [user, setUser] = useState<UserAccount>({
    user_id: 0,
    username: "",
    password: "",
    email: "",
    isDark: false,
  });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formData, setFormData] = useState({currPassword: '', newPass: '', reEnter: '',});
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // get user's info from DB
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user-info", {credentials: "include",});

        if (response.ok) {
          const data: UserAccount = await response.json();
          console.log("data:", data);
          setUser(data);
        } else {
          setErrorMessage("Failed to get user's info");
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUser();
  }, []);


  // changes content for password change input
  const handleClick = () => {
    setShowChangePassword(!showChangePassword);
    setErrorMessage("");
  };

  // verifies password is the same when re-entering
  const handleSubmit = async () => {
    if (formData.newPass !== formData.reEnter) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user info: ", data);
        setShowChangePassword(!showChangePassword);
      }
    } catch (error) {
      console.error('Error fetching password:', error);
    }
    
  };

  // display info
  return (
    <div>
      <h1>User Settings</h1>
      { showChangePassword ? (
        <div className="password-content">
          <p className="label">Enter current password: </p>
          <input className="password-input" type="password" value={formData.currPassword} onChange={handleInputChange} required />
          <p className="label">Enter new password: </p> 
          <input className="password-input" type="password" value={formData.newPass} onChange={handleInputChange} required />
          <p className="label">Re-enter password: </p>
          <input className="password-input" type="password" value={formData.reEnter} onChange={handleInputChange} required />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="buttons">
            <button className="submit" onClick={handleSubmit}>Submit</button>
            <button onClick={handleClick}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <p className="label">Username: {user.username}</p>
          <p className="label">Email: {user.email}</p> 
          <button onClick={handleClick}>Change Password</button>
        </div>
      )} 
    </div>
  );
};

export default Settings;