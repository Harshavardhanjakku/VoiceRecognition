import React, { useState } from "react";

const recipes = {
  "Prawns Biryani": ["Prawns", "Rice", "Spices"],
  "Chicken Biryani": ["Chicken", "Rice", "Spices"],
  "Chicken Noodles": ["Chicken", "Noodles", "Sauce"],
  "Mutton Curry": ["Mutton", "Spices"],
  "Prawns Fry": ["Prawns", "Spices"],
};

const ingredients = [
  "Prawns",
  "Chicken",
  "Mutton",
  "Rice",
  "Noodles",
  "Spices",
  "Sauce",
];

const Level2 = ({ onComplete }) => {
  const [selectedRecipe] = useState(
    Object.keys(recipes)[Math.floor(Math.random() * Object.keys(recipes).length)]
  );
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleIngredientClick = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleSubmit = () => {
    const correctIngredients = recipes[selectedRecipe];
    const score =
      (selectedIngredients.filter((ing) => correctIngredients.includes(ing))
        .length / correctIngredients.length) *
      100;
    setIsSubmitted(true);
    onComplete(score);
  };

  return (
    <div>
      <h2>Level 2</h2>
      <p>Recipe: {selectedRecipe}</p>
      <p>Select ingredients for this recipe:</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {ingredients.map((ingredient) => (
          <div
            key={ingredient}
            onClick={() => handleIngredientClick(ingredient)}
            style={{
              margin: "10px",
              padding: "10px",
              border: "1px solid gray",
              cursor: "pointer",
              backgroundColor: selectedIngredients.includes(ingredient)
                ? "lightgreen"
                : "white",
            }}
          >
            {ingredient}
          </div>
        ))}
      </div>
      {!isSubmitted && (
        <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
          Submit Ingredients
        </button>
      )}
    </div>
  );
};

export default Level2;
