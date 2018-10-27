const Message = require('./message.js');

class MessageQueue {
  constructor() {
    this.userQueues = {};
  }

  addMessage(text, sender, recipient) {
    if (!(sender in this.userQueues)) {
      this.userQueues[sender] = [];
    }
    const newMessage = new Message(text, sender, recipient);
    this.userQueues[sender].push(newMessage);
  }

  getMessageCount(user) {
    if (this.userQueues[user] != null) { return 'NONE'; }
    return this.userQueues[user].length;
  }

  getMessage(user) {
    if (this.userQueues[user] != null) { return 'NONE'; }
    if (this.userQueues[user].length === 0) { return 'NONE'; }
    return this.userQueues[user].shift();
  }

  getAllMessages(user) {
    if (this.userQueues[user] != null) { return 'NONE'; }
    if (this.userQueues[user].length === 0) { return 'NONE'; }
    const messages = this.userQueues[user];
    this.userQueues[user] = [];
    return messages;
  }
}

module.exports = MessageQueue;
