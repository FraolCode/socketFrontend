import { useState, useEffect } from "react";
import io from "socket.io-client";
const URL = "https://socketbackend-production.up.railway.app/5000"

const socket = io(URL);
const MAX_PLAYERS = 5;

function App() {
  const [waitingPlayers, setWaitingPlayers] = useState([]);
  const [numPlayers, setNumPlayers] = useState(0);
  const [roomId, setRoomId] = useState(null);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    socket.on("updateWaitingPlayers", (players,count) => {
     
      setWaitingPlayers(players);
      setNumPlayers(count);
    });

    socket.on("gameFull", () => {
      alert("The game is full");
    });
  }, []);

  const handleJoinGame = (roomI, playerN) => {
    socket.emit("joinGame", roomId, playerName);
  };

  return (
    <div className="App">
      <div>
        <h1>Waiting all players to join:  </h1>
        <ul>
        {Object.keys(waitingPlayers).map(key => (
      <div key={key}>
        {waitingPlayers[key].name}
      </div>
    ))}
        </ul>
        <p>
          {numPlayers}/{MAX_PLAYERS} players joined
        </p>
        {numPlayers === MAX_PLAYERS ? (
          <button disabled>Join Game</button>
        ) : (
          <>
            <label>
              Room ID:
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </label>
            <br />
            <label>
              Player Name:
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </label>
            <br/>

            <button onClick={ handleJoinGame}>
              Join Game
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default App;
