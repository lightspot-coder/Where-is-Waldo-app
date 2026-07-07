import { useEffect, useState } from "react";

const URL_DOMAIN = import.meta.env.VITE_API_URL;

function ShowScore() {
  const [users, setUsers] = useState(undefined);
  useEffect(() => {
    fetch(URL_DOMAIN + "score")
      .then((respond) => respond.json())
      .then((result) => {
        console.log(result.data.users);
        setUsers(result.data.users);
      });
  }, []);
  return (
    <>
      <h1>Scores</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
            <th>Image name</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <>
                  {user.scores.map((score) => {
                    console.log(user);
                    return (
                      <tr>
                        <td>{user.name}</td>
                        <td>{score.value}</td>
                        <td>
                          {score.imageId == 1
                            ? "Waldo on the beach"
                            : score.imageId == 2
                              ? "Waldo on the market"
                              : "Waldo on the river"}
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
        </tbody>
      </table>
      <a href="/">Go back to the home page</a>
    </>
  );
}
export default ShowScore;
