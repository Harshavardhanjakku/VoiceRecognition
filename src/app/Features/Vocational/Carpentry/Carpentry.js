import React, { useState, useEffect, useRef } from 'react';
import { 
  ChefHat, 
  Carrot, 
  Egg, 
  Timer, 
  Star,
  Mic,
  MicOff 
} from 'lucide-react';

// Game configurations
const RECIPES = [
  {
    name: 'Vegetable Salad',
    ingredients: ['Carrot', 'Lettuce', 'Tomato'],
    preparationTime: 120, // seconds
    difficulty: 1,
    reward: 10,
    voiceCommands: ['make salad', 'prepare salad', 'create vegetable salad']
  },
  {
    name: 'Omelette',
    ingredients: ['Egg', 'Cheese', 'Onion'],
    preparationTime: 180, // seconds
    difficulty: 2,
    reward: 20,
    voiceCommands: ['make omelette', 'cook omelette', 'prepare eggs']
  },
  {
    name: 'Margherita Pizza',
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella'],
    preparationTime: 300, // seconds
    difficulty: 3,
    reward: 30,
    voiceCommands: ['make pizza', 'cook pizza', 'prepare margherita']
  }
];

const INGREDIENTS = [
  { name: 'Carrot', icon: <Carrot size={24} />, voiceCommands: ['add carrot', 'carrot'] },
  { name: 'Egg', icon: <Egg size={24} />, voiceCommands: ['add egg', 'egg'] },
  { name: 'Lettuce', icon: null, voiceCommands: ['add lettuce', 'lettuce'] },
  { name: 'Tomato', icon: null, voiceCommands: ['add tomato', 'tomato'] },
  { name: 'Cheese', icon: null, voiceCommands: ['add cheese', 'cheese'] },
  { name: 'Onion', icon: null, voiceCommands: ['add onion', 'onion'] },
  { name: 'Dough', icon: null, voiceCommands: ['add dough', 'dough'] },
  { name: 'Tomato Sauce', icon: null, voiceCommands: ['add tomato sauce', 'tomato sauce'] },
  { name: 'Mozzarella', icon: null, voiceCommands: ['add mozzarella', 'mozzarella'] }
];

