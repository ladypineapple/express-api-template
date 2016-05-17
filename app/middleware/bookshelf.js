'use strict';

const config = require('../../knexfile.js');
const env = 'development';
const knex = require('knex')(config[env]);
// console.log(knex.client.config);
const db = require('bookshelf')(knex);

module.exports = db;
