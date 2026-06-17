import { useState } from "react";

function CharacterMenu({ x, y, setShowMenu, setCharacter }) {
  const [arrayOfCharacterImg, setArrayOfCharacterImg] = useState([
    "../../public/characters/waldo.png",
    "../../public/characters/wenda.png",
    "../../public/characters/odlaw.png",
    "../../public/characters/wizard.png",
    "../../public/characters/woof.png",
  ]);

  function handleChooseCharacter(e, index) {
    let characterName = "";
    switch (index) {
      case 0:
        characterName = "waldo";
        break;
      case 1:
        characterName = "wenda";
        break;
      case 2:
        characterName = "odlaw";
        break;
      case 3:
        characterName = "wizard";
        break;
      case 4:
        characterName = "woof";
        break;
    }
    setCharacter({
      name: characterName,
      x: x,
      y: y,
    });
    console.log("You choose the character : " + characterName);
    setShowMenu(false);
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          position: "absolute",
          left: `${x - 50}px`,
          top: `${y}px`,
          width: "50px",
          height: "50px",
          fontSize: "small",
          textAlign: "center",
        }}
      >
        Who is the character
      </div>
      {arrayOfCharacterImg.map((characterImg, index) => {
        return (
          <div
            onClick={(e) => {
              handleChooseCharacter(e, index);
            }}
            style={{
              content: `url(${characterImg})`,
              backgroundColor: "white",
              position: "absolute",
              left: `${x + 50 * index}px`,
              top: `${y}px`,
              width: "50px",
              height: "50px",
            }}
          />
        );
      })}
    </>
  );
}

export default CharacterMenu;