const ChefGame = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentRecipe, setCurrentRecipe] = useState(RECIPES[0]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [gameState, setGameState] = useState('menu');
  const [playerIngredients, setPlayerIngredients] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [activeTimer, setActiveTimer] = useState(null);
  
  // Voice Recognition States
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState(null);
  const recognitionRef = useRef(null);

  // Initialize Voice Recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setVoiceError('Speech recognition not supported');
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      setVoiceError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  // Toggle Voice Listening
  const toggleVoiceRecognition = () => {
    if (!recognitionRef.current) {
      setVoiceError('Speech recognition not available');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setVoiceError(null);
      } catch (error) {
        setVoiceError('Could not start speech recognition');
        setIsListening(false);
      }
    }
  };

  // Handle Voice Commands
  const handleVoiceCommand = (transcript) => {
    if (gameState === 'menu') {
      const matchedRecipe = RECIPES.find(recipe => 
        recipe.voiceCommands.some(command => transcript.includes(command))
      );
      
      if (matchedRecipe) {
        startRecipe(matchedRecipe);
        speakFeedback(`Starting ${matchedRecipe.name} recipe`);
        return;
      }
    }

    if (gameState === 'cooking') {
      if (transcript.includes('start over') || transcript.includes('restart')) {
        startRecipe(currentRecipe);
        speakFeedback('Restarting the recipe');
        return;
      }

      const matchedIngredient = INGREDIENTS.find(ingredient => 
        ingredient.voiceCommands.some(command => transcript.includes(command))
      );
      
      if (matchedIngredient) {
        addIngredient(matchedIngredient);
        return;
      }

      if (transcript.includes('help')) {
        speakFeedback(`You are cooking ${currentRecipe.name}. Add the required ingredients before time runs out.`);
      }
    }
  };

  // Text-to-Speech Feedback
  const speakFeedback = (message) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecipe = (recipe) => {
    if (activeTimer) {
      clearInterval(activeTimer);
    }

    setCurrentRecipe(recipe);
    setTimeRemaining(recipe.preparationTime);
    setPlayerIngredients([]);
    setGameState('cooking');
    
    const newChallenges = generateChallenges(recipe);
    setChallenges(newChallenges);

    speakFeedback(`Let's cook ${recipe.name}. You have ${recipe.preparationTime} seconds.`);

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          completeRecipe();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setActiveTimer(timer);
  };

  const generateChallenges = (recipe) => {
    const possibleChallenges = [
      { type: 'speedChallenge', description: 'Finish under 2 minutes' },
      { type: 'perfectIngredients', description: 'Use exact ingredients' },
      { type: 'noMistakes', description: 'Zero ingredient drops' }
    ];
    return possibleChallenges
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
  };

  const completeRecipe = () => {
    let earnedScore = currentRecipe.reward;
    let challengeBonus = 0;

    challenges.forEach(challenge => {
      switch(challenge.type) {
        case 'speedChallenge':
          if (timeRemaining > 60) challengeBonus += 5;
          break;
        case 'perfectIngredients':
          if (playerIngredients.length === currentRecipe.ingredients.length) 
            challengeBonus += 10;
          break;
        case 'noMistakes':
          challengeBonus += 5;
          break;
      }
    });

    const totalScore = earnedScore + challengeBonus;
    setScore(prev => prev + totalScore);
    setLevel(prev => prev + 1);
    setGameState('completed');

    speakFeedback(`Congratulations! You completed ${currentRecipe.name} and earned ${totalScore} points.`);
  };

  const addIngredient = (ingredient) => {
    if (gameState !== 'cooking') return;

    if (currentRecipe.ingredients.includes(ingredient.name)) {
      setPlayerIngredients(prev => [...prev, ingredient]);
      speakFeedback(`Added ${ingredient.name}`);
    } else {
      speakFeedback(`${ingredient.name} is not needed for this recipe`);
    }
  };

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearInterval(activeTimer);
      }
    };
  }, [activeTimer]);

  const renderScreen = () => {
    switch(gameState) {
      case 'menu':
        return (
          <div className="p-6 text-center">
            <ChefHat size={64} className="mx-auto mb-4 text-yellow-500" />
            <h1 className="text-3xl font-bold mb-6">Chef Challenge Game</h1>
            
            {/* Voice Recognition Toggle */}
            <div className="mb-6">
              <button 
                onClick={toggleVoiceRecognition}
                className={`p-4 rounded ${isListening ? 'bg-green-500' : 'bg-red-500'} text-white flex items-center`}
              >
                {isListening ? <Mic size={24} /> : <MicOff size={24} />}
                <span className="ml-2">{isListening ? 'Listening' : 'Voice Control'}</span>
              </button>
            </div>

            {/* Voice Error Display */}
            {voiceError && (
              <div className="text-red-500 mb-6">
                {voiceError}
              </div>
            )}

            <div className="grid grid-cols-3 gap-6 ">
              {RECIPES.map(recipe => (
                <button 
                  key={recipe.name} 
                  onClick={() => startRecipe(recipe)}
                  className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 m-4"
                >
                  {recipe.name}
                </button>
              ))}
            </div>
            <div className="mt-6 text-gray-600 text-sm">
              Tip: You can also say "{RECIPES[0].voiceCommands[0]}" to start cooking!
            </div>
          </div>
        );
        
      case 'cooking':
        return (
          <div className="p-6">
            <div className="flex justify-between mb-6">
              <div className="text-xl">
                <Timer size={32} className="inline mr-2" />
                {timeRemaining} sec
              </div>
              <div className="text-xl">
                <Star size={32} className="inline mr-2" />
                Score: {score}
              </div>
            </div>

            {/* Voice Recognition Toggle */}
            <div className="mb-6">
              <button 
                onClick={toggleVoiceRecognition}
                className={`p-4 rounded ${isListening ? 'bg-green-500' : 'bg-red-500'} text-white flex items-center`}
              >
                {isListening ? <Mic size={24} /> : <MicOff size={24} />}
                <span className="ml-2">{isListening ? 'Listening' : 'Voice Control'}</span>
              </button>
            </div>

            {/* Voice Error Display */}
            {voiceError && (
              <div className="text-red-500 mb-6">
                {voiceError}
              </div>
            )}

            <h2 className="text-2xl font-semibold mb-4">{currentRecipe.name}</h2>

            {/* Challenges */}
            <div className="mb-6">
              <h3 className="font-semibold">Challenges:</h3>
              {challenges.map((challenge, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {challenge.description}
                </div>
              ))}
            </div>

            {/* Ingredients Selection */}
            <div className="grid grid-cols-3 gap-6">
              {INGREDIENTS.map(ingredient => (
                <button
                  key={ingredient.name}
                  onClick={() => addIngredient(ingredient)}
                  className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600"
                >
                  {ingredient.icon && ingredient.icon}
                  <div className="mt-2">{ingredient.name}</div>
                </button>
              ))}
            </div>

            {/* Ingredient List */}
            <div className="mt-6">
              <h3 className="font-semibold">Ingredients Added:</h3>
              <ul className="list-disc ml-6">
                {playerIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.name}</li>
                ))}
              </ul>
            </div>

            {/* Help Tip */}
            <div className="mt-6 text-sm text-gray-500">
              <p className="italic">Tip: Add the ingredients listed for your recipe!</p>
            </div>
          </div>
        );

      case 'completed':
        return (
          <div className="p-6 text-center">
            <div className="text-3xl font-bold mb-6">Recipe Completed!</div>
            <div className="text-xl mb-6">Total Score: {score}</div>
            <button
              onClick={() => setGameState('menu')}
              className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
            >
              Return to Menu
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return renderScreen();
};

export default ChefGame;
