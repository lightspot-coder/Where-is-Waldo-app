import { useEffect, useState } from "react";
import LoadPhoto from "./LoadPhoto";
import Timer from "./Timer";

const URL_DOMAIN = import.meta.env.VITE_API_URL;

async function createGame(imageId) {
  try {
    console.log(URL_DOMAIN);
    const userId = localStorage.getItem("id");
    let url = URL_DOMAIN + `game?imageId=${imageId}`;
    if (userId) {
      url += `&userId=${userId}`;
    }
    const response = await fetch(url);
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

async function fetchUpdateName(newName) {
  const userId = localStorage.getItem("id");
  if (!userId) {
    console.log("You dont have a user on the server");
    return null;
  }
  const response = await fetch(URL_DOMAIN + `user/${userId}?name=${newName}`);
  if (!response.ok) {
    console.log("Something goes wrong updating the user name");
    return null;
  }
  const data = await response.json();
  return data;
}

function Game() {
  const [character, setCharacter] = useState(undefined);
  const [charactersFounded, setCharacterFounded] = useState([]);
  const [start, setStart] = useState(false);
  const [imageId, setImageId] = useState("waldo2.jpg");
  const [newGame, setNewGame] = useState(undefined);
  const [gameOver, setGameOver] = useState(false);
  const [availableCharacters, setAvailableCharacters] = useState([]);
  const [totalTime, setTotalTime] = useState(undefined);
  const [serverMessage, setServerMessage] = useState("");
  const [userName, setUserName] = useState("anonymus");
  const [updateName, setUpdateName] = useState(false);

  //const [start] = useCreateGame();

  useEffect(() => {
    async function fetching() {
      if (character) {
        console.log(character);
        const url =
          URL_DOMAIN +
          `game/${newGame.id}/image/${newGame.imageLoaded.id}/user/${newGame.userId}/character?name=${character.name}&positionX=${character.positionX}&positionY=${character.positionY}`;
        console.log(url);
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          console.log(result.data);
          setServerMessage(result.message);
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
            if (result.gameOver) {
              setGameOver(true);
              setTotalTime(result.timePlaying);
            }
          }
        }
      }
    }
    fetching();
  }, [character]);

  async function handleStart(e) {
    e.preventDefault();

    console.log(imageId);
    const newGame = await createGame(imageId);
    console.log(newGame);
    localStorage.setItem("id", newGame.userId);
    setNewGame(newGame);
    setAvailableCharacters(newGame.imageLoaded.characters.slice());
    setStart(true);
  }
  function handleSelectImage(e) {
    console.log(e.target.value);
    setImageId(e.target.value);
  }

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  async function updateUserName(e) {
    e.preventDefault();
    const result = await fetchUpdateName(userName);
    if (!result) {
      setUpdateName(false);
      return;
    }
    console.log(result);
    setUserName(result.data.user.name);
    setUpdateName(true);
  }
  if (!start) {
    return (
      <>
        <div>
          <label>
            Select a image :
            <select name="image" value={imageId} onChange={handleSelectImage}>
              <option value="waldo1.jpg">Waldo on the beach</option>
              <option value="waldo2.jpg">Waldo on the market</option>
              <option value="waldo3.jpg">Waldo on the river</option>
            </select>
          </label>
          <button onClick={handleStart}>Start</button>
        </div>
      </>
    );
  }

  return (
    <div className="game">
      {!gameOver && (
        <>
          <Timer />
          <span>{serverMessage}</span>
        </>
      )}
      <div className="assets-interactive" style={{ position: "relative" }}>
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
                  top: `${character.targetBox.top}px`,
                  width: `${character.targetBox.width}px`,
                  height: `${character.targetBox.height}px`,
                  border: "2px solid red",
                }}
              />
            );
          })}
        {gameOver && (
          <>
            <div
              className="game-over-div"
              style={{
                position: "absolute",
                left: `400px`,
                top: `400px`,
                width: `200px`,
                height: `200px`,
                border: "2px solid red",
                backgroundColor: "white",
              }}
            >
              <p>{`You win in ${totalTime} seconds. ${serverMessage}`}</p>
              {!updateName ? (
                <label>
                  Add your name :{" "}
                  <input
                    type="text"
                    onChange={handleUserName}
                    defaultValue={userName}
                  />
                  <button onClick={updateUserName}>Confirm</button>
                </label>
              ) : (
                <p>Your new Name is {userName} </p>
              )}
              <a href="/">Go back and try again</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Game;
