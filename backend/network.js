class network {
  ser = new server();

  sendToServer(data, func = () => {}) {
    return this.ser.requestHandler(data, func);
  }
}
