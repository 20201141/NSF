import React from 'react';
import './Builder.css';
import EnvironmentSettings from './EnvironmentSettings';
import TerminalOutput from './TerminalOutput';
import FileUploader from './FileUploader';

const Builder: React.FC = () => {
  return (
    <div className="builder">
      {/* Left Section */}
      <div className="left-section">
        <div className="env-settings">
          <EnvironmentSettings />
        </div>
        <div className="file-uploader">
          <FileUploader />
        </div>
      </div>
      {/* Right Section */}
      <div className="terminal-output">
        <TerminalOutput />
      </div>
    </div>
  );
};

export default Builder;
