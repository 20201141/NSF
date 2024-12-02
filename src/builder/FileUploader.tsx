import React, { useState } from 'react';
import './FileUploader.css';

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setFiles(uploadedFiles); // Replace the current files
    }
  };

  return (
    <div className="file-uploader">
      <label className="file-upload-label">
        {files.length === 0 ? (
          <>
            <span className="upload-text">Click to Add Files</span>
            <span className="upload-icon">+</span>
          </>
        ) : (
          <ul className="file-list">
            {files.map((file, index) => (
              <li key={index} className="file-item">
                {file.name}
              </li>
            ))}
          </ul>
        )}
        <input
          type="file"
          multiple
          className="file-input"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default FileUploader;
