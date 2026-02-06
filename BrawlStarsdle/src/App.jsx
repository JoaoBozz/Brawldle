import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./homePaste/Home.jsx";
import Classic from "./classicPaste/Classic.jsx";

import "./global.css";
import "./theme.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/classic" element={<Classic />} />
            </Routes>
        </Router>
    );
}

export default App;