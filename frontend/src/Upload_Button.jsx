import React from 'react';
import axios from 'axios';

const Upload_Button = () => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    
    if (file) {
      formData.append('file', file);
      try {
        const response = await axios.post('http://localhost:8080/store-video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="mb-3">
      <label className="btn btn-primary">
        Upload File
        <input
          type="file"
          onChange={handleFileChange}
          className="d-none"
        />
      </label>
    </div>
  );
}

export default Upload_Button;
