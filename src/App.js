import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from "./components/common/Intro";
import Week from "./components/calendar/Week";
import FeedbackForm from "./components/common/FeedbackForm";
import Signup from "./components/common/Signup";
import FeedbackSubmit from "./components/common/FeedbackSubmit";
import Login from "./components/common/Login";

function App() {
  return (
    <div className="App">
     
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/week" element={<Week />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedbacksubmit" element={<FeedbackSubmit />} />
        </Routes>
      
    </div>
  );
}

export default App;
