const { Model } = require('objection');
const Knex = require('knex');

const config = {
    client: 'sqlite3',
    connection: {
        filename:':memory:'
    },
    migrations: {
        directory: './knex/migrations',
        tableName: 'knex_migrations'
    },
    seeds: {
        directory: './knex/seeds'
    },
    debug: false,
    useNullAsDefault: true
};

const get = () => {
    const knex = Knex(config);
    Model.knex(knex);
    return knex;
}

module.exports = get;
