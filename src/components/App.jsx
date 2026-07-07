import { Link } from "react-router";
import Game from "./Game";
import "./App.css";

function App() {
  return (
    <>
      <h1>Were is Waldo?</h1>
      <Game />
      <Link to="/score">Show score</Link>
    </>
  );
}

export default App;
