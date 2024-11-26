import React, { useState } from 'react';
import axios from 'axios';
import './FileUploader.css';

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setFiles(uploadedFiles);

      const formData = new FormData();
      formData.append('file', uploadedFiles[0]); // Only handle the first file for simplicity

      // Send file to backend
      axios
        .post('http://localhost:5002/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          setOutput(response.data.output || 'No output');
          setError(response.data.error || null);
        })
        .catch((err) => {
          setError(err.response?.data?.error || 'An unexpected error occurred');
          setOutput(null);
        });
    }
  };

  return (
    <div className="file-uploader">
      <label className="file-upload-label">
        <span className="upload-text">
          {files.length === 0 ? 'Click to Add Files' : files[0].name}
        </span>
        <input
          type="file"
          className="file-input"
          onChange={handleFileUpload}
        />
      </label>
      {output && (
        <div className="terminal-output">
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
      )}
      {error && (
        <div className="terminal-error">
          <h4>Error:</h4>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
