import { useState } from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [roomId, setRoomId] = useState("");

  return (
    <form>
      <label>Room</label>
      <input
        value={roomId}
        title="room"
        onInput={(e) => setRoomId(e.target.value)}
      />
      <Link to={`/call/${roomId}`}>
        <input type="submit" name="submit" value="Join room" />
      </Link>
    </form>
  );
};

export default HomeScreen;
