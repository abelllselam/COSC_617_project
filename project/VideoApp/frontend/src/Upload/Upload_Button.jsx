import React, { useState } from 'react';
import Upload_Modal from './Upload_Modal'
import { FaPlus } from "react-icons/fa";
import '../Styles/Upload_Button.css'
import Loading from '../Loading';

const Upload_Button = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [showFirstPage, setShowFirstPage] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const handleDetailsClose = () => setShowDetails(false);
    const handleFirstPageClose = () => setShowFirstPage(false);
    const handleFirstPageShow = () => {
      setShowDetails(false);
      setShowFirstPage(true);
    };
    const handleDetailsShow = () => {
      setShowDetails(true);
      setShowFirstPage(false);
    };

    return (
      <>
        <div className="upload-button-wrapper">
        <div className="upload-button-group">
          <button className="upload-button c" onClick={handleFirstPageShow} aria-label="Upload video">
            <FaPlus className="icon"/>
          </button>
      
          {/* Tooltip */}
          <div className="tooltip">Upload Video</div>
        </div>
      </div>
      {isUploading ? (
          <Loading />
      ) : (
        <>
          <Upload_Modal showDetails={showDetails} showFirstPage={showFirstPage} handleDetailsShow={handleDetailsShow} handleDetailsClose={handleDetailsClose} handleFirstPageClose={handleFirstPageClose} setIsUploading={setIsUploading} />
          </>
      )}
      
    </>
    );
};

export default Upload_Button;
