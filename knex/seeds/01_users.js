const data = require('../data/data');

exports.seed = (knex) => {
    return knex('users').insert(data.users);
}
