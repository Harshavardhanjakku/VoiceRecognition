import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./index.css";
import Fruit from "./app/Features/Education/Below10/fruit/Fruit";
import Biologygame from "./app/Features/Education/Below10/biologygame/Biologygame";
import Mathgame from "./app/Features/Education/Below10/mathgame/Mathgame";
import ChefMaster from "./app/Features/Vocational/ChefMaster/ChefMaster";
import Carpentry from "./app/Features/Vocational/Carpentry/Carpentry";
import GamifiedCertification from "./app/Features/GamifiedCertification/GamifiedCertification";
import Chatbot from "./app/Features/Chatbot/chatbot";
import reportWebVitals from "./app/reportWebVitals";
import Below20 from "./app/Features/Education/Below20/Below20";
import Below30 from "./app/Features/Education/Below30/Below30";

// Navbar Component
function Navbar() {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [dropdownType, setDropdownType] = React.useState("");

  const toggleDropdown = (type) => {
    if (dropdownType === type) {
      setDropdownVisible((prev) => !prev);
    } else {
      setDropdownVisible(true);
      setDropdownType(type);
    }
  };

  return (
    <nav className="bg-sky-500 text-white flex items-center justify-between py-4 px-6 shadow-md fixed w-full top-0 z-50">
      <div className="flex items-center">
        <img src="/logo.png" alt="App Logo" className="w-12 h-12 mr-3" />
        <h1 className="text-xl font-bold">Edu Play Hub</h1>
      </div>
      <ul className="flex items-center space-x-6">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li className="relative">
          <button onClick={() => toggleDropdown("features")} className="hover:underline focus:outline-none">
            Features
          </button>
          {dropdownVisible && dropdownType === "features" && (
            <ul className="absolute bg-sky-600 text-white rounded shadow-md mt-2">
              <li className="hover:bg-sky-700">
                <Link to="/education" className="block px-4 py-2">
                  Education
                </Link>
              </li>
              <li className="hover:bg-sky-700">
                <Link to="/vocational" className="block px-4 py-2">
                  Vocational
                </Link>
              </li>
              <li className="hover:bg-sky-700">
                <Link to="/game-certification" className="block px-4 py-2">
                  Game Certification
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button className="hover:underline">Sign In</button>
        </li>
        <li>
          <button className="hover:underline">Contact</button>
        </li>
      </ul>
    </nav>
  );
}

function HeroSection() {
  return (
    <div className="bg-black text-white py-10 px-6 text-center mt-24">
      <h2 className="text-3xl font-bold mb-4">Skills Development Games</h2>
      <p className="text-gray-300 max-w-2xl mx-auto">
        With our curated selection of educational games, you can train memory,
        attention, fine motor skills, and reading abilities in an entertaining
        way. Additionally, our resources improve speech, understanding
        emotions, and time management for a more autonomous learning journey.
      </p>
    </div>
  );
}

function FeaturesPage() {
  return (
    <div className="bg-black text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Explore Educational Games</h2>
        <p className="text-gray-300 mb-8">
          Discover interactive games that make learning fun and engaging.
          Explore biology, mathematics, and more to enhance your skills.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/biologygame"
            className="border border-white text-white px-6 py-2 rounded-full hover:bg-sky-600 hover:text-black transition"
          >
            Biology Game
          </Link>
          <Link
            to="/mathgame"
            className="border border-white text-white px-6 py-2 rounded-full hover:bg-sky-600 hover:text-black transition"
          >
            Math Game
          </Link>
          <Link
            to="/fruit"
            className="border border-white text-white px-6 py-2 rounded-full hover:bg-sky-600 hover:text-black transition"
          >
            Fruit Game
          </Link>
          <Link
            to="/chefmaster"
            className="border border-white text-white px-6 py-2 rounded-full hover:bg-sky-600 hover:text-black transition"
          >
            ChefMaster Game
          </Link>
          <Link
            to="/carpentry"
            className="border border-white text-white px-6 py-2 rounded-full hover:bg-sky-600 hover:text-black transition"
          >
            ChefMaker Game
          </Link>
          <Link
            to="/all-games"
            className="border border-blue-400 text-blue-400 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
}

function EducationPage() {
  return (
    <div className="bg-black text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Choose a Game to Play</h2>
        <p className="text-gray-300 mb-8">
          Select a game below to start learning! Pick from biology, mathematics,
          or fruit games.
        </p>
        <div className="flex justify-center gap-6">
          <div className="border border-white text-white px-8 py-6 rounded-lg hover:bg-sky-600 transition">
            <h3 className="text-xl font-bold mb-4">Biology Game</h3>
            <Link
              to="/biologygame"
              className="text-white border border-white px-4 py-2 rounded-full hover:bg-sky-700"
            >
              Start Game
            </Link>
          </div>
          <div className="border border-white text-white px-8 py-6 rounded-lg hover:bg-sky-600 transition">
            <h3 className="text-xl font-bold mb-4">Math Game</h3>
            <Link
              to="/mathgame"
              className="text-white border border-white px-4 py-2 rounded-full hover:bg-sky-700"
            >
              Start Game
            </Link>
          </div>
          <div className="border border-white text-white px-8 py-6 rounded-lg hover:bg-sky-600 transition">
            <h3 className="text-xl font-bold mb-4">Fruit Game</h3>
            <Link
              to="/fruit"
              className="text-white border border-white px-4 py-2 rounded-full hover:bg-sky-700"
            >
              Start Game
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function VocationalPage() {
  return (
    <div className="bg-black text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Vocational Games</h2>
        <p className="text-gray-300 mb-8">
          Explore vocational games like ChefMaster to enhance your practical skills.
        </p>
        <div className="flex justify-center gap-8 mb-8">
  <div className="border border-white text-white px-8 py-6 rounded-lg hover:bg-sky-600 transition w-full max-w-xs">
    <h3 className="text-xl font-bold mb-4">ChefMaster Game</h3>
    <Link
      to="/chefmaster"
      className="text-white border border-white px-4 py-2 rounded-full hover:bg-sky-700"
    >
      Start Game
    </Link>
  </div>
  <div className="border border-white text-white px-8 py-6 rounded-lg hover:bg-sky-600 transition w-full max-w-xs">
    <h3 className="text-xl font-bold mb-4">ChefMaker</h3>
    <Link
      to="/carpentry"
      className="text-white border border-white px-4 py-2 rounded-full hover:bg-sky-700"
    >
      Start Game
    </Link>
  </div>
</div>
   </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
      <p>&copy; 2024 Skill Learning Hub. All rights reserved.</p>
      <p>Designed for enhancing learning experiences through innovation.</p>
    </footer>
  );
}
function EducationSelectorPage() {
  return (
    <div className="bg-black text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Select Age Group</h2>
        <p className="text-gray-300 mb-8">
          Choose an age group to find suitable educational games.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            to="/education/below10"
            className="border border-white text-white px-6 py-4 rounded-lg hover:bg-sky-600 transition"
          >
            Below 10
          </Link>
          <Link
            to="/education/below20"
            className="border border-white text-white px-6 py-4 rounded-lg hover:bg-sky-600 transition"
          >
            Below 20
          </Link>
          <Link
            to="/education/below30"
            className="border border-white text-white px-6 py-4 rounded-lg hover:bg-sky-600 transition"
          >
            Below 30
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChatbotIcon() {
  return (
    <div className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg">
      <Link to="/chatbot">Chatbot</Link>
    </div>
  );
}
function App() {
  const [transcript, setTranscript] = useState(""); // To store the transcript of the voice
  const [isListening, setIsListening] = useState(false); // State to track if voice recognition is active
  const navigate = useNavigate(); // To programmatically navigate
  const [currentPage, setCurrentPage] = useState("");

  const startRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      setTranscript(transcript); // Update transcript with recognized speech
      // Listen for specific voice commands
      if (transcript.toLowerCase().includes("open features")) {
        navigate("/features");
      } else if (transcript.toLowerCase().includes("open education")) {
        navigate("/education");
      } else if (transcript.toLowerCase().includes("open vocational")) {
        navigate("/vocational");
      } else if (transcript.toLowerCase().includes("open chatbot")) {
        navigate("/chatbot");
      }
      else if (transcript.toLowerCase().includes("open below 10")){
        navigate("/education/below10");
      }
      else if (transcript.toLowerCase().includes("open below 20")){
        navigate("/education/below20");
      }
      else if (transcript.toLowerCase().includes("open below 30")){
        navigate("/education/below30");
      }
    };

    recognition.start();
    setIsListening(true); // Update the listening state to true when recognition starts
  };

  const stopRecognition = () => {
    // Stop the speech recognition if it is running
    if (window.SpeechRecognition) {
      window.SpeechRecognition.stop();
    }
    setIsListening(false); // Update the listening state to false
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <HeroSection />
      
      {/* Displaying the transcript */}
      <div className="text-center py-4">
        <p className="text-xl text-white">Transcript: {transcript}</p>
      </div>

      <Routes>
        <Route path="/" element={<FeaturesPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/biologygame" element={<Biologygame />} />
        <Route path="/mathgame" element={<Mathgame />} />
        <Route path="/fruit" element={<Fruit />} />
        <Route path="/chefmaster" element={<ChefMaster />} />
        <Route path="/carpentry" element={<Carpentry />} />
        <Route path="/vocational" element={<VocationalPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/game-certification" element={<GamifiedCertification />} />
        <Route path="/education" element={<EducationSelectorPage />} />
        <Route path="/education/below10" element={<EducationPage/>} />
        <Route path="/education/below20" element={<Below20 />} />
        <Route path="/education/below30" element={<Below30 />} />
        
      </Routes>

      <div className="flex justify-center space-x-4 py-4">
        <button
          onClick={isListening ? stopRecognition : startRecognition}
          className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition"
        >
          {isListening ? "Stop Voice Recognition" : "Start Voice Recognition"}
        </button>
      </div>

      <Footer />
      <ChatbotIcon />
    </div>
  );
}


// Wrap App with Router in index.js to provide routing context
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);