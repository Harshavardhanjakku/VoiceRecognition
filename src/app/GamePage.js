import React from "react";
const GamePage = () => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Welcome to the Games Page</h1>
        <a href="/mathgame" style={styles.button} className="button">
          Math Game
        </a>
        <a href="/biologygame" style={styles.button} className="button">
          Biology Game
        </a>
        <a href="/fruit" style={styles.button} className="button">
          Fruit Game
        </a>
      </div>
    </div>
  );
};

const styles = {
  body: { fontFamily: "Arial, sans-serif" },
  h1: {color:"inherit"}
};

export default GamePage;