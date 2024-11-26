import React, { useState } from "react";
import { useUser } from "./UserInfo";
import "./account/UserSettings.css";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({username: '', password: '', email: '',});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setUser } = useUser();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const endpoint = isSignUp ? "/api/signup" : "/api/login";

      console.log("Payload:", formData);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.status === 401) {
        const errorData = await response.json();
        setErrorMsg(errorData.message);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log(`${isSignUp ? "Sign Up" : "Log In"} successful`, data);

        onLoginSuccess();

        // update global user
        setUser({
          username: data.username,
          email: data.email,
          isLoggedIn: true,
        });

        onClose();
      }

    } catch (error) {
      console.error("Error fetching user account:", error);
      setErrorMsg("Failed to connect to the server. Please try again later.")
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-overlay">
      <div className="login-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <div className="login-group">
          <form onSubmit={handleSubmit}>
            <input 
              className="login-input"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {isSignUp && (
              <input 
                className="login-input"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            )}
            <input 
              className="login-input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <div className="login-group">
              <button className="login-button" type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
          </div>
          </form>
        </div>
        <p className="or">or</p>
        <button className="toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Log In" : "New user? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Login;