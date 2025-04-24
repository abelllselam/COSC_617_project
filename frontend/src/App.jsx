import React, { useState } from "react";
import Header from "./Header";
import Home from "./Home";
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
