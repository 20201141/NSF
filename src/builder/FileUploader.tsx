import React, { useState } from 'react';
import axios from 'axios';
import './FileUploader.css';

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null); // Store only one file
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0]; // Only allow one file
      setFile(selectedFile);

      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:5003/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle response
        setOutput(response.data.output || 'No output received');
        setError(response.data.error || null);

        console.log("Success:", response.data);

      } catch (err: any) {
          console.error("Error uploading file:", err);
    
          // Detailed error handling
          let errorMessage = 'An unexpected error occurred';
          
          if (err.response) {
            // The server responded with a status code outside the 2xx range
            console.error("Response Data:", err.response.data);
            console.error("Response Status:", err.response.status);
            console.error("Response Headers:", err.response.headers);
            errorMessage = `Error: ${err.response.data?.error || 'Server responded with an error'} (Status: ${err.response.status})`;

          } else if (err.request) {
            // The request was made, but no response was received
            console.error("Request Details:", err.request);
            errorMessage = 'Error: No response received from the server';

          } else {
            // Something happened while setting up the request
            console.error("Error Message:", err.message);
            errorMessage = `Error: ${err.message}`;
          }
    
          setError(errorMessage);
          setOutput(null);
      }
    }
  };

  return (
    <div className="file-uploader">
      <label className="file-upload-label">
        <span className="upload-text">
          {file ? file.name : 'Click to Add a File'}
        </span>
        <input
          type="file"
          className="file-input"
          onChange={handleFileChange}
          accept=".py" // Accept only Python files
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
