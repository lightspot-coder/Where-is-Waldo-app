import { useState } from "react";

function LoadPhoto() {
  // fetch the photo with the server

  const [square, setSquare] = useState(null);
  const SQUARE_SIZE = 100;

  function handleOnClick(e) {
    const rect = e.target.getBoundingClientRect();
    console.log("image start at X: " + rect.x + ", and Y: " + rect.y);
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    console.log("click on X: " + clickX + ", and Y: " + clickY);
    // Center the square over the click point
    const x = clickX - SQUARE_SIZE / 2;
    const y = clickY - SQUARE_SIZE / 2;

    setSquare({ x, y });
  }
  return (
    <>
      <img
        src="../../public/waldo1.jpg"
        width="1000"
        height="800"
        onClick={handleOnClick}
      ></img>
      {/* Render the square if coordinates exist */}
      {square && (
        <div
          style={{
            position: "absolute",
            left: `${square.x}px`,
            top: `${square.y + 80}px`,
            width: `${SQUARE_SIZE}px`,
            height: `${SQUARE_SIZE}px`,
            border: "4px solid #ff3333",
            backgroundColor: "rgba(255, 51, 51, 0.2)",
            pointerEvents: "none", // Prevents the square from blocking future image clicks
            borderRadius: "4px",
          }}
        />
      )}
    </>
  );
}

export default LoadPhoto;
