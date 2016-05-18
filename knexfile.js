'use strict';

const config = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_NAME,
      charset: 'utf8'
    }
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

module.exports = config;
