"use strict";

const Schmervice = require("schmervice");

const internals = {
  removePassword: user => {
    delete user.password;

    return user;
  }
};

module.exports = class UserService extends Schmervice.Service {
  list(ctx = {}) {
    const { User } = this.server.models();
    return User.query(ctx.trx);
  }

  findById(id, ctx = {}) {
    const { User } = this.server.models();
    return User.query(ctx.trx).findById(id);
  }

  create(user, ctx = {}) {
    const { User } = this.server.models();

    return User.query(ctx.trx)
      .insert(user)
      .traverse(internals.removePassword);
  }

  update(id, user, ctx = {}) {
    const { User } = this.server.models();
    return User.query(ctx.trx)
      .findById(id)
      .patch(user);
  }

  delete(id, ctx = {}) {
    const { User } = this.server.models();

    return User.query(ctx.trx)
      .delete()
      .where({ id });
  }

  findUserByUsernamePasswd(username, password, ctx = {}) {
    const { User } = this.server.models();

    const user = User.query(ctx.trx)
      .select()
      .where({ username, password });
    return user;
  }
};
