const options = {
  kush: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
      // url: ["stun:otter-coturn-nlb-5a8d8d689e56715d.elb.us-west-1.amazonaws.com:80"]
    },
    {
      urls: ["turn:relay.metered.ca:80"],
      username: "ac7a2cd7562e01e4ede53690",
      credential: "+mt5iQ+vORfAk+OG",
    },
    {
      urls: ["turn:relay.metered.ca:443"],
      username: "ac7a2cd7562e01e4ede53690",
      credential: "+mt5iQ+vORfAk+OG",
    },
    {
      urls: ["turn:relay.metered.ca:443?transport=tcp"],
      username: "ac7a2cd7562e01e4ede53690",
      credential: "+mt5iQ+vORfAk+OG",
    },
    // {
    //   urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    // },
  ],
  chris: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
      urls: ["stun:turn.hohoho.ga"],
    },
    {
      urls: ["turn:turn.hohoho.ga?transport=tcp"],
      username: "chris",
      credential: "webrtc",
    },
  ],
  nlb: [
    {
      urls: [
        "turn:otter-coturn-nlb-5a8d8d689e56715d.elb.us-west-1.amazonaws.com:80",
      ],
      username: "1678488714-:-randomUserId",
      credential: "mreJS+zpi62GWWrFW94wtfSoa4g=",
    },
  ],
};

export const RTCConfig = {
  iceServers: options.nlb,
  iceCandidatePoolSize: 10,
};

export const WebSocketEndpoint =
  "wss://eoevuwoy1c.execute-api.us-east-2.amazonaws.com/dev";

export const RESTAPIEndpoint =
  "https://qpbc772eia.execute-api.us-east-2.amazonaws.com/dev";
