import React, { useState } from "react";
import Level1 from "./Level1/Level1";
import Level2 from "./Level2/Level2";

const App = () => {
  const [level, setLevel] = useState(1);
  const [level1Score, setLevel1Score] = useState(0);
  const [level2Score, setLevel2Score] = useState(0);

  const handleLevel1Completion = (score) => {
    setLevel1Score(score);
    if (score >= 75) {
      setLevel(2);
    } else {
      alert("You need to score at least 75% to qualify for Level 2.");
    }
  };

  const handleLevel2Completion = (score) => {
    setLevel2Score(score);
    if (score >= 85) {
      alert("Congratulations! You completed Level 2.");
      // Redirect to Level 3 (not implemented here)
    } else {
      alert("You need to score at least 85% in Level 2. Redirecting to Level 1.");
      setLevel(1);
    }
  };

  return (
    <div>
      {level === 1 && <Level1 onComplete={handleLevel1Completion} />}
      {level === 2 && <Level2 onComplete={handleLevel2Completion} />}
    </div>
  );
};

export default App;