import React, { useState, useEffect } from "react";

const Level1 = ({ onComplete }) => {
  const ingredients = ["Tomato", "Onion", "Garlic", "Ginger", "Salt"];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  const correctAnswer = ingredients[currentQuestion];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleDragStart = (e, name) => {
    e.dataTransfer.setData("ingredient", name);
  };

  const handleDrop = (e) => {
    const draggedIngredient = e.dataTransfer.getData("ingredient");
    if (draggedIngredient === correctAnswer) {
      setScore(score + 10);
    } else {
      setScore(score - 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < ingredients.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
    } else {
      onComplete((score / (ingredients.length * 10)) * 100);
    }
  };

  return (
    <div>
      <h2>Level 1</h2>
      <p>Drag the correct ingredient to the box.</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p>What is the name of this ingredient?</p>
          <div
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid black",
              textAlign: "center",
              lineHeight: "100px",
            }}
          >
            {correctAnswer}
          </div>
        </div>
        <div>
          {ingredients.map((ingredient) => (
            <div
              key={ingredient}
              draggable
              onDragStart={(e) => handleDragStart(e, ingredient)}
              style={{
                margin: "10px",
                padding: "10px",
                border: "1px solid gray",
              }}
            >
              {ingredient}
            </div>
          ))}
        </div>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          style={{
            width: "200px",
            height: "200px",
            border: "2px dashed black",
            textAlign: "center",
            lineHeight: "200px",
          }}
        >
          Drop here
        </div>
      </div>
      <p>Time left: {timeLeft}s</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default Level1;
