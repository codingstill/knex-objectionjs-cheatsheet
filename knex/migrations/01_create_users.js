exports.up = function(knex) {
    
    return knex.schema.createTable('users', (t) => {
        t.increments();
        t.string('full_name').notNullable();
        t.string('email').notNullable();
        t.integer('last_login').nullable();
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('users');
}
