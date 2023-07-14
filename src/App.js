import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Intro from "./components/common/Intro";
import Week from "./components/calendar/Week";
import FeedbackForm from "./components/common/FeedbackForm";
import Signup from "./components/auth/Signup";
import FeedbackSubmit from "./components/common/FeedbackSubmit";
import Login from "./components/auth/Login";
import PopupModal from "./components/auth/PopupModal";
import UserWeek from "./components/calendar/UserWeek";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import LoadingPage from "./components/common/LoadingPage";



function App() {

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              console.log("uid", uid)
              setIsLoggedin(true)

            } else {
              console.log("user is logged out")
              setIsLoggedin(false)
            }
          });
         
    }, [])



    const ProtectedUserWeek = () => {
      if (!isLoggedin) {
        return <Navigate to="/login" />;
      } 
        return <UserWeek />;
      
    };


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Intro isLoggedin={isLoggedin}/>} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/week" element={<Week />} />

          <Route path="/userweek" element={<ProtectedUserWeek />} />
              
          <Route path="/signup" element={<Signup />} />
          <Route path="/popup" element={<PopupModal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedbacksubmit" element={<FeedbackSubmit />} />


        </Routes>
      </Router>   
    </div>
  );
}

export default App;
