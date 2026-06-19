import { useEffect, useState } from "react";
import LoadPhoto from "./LoadPhoto";

const URL_DOMAIN = "http://localhost:3000/waldo-api/";

async function createGame(imageId, userId) {
  try {
    const response = await fetch(
      URL_DOMAIN + `game?imageId=${imageId}&userId=${userId}`,
    );
    const result = await response.json();
    console.log(result.message);
    if (!response.ok) {
      return null;
    }

    return result.data.game;
  } catch (err) {
    console.log(err);
  }
}

function Game() {
  const [character, setCharacter] = useState(undefined);
  const [charactersFounded, setCharacterFounded] = useState([]);
  const [start, setStart] = useState(false);
  const [imageId, setImageId] = useState("2");
  const [time, setTime] = useState(undefined);
  const [newGame, setNewGame] = useState(undefined);
  const [availableCharacters, setAvailableCharacters] = useState([]);
  //const [start] = useCreateGame();

  useEffect(() => {
    async function fetching() {
      if (character) {
        console.log(character);
        const url =
          URL_DOMAIN +
          `game/${newGame.id}/image/${newGame.imageLoaded.id}/character?name=${character.name}&positionX=${character.positionX}&positionY=${character.positionY}`;
        console.log(url);
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          console.log(result.data);
          if (result.data && result.data.characterFinded) {
            console.log(result.data);
            let newCharactersFounded = charactersFounded.slice();
            newCharactersFounded.push(result.data);
            // remove the available character

            const characters = [];
            for (let i = 0; i < availableCharacters.length; i++) {
              if (
                result.data.characterFinded.name != availableCharacters[i].name
              ) {
                characters.push(availableCharacters[i]);
              }
            }
            console.log("characters availables : ");
            console.log(characters);
            setAvailableCharacters(characters.slice());
            setCharacterFounded(newCharactersFounded);
          }
        }
      }
    }
    fetching();
  }, [character]);

  async function handleStart(e) {
    e.preventDefault();

    console.log(imageId);
    const newGame = await createGame(imageId, 2);
    console.log(newGame);
    setNewGame(newGame);
    setAvailableCharacters(newGame.imageLoaded.characters.slice());
    setStart(true);
  }
  function handleSelectImage(e) {
    console.log(e.target.value);
    setImageId(e.target.value);
  }

  if (!start) {
    return (
      <>
        <div>
          <h1>Where is Waldo app</h1>
          <label>
            Select a image :
            <select name="image" value={imageId} onChange={handleSelectImage}>
              <option value="1">Waldo on the beach</option>
              <option value="2">Waldo on the market</option>
              <option value="3">Waldo on the river</option>
            </select>
          </label>
          <button onClick={handleStart}>Start</button>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Where is Waldo app</h1>
      <p>Start time : {newGame.start}</p>
      <LoadPhoto
        setCharacter={setCharacter}
        game={newGame}
        availableCharacters={availableCharacters}
      />
      {charactersFounded &&
        charactersFounded.map((character) => {
          return (
            <div
              className="targetBox"
              style={{
                position: "absolute",
                left: `${character.targetBox.left}px`,
                top: `${character.targetBox.top + 100}px`,
                width: `${character.targetBox.width}px`,
                height: `${character.targetBox.height}px`,
                border: "2px solid red",
              }}
            />
          );
        })}
    </>
  );
}

export default Game;
