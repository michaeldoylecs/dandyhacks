const Message = require('./message.js');

class MessageQueue {
  constructor() {
    this.userQueues = {};
  }

  addMessage(text, sender, recipient) {
    if (!(recipient in this.userQueues)) {
      this.userQueues[recipient] = [];
    }
    const newMessage = new Message(text, sender, recipient);
    this.userQueues[recipient].push(newMessage);
  }

  getMessageCount(user) {
    if (this.userQueues[user] == null) { return null; }
    return this.userQueues[user].length;
  }

  popMessage(user) {
    if (this.userQueues[user] == null) { return null; }
    if (this.userQueues[user].length === 0) { return null; }
    return this.userQueues[user].shift();
  }

  popAllMessages(user) {
    if (this.userQueues[user] == null) { return null; }
    if (this.userQueues[user].length === 0) { return null; }
    const messages = this.userQueues[user];
    this.userQueues[user] = [];
    return messages;
  }

  getMessage(user) {
    if (this.userQueues[user] == null) { return null; }
    if (this.userQueues[user].length === 0) { return null; }
    return this.userQueues[user][0];
  }

  getAllMessages(user) {
    if (this.userQueues[user] == null) { return null; }
    if (this.userQueues[user].length === 0) { return null; }
    return this.userQueues[user];
  }
}

module.exports = MessageQueue;
