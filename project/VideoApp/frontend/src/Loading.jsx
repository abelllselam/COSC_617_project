import React from 'react';
import './Styles/loading.css'

const Loading = () => {
  return (
    <>
        <div style={{
          height: '500px',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',}}
            >
          <div class="loader" style={{margin: '0 auto', position: 'relative'}}></div>
        </div>
    </>
  );
};

export default Loading;
