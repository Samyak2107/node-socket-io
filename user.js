export class User {
  static userList = [];
  static message = 0;
  static vcipStartSignal = false;
  static livelinessCode = 111111;
  static customerIp = {};
  static agentOnline = false;

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

  static getIsAgentOnline() {
    return this.agentOnline;
  }

  static getLivelinessCode() {
    return this.livelinessCode;
  }

  static getCustomerIp() {
    return this.customerIp;
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

  static addLivelinessCode(codeReceived) {
    this.livelinessCode = codeReceived;
  }

  static vcipStart(signal) {
    this.vcipStartSignal = signal;
  }

  static setAgentOnline(signal) {
    this.agentOnline = signal;
  }

  static addCustomerIp(ip) {
    this.customerIp = ip;
  }

  static removeUser(id) {
    if (this.userList) {
      this.userList = this.userList.filter((user) => user.id != id);
    }
  }
}
