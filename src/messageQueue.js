class MessageQueue {
  constructor() {
    this.userQueues = {};
  }

  addMessage(user, message) {
    if (!(user in this.userQueues)) {
      this.userQueues[user] = [];
    }
    this.userQueues[user].push(message);
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
}

module.exports = MessageQueue;
