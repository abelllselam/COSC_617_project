import React, { useRef } from 'react';
import { MdUpload } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import '../Styles/Upload_Modal.css';
import { Navbar, Container, Form, Button, Offcanvas, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Upload_FirstPage = ({ setFile, handleDetailsShow, handleFirstPageClose }) => {
    const fileInputRef = useRef(null);
    const selectFile = (e) => {
        const file = e.target.files[0];
        setFile(file)
        handleDetailsShow()
    };

    const handleUploadClick = () => {
        fileInputRef.current.click(); 
    };

  return (
    <>
      {/* Upload Section */}
      <div className="uploadDiv">
        {/* Close (X) Button */}
        <GrClose
          type="button"
          className="closeButton"
          size={23}
          onClick={() => handleFirstPageClose()}
          aria-label="Close"
        />
        <div onClick={handleUploadClick}>
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
      </div>
    </>
  );
};

export default Upload_FirstPage;
