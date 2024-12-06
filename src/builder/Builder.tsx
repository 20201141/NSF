import React, { useState } from 'react';
import './Builder.css';
import EnvironmentSettings from './EnvironmentSettings';
import TerminalOutput from './TerminalOutput';
import FileUploader from './FileUploader';

const Builder: React.FC = () => {
  const [output, setOutput] = useState<string | null>('Terminal Ready...');
  const [error, setError] = useState<string | null>(null);

  // Function to handle output and error updates from FileUploader
  const handleOutputUpdate = (newOutput: string | null, newError: string | null) => {
    setOutput(newOutput);
    setError(newError);
  };

  return (
    <div className="builder">
      {/* Left Section */}
      <div className="left-section">
        <div className="env-settings">
          <EnvironmentSettings />
        </div>
        <div className="file-uploader">
          <FileUploader onOutputUpdate={handleOutputUpdate} />
        </div>
      </div>
      {/* Right Section */}
      <div className="terminal-output">
        <TerminalOutput content={error ? `Error: ${error}\n${output || ''}` : output} />
      </div>
    </div>
  );
};

export default Builder;
