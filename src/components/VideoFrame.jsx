const VideoFrame = ({ srcObject, host }) => {
  return (
    <>
      {/* {host ? <span>My Video</span> : <span>Your Video</span>} */}
      <video
        width={"400px"}
        ref={(video) => {
          if (video) video.srcObject = srcObject;
        }}
        autoPlay
        muted={host ? true : false}
        // controls
        playsInline
      ></video>
    </>
  );
};

export default VideoFrame;
