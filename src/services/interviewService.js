import stringSimilarity from "string-similarity";

// Questions and Expected Answers
const questionsData = [
  {
    question: "Tell me about yourself.",
    keywords: ["background", "skills", "motivation"], // Key concepts for evaluation
    answer: "Your answer should briefly introduce your background, skills, and motivation.",
  },
  {
    question: "Why do you want to work here?",
    keywords: ["company’s values", "culture", "fit"],
    answer: "Show that you understand the company’s values and culture, and how you fit into them.",
  },
  {
    question: "What are your strengths and weaknesses?",
    keywords: ["strength relevant to the job", "working on improving weaknesses"],
    answer: "Identify a strength relevant to the job and a weakness you’re working on improving.",
  },
  // Add additional questions here...
];

// Get Random Question
export const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questionsData.length);
  return questionsData[randomIndex];
};

// Enhanced Answer Checking Logic
export const checkAnswer = (userAnswer, question) => {
  const matchingQuestion = questionsData.find((q) => q.question === question);

  if (!matchingQuestion) {
    return false; // If the question doesn't exist, return false
  }

  const correctAnswer = matchingQuestion.answer.toLowerCase();
  const keywords = matchingQuestion.keywords.map((kw) => kw.toLowerCase());
  const userAnswerLower = userAnswer.toLowerCase();

  // Step 1: Compute similarity score for the entire answer
  const similarity = stringSimilarity.compareTwoStrings(userAnswerLower, correctAnswer);

  // Step 2: Check if the user's answer contains any of the keywords
  const keywordMatches = keywords.some((keyword) =>
    userAnswerLower.includes(keyword)
  );

  // Consider the answer correct if similarity > 0.5 OR it contains keywords
  return similarity > 0.5 || keywordMatches;
};

export default { getRandomQuestion, checkAnswer };
