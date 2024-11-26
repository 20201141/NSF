import React, { useState } from 'react';
import './TerminalOutput.css';

const TerminalOutput: React.FC = () => {
  const [content, setContent] = useState<string>('Terminal Ready...\n');

  return (
    <div className="terminal-output">
      {content}
    </div>
  );
};

export default TerminalOutput;
