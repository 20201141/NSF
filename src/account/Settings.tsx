import Button from "./Button";

// User Settings Component
const Settings = () => {
  // get user's info from DB

  
  // change password
  const handleClick = () => {
    console.log("Button was clicked");
  };

  // display info
  return (
    <div>
      <h1>User Settings</h1>
      <p className="label">Username: {}</p>
      <p className="label">Password: {}</p>
      <p className="label">Email: {}</p> 
      <Button onClick={handleClick}>Change Password</Button>
    </div>
  );
};

export default Settings;