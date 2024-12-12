import React, { useState, useEffect } from "react";

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [currentFruit, setCurrentFruit] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [score, setScore] = useState(0); // To track the score

  const fruits = [
    { name: "apple", image: "/fruits/apple.png" },
    { name: "banana", image: "/fruits/banana.png" },
    { name: "orange", image: "/fruits/orange.png" },
    { name: "grape", image: "/fruits/grape.png" },
    { name: "pineapple", image: "/fruits/pineapple.png" },
  ];

  // Select a random fruit when the app loads
  useEffect(() => {
    getRandomFruit();
  }, []);

  const getRandomFruit = () => {
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    setCurrentFruit(randomFruit);
    setTranscript(""); // Reset the transcript for a new round
    setResultMessage(""); // Clear the result message
  };

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
    if (recognizedText === currentFruit.name.toLowerCase()) {
      setScore((prevScore) => prevScore + 10); // Increment score for correct answer
      setResultMessage("🎉 Correct! Moving to the next fruit...");
      setTimeout(() => getRandomFruit(), 2000); // Automatically move to next fruit after 2 seconds
    } else {
      setScore((prevScore) => Math.max(prevScore - 1, 0)); // Decrease score for incorrect answer but not below 0
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
        maxWidth: "600px",
        margin: "auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ color: "#2c3e50" }}>Guess the Fruit</h1>
      <h2 style={{ color: "#e74c3c", marginBottom: "30px" }}>
        Score: {score}
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={currentFruit.image}
          alt={currentFruit.name}
          style={{
            width: "300px",
            height: "300px",
            marginBottom: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
        <p
          style={{
            fontSize: "18px",
            color: "#34495e",
            fontWeight: "bold",
          }}
        >
          Speak the name of the fruit shown above!
        </p>
      </div>

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

      <button
        onClick={getRandomFruit}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          margin: "10px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        New Fruit
      </button>

      <p style={{ marginTop: "20px", fontSize: "18px", color: "#34495e" }}>
        <strong>Transcript:</strong> {transcript || "Say something..."}
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
  );
};

export default App;
