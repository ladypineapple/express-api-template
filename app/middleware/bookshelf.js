'use strict';

const config = require('../../knexfile.js');
const env = 'development';
const knex = require('knex')(config[env]);

const Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('virtuals');
Bookshelf.plugin('registry');

module.exports = Bookshelf;
