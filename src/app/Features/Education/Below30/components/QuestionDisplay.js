import React from "react";

const QuestionDisplay = ({ question }) => {
  return (
    <div className="question-display">
      <h2>Question:</h2>
      <p>{question}</p>
    </div>
  );
};

export default QuestionDisplay;
