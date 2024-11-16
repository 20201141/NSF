import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode; // content to be displayed in button
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>{children}</button>
  );
};

export default Button;