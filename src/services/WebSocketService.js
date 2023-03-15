import { WebSocketEndpoint } from "../configs/configs";
import { dl } from "../utils/DateLog";

class WebSocketService {
  constructor() {
    this.websocket = new WebSocket(WebSocketEndpoint);
    this.websocket.onopen = this.onOpen.bind(this);
    this.messageHandler = null;
  }

  onOpen() {
    console.log("WebSocket connection established");
  }

  async onMessage(event) {
    const data = JSON.parse(event.data);
    dl("Data from server: ", data);
    await this.messageHandler(data);
  }

  setMessageHandler(func) {
    this.messageHandler = func;
    this.websocket.onmessage = this.onMessage.bind(this);
  }

  sendMessage(type, payload) {
    const message = { action: "sendmessage", message: { type, payload } };
    this.websocket.send(JSON.stringify(message));
  }
}

export default WebSocketService;
