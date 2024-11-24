import React, { useState } from "react";
import "./UserSettings.css";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({username: '', password: '', email: '',});

  if (!isOpen) return null;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const endpoint = isSignUp ? "/api/signup" : "/api/login";
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`${isSignUp ? 'Sign Up' : 'Log In'} successful`, data);
        onClose();
      } else {
        console.error("Error:", await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
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