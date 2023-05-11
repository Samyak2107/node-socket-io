"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
  function User() {}
  User.getUserList = function () {
    return this.userList;
  };
  User.addUser = function (user) {
    var added = this.userList.find(function (currentUser) {
      return currentUser.id == user.id;
    });
    if (added) {
      return;
    }
    this.userList.push(user);
  };
  User.removeUser = function (id) {
    if (this.userList) {
      this.userList = this.userList.filter(function (user) {
        return user.id != id;
      });
    }
  };
  User.userList = [];
  return User;
})();
exports.User = User;
