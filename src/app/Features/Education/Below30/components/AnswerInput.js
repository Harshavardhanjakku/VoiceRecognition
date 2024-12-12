import React, { useState, useEffect } from "react";

// Child Component: AnswerInput
const AnswerInput = ({ answer, setAnswer, evaluateAnswer, hint }) => {
  const [isListening, setIsListening] = useState(false);

  // UseEffect to ensure the entire hint is read aloud only once when the component is mounted
  useEffect(() => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(hint);  // Ensure the entire hint text is passed here
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance); // Speak the entire hint aloud
    }
  }, [hint]); // Ensures it runs when the hint prop changes

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in this browser. Try using Chrome.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false; // Stop after one sentence
    recognition.interimResults = false; // Don't show partial results
    recognition.lang = "en-US"; // Set the language

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript); // Update the textarea with the recognized speech
      evaluateAnswer(transcript); // Evaluate the input answer
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="answer-input bg-black">
      <h3>{hint}</h3>  {/* Display the hint or question */}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here or use voice input..."
        rows="5"
        cols="50"
        className="bg-black"
      />
      <button onClick={startListening} disabled={isListening}>
        {isListening ? "Listening..." : "Use Voice Input"}
      </button>
    </div>
  );
};









  
// Parent Component: App
const App = () => {
  const [answer, setAnswer] = useState("");

  // Function to evaluate the answer
  const evaluateAnswer = (input) => {
    if (input.toLowerCase() === "correct answer") {
      alert("Great job! Your answer is correct.");
    } else {
      alert("Oops! That's not correct. Try again.");
    }
  };

  return (
    <div className="app">
      <h1>Voice Input Answer Evaluation</h1>
      <AnswerInput answer={answer} setAnswer={setAnswer} evaluateAnswer={evaluateAnswer} />
    </div>
  );
};

export default App;
