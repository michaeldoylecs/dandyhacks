const Message = require('./message.js');

class MessageQueue {
  constructor() {
    this.users = {};
  }

  addUser(user) {
    if (this.users[user] == null) {
      this.users[user] = [];
    }
  }

  addMessage(text, sender) {
    const message = new Message(text, sender);
    Object.keys(this.users).forEach((key) => {
      this.users[key].push(message);
    });
  }

  getMessageCount(user) {
    if (this.users[user] == null) { return null; }
    return this.users[user].length;
  }

  popMessage(user) {
    if (this.users[user] == null) { return null; }
    if (this.users[user].length === 0) { return null; }
    return this.users[user].shift();
  }

  popAllMessages(user) {
    if (this.users[user] == null) { return null; }
    if (this.users[user].length === 0) { return null; }
    const messages = this.users[user];
    this.users[user] = [];
    return messages;
  }

  getMessage(user) {
    if (this.users[user] == null) { return null; }
    if (this.users[user].length === 0) { return null; }
    return this.users[user][0];
  }

  getAllMessages(user) {
    if (this.users[user] == null) { return null; }
    if (this.users[user].length === 0) { return null; }
    return this.users[user];
  }
}

module.exports = MessageQueue;
