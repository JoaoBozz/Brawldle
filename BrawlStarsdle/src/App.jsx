import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./homePaste/Home.jsx";
import Classic from "./classicPaste/Classic.jsx";
import Layout from "./\layoutPaste/layout.jsx";

import "./global.css";
import "./theme.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/classic" element={<Classic />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
