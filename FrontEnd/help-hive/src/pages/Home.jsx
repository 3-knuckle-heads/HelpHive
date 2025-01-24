import { useState } from "react";
import reactLogo from "../assets/react.svg";
import "../App.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>HelpHive | Volunteer management</h2>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 10)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Home;
