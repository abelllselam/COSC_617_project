import React, { useState } from 'react';
import Upload_Modal from './Upload_Modal'

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   const formData = new FormData();
    
  //   if (file) {
  //     formData.append('file', file);
  //     formData.append('contents', title, description, owner);
  //     console.log("File: ", file)
  //     try {
  //       const response = await axios.post('http://localhost:8080/store-video', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
        
  //       console.log('File uploaded successfully:', response.data);
  //     } catch (error) {
  //       console.error('Error uploading file:', error);
  //     }
  //   }
  // };

const Upload_Button = () => {
  const [showModal, setShowModal] = useState(false);

    const openModal = (event) => {
      //console.log(event.target.files[0]);
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

    return (
      <div className="mb-3">
        <label className="btn btn-primary">
          Upload File
          <input
            type="button"
            onClick={openModal}
            className="d-none"
          />
        </label>

        {/* Modal */}
        <Upload_Modal show={showModal} onClose={handleCloseModal} />
      </div>
    );
};

export default Upload_Button;
