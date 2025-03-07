import { useEffect, useState } from "react";
import "./App.css";

const getList = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i);
  }
  return list;
};

function App() {
  const [stage, setStage] = useState("init");
  const [nums, setNums] = useState(getList());
  const [opened, setOpened] = useState([]);
  const [solvedList, setSolvedList] = useState([]);

  const randomList = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  };

  const handleStart = () => {
    setStage("start");
    setNums(randomList());
    setSolvedList([]);
  };

  const handleOnClick = (num, index) => {
    if (opened.length === 2) return;
    setOpened((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (opened.length === 2) {
      setTimeout(() => {
        const id2 = opened[1];
        const id1 = opened[0];

        if (nums[id1] === nums[id2]) {
          setSolvedList((prev) => [...prev, nums[id1]]);
        }
        setOpened([]);
      }, 1000);
    }
  }, [opened]);

  useEffect(() => {
    if (solvedList.length === 8) {
      setStage("win");
    }
  }, [solvedList]);

  const getClassName = (num, index) => {
    if (solvedList.includes(num)) {
      return "remove";
    } else if (opened.includes(index)) {
      return "show";
    } else {
      return "hide";
    }
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {stage === "init" && (
        <button className="btn" onClick={handleStart}>
          Play Game
        </button>
      )}
      {stage === "start" && (
        <div className="game">
          <div className="cards">
            {nums.map((num, i) => (
              <div
                key={i}
                className={`card ${getClassName(num, i)}`}
                onClick={() => handleOnClick(num, i)}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}
      {stage === "win" && (
        <div>
          <h2>You win the game!!!</h2>
          <button className="btn" onClick={handleStart}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
