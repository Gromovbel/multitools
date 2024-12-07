import React, { useState } from "react";

function Randomizer() {
  const [numCount, setNumCount] = useState("");
  const [minNum, setMinNum] = useState("");
  const [maxNum, setMaxNum] = useState("");
  const [randomNumbers, setRandomNumbers] = useState([]);

  const generateRandomNumbers = () => {
    const count = parseInt(numCount, 10);
    const min = parseInt(minNum, 10);
    const max = parseInt(maxNum, 10);

    if (isNaN(count) || isNaN(min) || isNaN(max) || count <= 0 || min > max) {
      setRandomNumbers([]);
      alert("Please enter the correct values.");
      return;
    }

    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setRandomNumbers(numbers);
  };

  return (
    <div className="randomizer">
      <h2>Randomizer</h2>
      <p>Choose the number of random numbers, from which and to which number</p>
      <div>
        <label htmlFor="numCount">Number of numbers:</label>
        <input
          type="number"
          id="numCount"
          value={numCount}
          onChange={(e) => setNumCount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="minNum">Minimum number:</label>
        <input
          type="number"
          id="minNum"
          value={minNum}
          onChange={(e) => setMinNum(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="maxNum">Maximum number:</label>
        <input
          type="number"
          id="maxNum"
          value={maxNum}
          onChange={(e) => setMaxNum(e.target.value)}
        />
      </div>
      <button className="btn" onClick={generateRandomNumbers}>
        Generate
      </button>
      <h3>Result:</h3>
      <p>{randomNumbers.length > 0 ? randomNumbers.join(", ") : " "}</p>
    </div>
  );
}

export { Randomizer };
