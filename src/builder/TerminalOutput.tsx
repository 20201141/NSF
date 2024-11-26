import React, { useState } from 'react';
import './TerminalOutput.css';

const TerminalOutput: React.FC = () => {
  const [content, _] = useState<string>('Terminal Ready...\n'); // eslint-disable-line @typescript-eslint/no-unused-vars

  return (
    <div className="terminal-output">
      {content}
    </div>
  );
};

export default TerminalOutput;
