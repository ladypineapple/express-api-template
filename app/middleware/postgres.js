'use strict';

const knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING
});

const db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable( 'users', function ( user ) {
      user.string('email').unique();
      user.string('token');
      user.string('passwordDigest');
    }).then((table) => {
      console.log('user table created');
    }).catch(console.error);
  }
}).catch(console.error);

module.exports = db;
