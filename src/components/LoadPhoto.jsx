import { useState } from "react";
import CharacterMenu from "./CharacterMenu";

function LoadPhoto({ setCharacter, game, availableCharacters }) {
  // fetch the photo with the server

  const [menuPosition, setMenuPosition] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  function handleOnClick(e) {
    if (!showMenu) {
      const rect = e.target.getBoundingClientRect();
      const clickX = Math.round(e.clientX - rect.left);
      const clickY = Math.round(e.clientY - rect.top);
      const x = clickX;
      const y = clickY;
      setMenuPosition({ x, y });
      setShowMenu(true);
    }
  }
  return (
    <>
      <div>
        <img
          src={`/images/${game.imageLoaded.fileName}`}
          width="1000"
          height="800"
          onClick={handleOnClick}
        ></img>
        {/* Render the square if coordinates exist */}
        {showMenu && (
          <CharacterMenu
            x={menuPosition.x}
            y={menuPosition.y}
            setShowMenu={setShowMenu}
            setCharacter={setCharacter}
            availableCharacters={availableCharacters}
          />
        )}
      </div>
    </>
  );
}

export default LoadPhoto;
