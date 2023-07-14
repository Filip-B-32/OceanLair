import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";
import Login from "./components/Login/index";
import Signup from "./components/Signup/index";
import HomePage from "./components/HomePage/index";

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/homepage" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/homepage"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
