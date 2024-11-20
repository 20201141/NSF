import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode; // content to be displayed in button
  className?: string;        // optional
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button className={className} onClick={onClick}>{children}</button>
  );
};

export default Button;