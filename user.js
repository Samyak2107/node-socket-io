export class User {
  static userList = [];
  static message = 0;
  static vcipStartSignal = false;

  constructor() {}

  static getUserList() {
    return this.userList;
  }

  static getMessage() {
    return this.message;
  }

  static getVcipSignal() {
    return this.vcipStartSignal;
  }

  static addUser(user) {
    const added = this.userList.find(
      (currentUser) => currentUser.id == user.id
    );
    if (added) {
      return;
    }
    this.userList.push(user);
  }

  static addMessage(messageReceived) {
    this.message = messageReceived;
  }

  static vcipStart(signal) {
    this.vcipStartSignal = signal;
  }

  static removeUser(id) {
    if (this.userList) {
      this.userList = this.userList.filter((user) => user.id != id);
    }
  }
}
