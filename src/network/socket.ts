import io from "socket.io-client";

export default class Socket {
  private socket;
  constructor(baseURL: string, getAccessToken: Function) {
    this.socket = io(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
      transports: ["websocket"],
    });

    this.socket.on("connect_error", (err) =>
      console.log("socket error ", err.message)
    );
  }

  onSync(event: string, callback: Function) {
    if (!this.socket.connected) {
      this.socket.connect();
    }

    this.socket.on(event, (message) => callback(message));

    // 연결을 종료하는 함수를 리턴
    return () => this.socket.off(event);
  }
}
