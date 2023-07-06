import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from "./components/common/Intro";
import Week from "./components/calendar/Week";
import FeedbackForm from "./components/common/FeedbackForm";
import Signup from "./components/common/Signup";
import FeedbackSubmit from "./components/common/FeedbackSubmit";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/week" element={<Week />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feedbacksubmitted" element={<FeedbackSubmit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
