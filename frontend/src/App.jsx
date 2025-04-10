import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import VideoPlayer from "./VideoPlayer";
import Upload_Button from "./Upload_Button";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Styles/App.css';
function App() {

  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main">
          <div className="header">
          <Header />
          </div>
          <div className="content">
            <Upload_Button />
            <VideoPlayer />
            {/* <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course-catalog" element={<CourseCatalog />} />
              <Route path="/graduation" element={<GraduationChecker />} />
            </Routes> */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
