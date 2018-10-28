class Message {
  constructor(text, sender, socketId) {
    this.text = text;
    this.sender = sender;
    this.socketId = socketId;
  }
}

module.exports = Message;
