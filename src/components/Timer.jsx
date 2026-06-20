import { useEffect, useState } from "react";

function Timer() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const key = setInterval(() => {
      setCounter((count) => count + 1);
      // setTimePlaying((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(key);
    };
  }, []);

  return <p>{counter} seconds have passed.</p>;
}

export default Timer;
