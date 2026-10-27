import { useState } from "react";
import "./App.css";
import * as d3 from "d3";

const data = [4, 8, 15, 16, 23, 42];
console.log("Max:", d3.max(data));

function App() {
  const [count, setCount] = useState(0);
  const colors = ["red", "green", "blue"];

  return (
    <>
      <h1>Hello, World!</h1>
      <p>Welcome to my first React app!</p>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <div>
        {colors.map((color, i) => (
          <div
            key={i}
            style={{
              display: "block",
              width: "120px",
              borderRadius: "8px",
              marginBottom: "8px",
              backgroundColor: color,
              // width: "100px",
              height: "100px",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
