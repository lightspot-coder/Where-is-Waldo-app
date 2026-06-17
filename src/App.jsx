import { useState } from "react";
import LoadPhoto from "./components/LoadPhoto";

function App() {
  const [character, setCharacter] = useState(undefined);
  console.log(character);
  return (
    <>
      <h1>Where is Waldo app</h1>
      <LoadPhoto setCharacter={setCharacter} />
    </>
  );
}

export default App;
