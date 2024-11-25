import React, { useState } from "react";
import "./UserSettings.css";

// User Settings Component
const Settings: React.FC = () => {
  // change password feature
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // changes content for password change input
  const handleClick = () => {
    setShowChangePassword(!showChangePassword);
    setErrorMessage("");
  };

  // verifies password is the same when re-entering
  const handleSubmit = async () => {
    if (newPassword !== reenterPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    //implement backend to fetch password from DB

  };

  // display info
  return (
    <div>
      <h1>User Settings</h1>
      { showChangePassword ? (
        <div className="password-content">
          <p className="label">Enter current password: </p>
          <input className="password-input" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <p className="label">Enter new password: </p> 
          <input className="password-input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <p className="label">Re-enter password: </p>
          <input className="password-input" type="password" value={reenterPassword} onChange={(e) => setReenterPassword(e.target.value)} />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="buttons">
            <button className="submit" onClick={handleSubmit}>Submit</button>
            <button onClick={handleClick}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <p className="label">Username: {}</p>
          <p className="label">Password: {}</p>
          <p className="label">Email: {}</p> 
          <button onClick={handleClick}>Change Password</button>
        </div>
      )} 
    </div>
  );
};

export default Settings;