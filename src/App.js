import React, { useState } from "react";
import Intro from "./components/Intro";
import Week from "./components/Week";



function App() {
  const [getStarted, setGetStarted] = useState(false);

  const handleStart = () => {
    setGetStarted(true);
  };

  return (
    <div className="App">
      {!getStarted ? (
        <Intro
          getStarted={getStarted}
          setGetStarted={setGetStarted}
          handleStart={handleStart}
        />
      ) : (
        <Week />
      )}
    </div>
  );
}

export default App;
