import React, { useState } from "react";
import Intro from "./components/common/Intro";
import Week from "./components/calendar/Week";
import FeedbackForm from "./components/common/FeedbackForm";



function App() {
  const [getStarted, setGetStarted] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleStart = () => {
    setGetStarted(true)
  };

  const handleOpenFeedbackForm = () => {
    setShowFeedbackForm(true);
  };

  const handleCloseFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  const handleFeedbackFormSuccess = () => {
    setFeedbackSubmitted(true);
  };

  return (
    < div className="App">
    
      {showFeedbackForm && <FeedbackForm 
                            handleOpenFeedbackForm={handleOpenFeedbackForm}
                            handleCloseFeedbackForm={handleCloseFeedbackForm}
                            handleFeedbackFormSuccess={handleFeedbackFormSuccess}
                            showFeedbackForm={showFeedbackForm}
                            setShowFeedbackForm={setShowFeedbackForm}
                            feedbackSubmitted={feedbackSubmitted}
                            setFeedbackSubmitted={setFeedbackSubmitted}
                             />}
      {feedbackSubmitted  && (
        <div className="fixed top-0 font-poppins left-0 w-screen h-screen bg-gray-700 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8  rounded-lg shadow-md sm:mx-12">
          <h2 className="text-2xl font-bold mb-4">Thank you for your feedback!</h2>
              <p className="text-lg">We appreciate your input and will use it to improve our app.</p>
              <button
                className="bg-indigo-600 hover:bg-indigo-400 text-white py-2 px-4 rounded-lg mt-4"
                onClick={() => setFeedbackSubmitted(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

      {!getStarted ? (
        <Intro
          getStarted={getStarted}
          setGetStarted={setGetStarted}
          handleStart={handleStart}
          showFeedbackForm={showFeedbackForm}
          setShowFeedbackForm={setShowFeedbackForm}
        />
      ) : (
        <Week />
      )}
    </div>
  );
}

export default App;
