import React, { useState, useEffect } from "react";

const Mathapp = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [score, setScore] = useState(0); // To track the score
  const [timer, setTimer] = useState(20); // Countdown timer starts at 20 seconds
  const [isTimeUp, setIsTimeUp] = useState(false); // To check if time is up

  // Function to generate a random math expression and its answer
  const generateMathQuestion = () => {
    const randomNum1 = Math.floor(Math.random() * 100) + 1;
    const randomNum2 = Math.floor(Math.random() * 100) + 1;
    const randomOperator = Math.floor(Math.random() * 3); // 0: addition, 1: subtraction, 2: multiplication

    let question, answer;

    switch (randomOperator) {
      case 0: // Addition
        question = `${randomNum1} + ${randomNum2}`;
        answer = randomNum1 + randomNum2;
        break;
      case 1: // Subtraction
        if (randomNum1>randomNum2)
        {
          question = `${randomNum1} - ${randomNum2}`;
        answer = randomNum1 - randomNum2;
        }
        else{
          question = `${randomNum2} + ${randomNum1}`;
        answer = randomNum1 - randomNum2;
        }
        break;
      case 2: // Multiplication
        question = `${randomNum1} * ${randomNum2}`;
        answer = randomNum1 * randomNum2;
        break;
      default:
        question = `${randomNum1} + ${randomNum2}`;
        answer = randomNum1 + randomNum2;
    }

    setCurrentQuestion(question);
    setCorrectAnswer(answer);
  };

  // Select a random question when the app loads
  useEffect(() => {
    generateMathQuestion();
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (timer === 0) {
      setIsTimeUp(true);
      setResultMessage("⏰ Time's up! Moving to the next question...");
      setTimeout(() => {
        setIsTimeUp(false);
        generateMathQuestion();
        setTimer(20); // Reset the timer to 20 seconds
      }, 2000); // Wait for 2 seconds before moving to the next question
    }

    if (!isTimeUp) {
      const timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval); // Clear the interval on unmount
    }
  }, [timer, isTimeUp]);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <h1>Your browser does not support Speech Recognition</h1>;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  const startListening = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      if (lastResult.isFinal) {
        const recognizedText = lastResult[0].transcript.trim().toLowerCase();
        setTranscript(recognizedText);
        checkResult(recognizedText);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error: ", event.error);
    };
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  const checkResult = (recognizedText) => {
    if (parseInt(recognizedText) === correctAnswer) {
      setScore((prevScore) => prevScore + 10); // Increment score for correct answer
      setResultMessage("🎉 Correct! Moving to the next question...");
      setTimeout(() => {
        generateMathQuestion();
        setTimer(20); // Reset timer to 20 seconds after a correct answer
      }, 1000); // Automatically move to next question after 1 second
    } else {
      setResultMessage("❌ Incorrect! Try again.");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f0f8ff",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "800px",
        margin: "auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "20px",
          textAlign: "left",
          fontSize: "24px",
          color: "#2c3e50",
        }}
      >
        <h2>Score: {score}</h2>
        <h2>Timer: {timer}s</h2>
      </div>

      <div
        style={{
          flex: 2,
          textAlign: "center",
          padding: "20px",
          fontSize: "24px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ color: "#2c3e50" }}>Math Quiz</h1>
        <p
          style={{
            fontSize: "20px",
            color: "#34495e",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Solve: {currentQuestion}
        </p>

        <button
          onClick={isListening ? stopListening : startListening}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            margin: "10px",
            backgroundColor: isListening ? "#e74c3c" : "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>

        <p style={{ marginTop: "20px", fontSize: "18px", color: "#34495e" }}>
          <strong>Transcript:</strong> {transcript || "Say the answer..."}
        </p>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: resultMessage.includes("Correct") ? "#27ae60" : "#c0392b",
          }}
        >
          {resultMessage}
        </p>
      </div>
    </div>
  );
};

export default Mathapp;
