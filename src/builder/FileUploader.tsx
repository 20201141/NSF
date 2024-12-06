import React, { useState, useRef } from 'react';
import axios from 'axios';
import './FileUploader.css';

interface FileUploaderProps {
  onOutputUpdate: (output: string | null, error: string | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onOutputUpdate }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://128.113.126.107:5003/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle response
        onOutputUpdate(response.data.output || 'No output received', response.data.error || null);

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
    
          onOutputUpdate(null, errorMessage);
      }
    }
  };

  // Remove the file and reset everything
  const handleRemoveFile = () => {
    setFile(null);
    onOutputUpdate(null, null);
    // Reset the file input so the same file can be uploaded again if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".py"
        />
      </label>

      {file && (
        <div className="file-name-container">
          <button className="remove-file-btn" onClick={handleRemoveFile}>
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;