import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MediaService from "../services/MediaService";
import ScreenShare from "./ScreenShare";
import axios from "axios";
import { dl } from "../utils/DateLog";
import { RESTAPIEndpoint as baseURL } from "../configs/configs";

const CallScreen = ({ connection }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dataFetchedRef = useRef(false); // stops useEffect from running twice
  const params = useParams();
  const roomId = params.roomId;
  const mediaService = new MediaService();

  const startStream = async () => {
    const local = await mediaService.getLocalStream();
    const remote = mediaService.initRemoteStream();
    connection.setStreams(local, remote);
    connection.setupLocalMedia(); // add local tracks to peerConnection
    setLocalStream(local);
    setRemoteStream(remote);
  };

  const handleJoinOrCreateRoom = async () => {
    try {
      const response = await axios.post(`${baseURL}/createRoom`, {
        uniqueName: roomId,
      });
      dl(response, response.data);
      if (!["closed", "full"].includes(response.data.status)) {
        dl("joining or creating room");
        connection.joinOrCreateRoom(response.data.roomId);
      } else {
        setErrorMessage(
          `Sorry this room's status is ${response.data.status}. 
          Try entering another room! Redirecting you to the home page...`
        );
        setTimeout(() => {
          navigate("/");
        }, 1000 * 3);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    startStream();
    handleJoinOrCreateRoom();
  }, []);

  return (
    <div>
      {errorMessage.length > 0 ? (
        <h1>{errorMessage}</h1>
      ) : (
        <>
          <h2>{"Room : " + roomId}</h2>
          <video
            autoPlay
            muted
            playsInline
            ref={(video) => {
              if (video) {
                video.srcObject = localStream;
              }
            }}
          />
          <video
            autoPlay
            // muted
            playsInline
            ref={(video) => {
              if (video) {
                video.srcObject = remoteStream;
              }
            }}
          />
          <ScreenShare
            connection={connection}
            mediaService={mediaService}
            isPeerConnected={!!remoteStream}
          />
        </>
      )}
    </div>
  );
};

export default CallScreen;
