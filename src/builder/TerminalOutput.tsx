import React from 'react';
import './TerminalOutput.css';

interface TerminalOutputProps {
  content?: string | null;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ content }) => {
  const displayContent = content && content.trim() !== '' ? content : 'Terminal Ready...\n';

  return (
    <div className="terminal-output">
      <pre>{displayContent}</pre>
    </div>
  );
};

export default TerminalOutput;
