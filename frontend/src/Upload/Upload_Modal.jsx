import React, { useState, useEffect, useRef } from 'react';
import Upload_FirstPage from './Upload_FirstPage'; 
import Upload_ModalDetails from './Upload_ModalDetails';
import '../Styles/Upload_Modal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

const Upload_Modal = ({ showDetails,  showFirstPage,  handleDetailsShow, handleDetailsClose, handleFirstPageClose, setIsUploading}) => {
  const [file, setFile] = useState(null);

  return (
      <>
      <Modal show={showDetails} onHide={handleDetailsClose} centered size='lg'>
        <Upload_ModalDetails file={file} handleDetailsClose={handleDetailsClose} setIsUploading={setIsUploading}/>
      </Modal>
      <Modal show={showFirstPage} onHide={handleFirstPageClose} centered>
        <Upload_FirstPage setFile={setFile} handleDetailsShow={handleDetailsShow} handleFirstPageClose={handleFirstPageClose}/>
      </Modal>
    </>
  );
};

export default Upload_Modal;
