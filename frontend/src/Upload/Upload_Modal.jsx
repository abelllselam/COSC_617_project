import React, { useState, useEffect, useRef } from 'react';
import { GrClose } from "react-icons/gr";
import Upload_FirstPage from './Upload_FirstPage'; 
import Upload_ModalDetails from './Upload_ModalDetails';
import '../Styles/Upload_Modal.css';

const Upload_Modal = ({ show, onClose }) => {
  const [file, setFile] = useState(null);
  const [modalWidth, setModalWidth] = useState('30%');
  const modalRef = useRef(null);

  // Close modal when clicking outside the modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(false);
        setFile(null)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const closeEverything = () =>{
    onClose(false);
    setFile(null)
  }

  // Update modal width based on file state
  useEffect(() => {
    if (file) {
      setModalWidth('80%');
    } else {
      setModalWidth('30%');
    }
  }, [file]); // Only trigger when the file state changes

  const renderModalContent = () => {
    if (file) {
      return <Upload_ModalDetails file={file} closeEverything={closeEverything} />;
    } else {
      return <Upload_FirstPage setFile={setFile}/>;
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="containerDiv" style={{ width: modalWidth }} ref={modalRef}>
        {/* Close (X) Button */}
        <GrClose
          type="button"
          className="closeButton"
          size={23}
          onClick={() => closeEverything()}
          aria-label="Close"
        />
        {/* Render modal content based on file state */}
        {renderModalContent()}
      </div>
    </div>
  );
};

export default Upload_Modal;
