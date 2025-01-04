import React, { useState } from "react";
import "./Uploadentitydetail.css";

const Uploadentitydetail = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      // Implement your file upload logic here, e.g., use a file upload API
      console.log("Uploading file:", selectedFile.name);
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div className="container-Uploadentitydetail">
      <div className="upload-excel-Uploadentitydetail">
        <p>Upload Excel:</p>
      </div>

      <div className="upload-text-Uploadentitydetail">
        <input type="file" onChange={handleFileChange} />
        <button className="upload-Uploadentitydetail" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Uploadentitydetail;
