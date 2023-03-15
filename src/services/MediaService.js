class MediaService {
  async getLocalStream() {
    const local = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: {
        noiseSuppression: true,
      },
    });

    return local;
  }

  async getLocalScreen() {
    const local = await navigator.mediaDevices.getDisplayMedia();

    return local;
  }

  initRemoteStream() {
    return new MediaStream();
  }
}

export default MediaService;
