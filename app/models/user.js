'use strict';

const bcrypt = require('bcrypt');
const Bookshelf = require('../middleware/bookshelf');

const User = Bookshelf.Model.extend({
  tableName: 'users',

  constructor () {
    Bookshelf.Model.apply(this, arguments);

    this.on('saving', function (model, attrs, options, next) {
      let _this = this;

      if (!_this._password) {
        return next();
      }

      return new Promise((resolve, reject) =>
        bcrypt.genSalt(null, (err, salt) =>
            err ? reject(err) : resolve(salt))
      ).then((salt) =>
        new Promise((resolve, reject) =>
          bcrypt.hash(_this._password, salt, (err, data) =>
            err ? reject(err) : resolve(data)))
      ).then((digest) => {
        _this.set({ passwordDigest: digest });
      }).catch((error) => {
        next(error);
      });
    });
  },

  comparePassword (password) {
    let _this = this;

    return new Promise((resolve, reject) =>
      bcrypt.compare(password, _this.attributes.passwordDigest, (err, data) =>
          err ? reject(err) : data ? resolve(data) : reject(new Error('Not Authorized')))
      ).then(() => _this);
  },

  virtuals: {
    password: {
      set (password) {
        this._password = password;
      },

      get () {
        return this._password;
      },
    },
  },
});

module.exports = Bookshelf.model('User', User);
