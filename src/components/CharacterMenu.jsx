import { useState } from "react";

function CharacterMenu({ x, y }) {
  const [arrayOfCharacterImg, setArrayOfCharacterImg] = useState([
    "../../public/characters/waldo.png",
    "../../public/characters/wenda.png",
    "../../public/characters/odlaw.png",
    "../../public/characters/wizard.png",
    "../../public/characters/woof.png",
  ]);

  function handleCharacterMenu(e) {
    const rect = e.target.getBoundingClientRect();
    console.log("image start at X: " + rect.x + ", and Y: " + rect.y);
  }

  return (
    <>
      {arrayOfCharacterImg.map((characterImg, index) => {
        return (
          <div
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
