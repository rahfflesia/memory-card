import { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <div>
        <header>
          <h3>Pokemon memory card game</h3>
          <div className="score">
            <p>Score: {score}</p>
            <p>Best score: {bestScore}</p>
          </div>
        </header>
        <Grid
          setScore={setScore}
          setBestScore={() => {
            if (score > bestScore) setBestScore(score);
          }}
        ></Grid>
      </div>
    </>
  );
}

export default App;
