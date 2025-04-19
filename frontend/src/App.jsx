import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Home from "./Home";
import Upload_Button from "./Upload/Upload_Button";
import VideoPlayer from "./VideoPlayer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="main">
          <div className="header">
            <Header />
          </div>
          <div className="content">
            {/* <Upload_Button /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/video/:videoId" element={<VideoPlayer />} />
              {/* Add other routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
