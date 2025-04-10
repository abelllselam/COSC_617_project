import React, { useRef } from 'react';
import { MdUpload } from "react-icons/md";
import '../Styles/Upload_Modal.css';

const Upload_FirstPage = ({ setFile }) => {
    const fileInputRef = useRef(null); // Create a ref for the file input
    const selectFile = (e) => {
        const file = e.target.files[0];
        setFile(file)
    };

    const handleUploadClick = () => {
        fileInputRef.current.click(); // Trigger the file input click when the icon is clicked
    };

  return (
    <>
      {/* Upload Section */}
      <div className="uploadDiv" onClick={handleUploadClick}>
        <MdUpload
            className="uploadButton"
            size={'15vw'}
            style={{ cursor: 'pointer' }}
        />
        <h3 className="fw-bold" style={{ fontSize: '2.3vw' }}>
            Upload Video
        </h3>

        {/* Hidden file input */}
        <input
            type="file"
            accept="video/*"
            onChange={selectFile}
            style={{ display: 'none' }} 
            ref={fileInputRef} 
        />
      </div>
    </>
  );
};

export default Upload_FirstPage;
