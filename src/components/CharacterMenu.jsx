function CharacterMenu({
  x,
  y,
  setShowMenu,
  setCharacter,
  availableCharacters,
}) {
  function handleChooseCharacter(e, index) {
    setCharacter({
      name: availableCharacters[index].name,
      positionX: x,
      positionY: y,
    });
    console.log(
      "You choose the character : " + availableCharacters[index].name,
    );
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
      {availableCharacters.map((character, index) => {
        console.log(character);

        return (
          <div
            onClick={(e) => {
              handleChooseCharacter(e, index);
            }}
            style={{
              content: `url("/images/characters/${character.name}.png")`,
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
