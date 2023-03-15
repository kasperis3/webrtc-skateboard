import { useState } from "react";
import { dl } from "../utils/DateLog";

const ScreenShare = ({ mediaService, connection, isPeerConnected }) => {
  const [screen, setScreen] = useState(null);

  const beginShare = async () => {
    const feed = await mediaService.getLocalScreen();
    let videoTrack = feed.getVideoTracks()[0];
    videoTrack.onended = () => {
      stopShare();
    };
    setScreen(feed);
    connection.setupLocalScreen(videoTrack);
    dl("FEEEEEED", feed);
  };

  const stopShare = () => {
    let tracks = screen.getTracks();
    tracks.forEach((track) => track.stop());
    setScreen(null);
  };

  return (
    <div>
      {!!screen ? (
        <button onClick={stopShare}>Stop share</button>
      ) : (
        <button onClick={beginShare}>Share screen</button>
      )}
      <video
        autoPlay
        muted
        ref={(video) => {
          if (video) video.srcObject = screen;
        }}
        playsInline
      />
    </div>
  );
};

export default ScreenShare;
