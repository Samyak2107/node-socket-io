export class User {
  static userList = [];
  static message = 0;

  constructor() {}

  static getUserList() {
    return this.userList;
  }

  static getMessage() {
    return this.message;
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
    message = messageReceived;
  }

  static removeUser(id) {
    if (this.userList) {
      this.userList = this.userList.filter((user) => user.id != id);
    }
  }
}
