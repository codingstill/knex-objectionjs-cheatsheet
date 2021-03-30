const { Model, snakeCaseMappers } = require('objection')

class User extends Model {

    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return ['id'];
    }

    static get columnNameMappers() {
        return snakeCaseMappers({ upperCase: true });
    }

    static get virtualAttributes() {
        return ['firstName'];
    }

    get firstName() {
        return this.fullName.split(' ')[0];
    }

    static get jsonSchema () {
        return {
            type: 'object',
            required: [ 'id', 'full_name' ],

            properties: {
                id: {type: 'integer'},
                full_name: {type: 'string'},
                email: {type: 'string'},
                last_login: {type: ['integer', 'null'], format: 'date-time'}
            }
        };
    }

    static get relationMappings() {
        return {
            user_orders: {
                relation: Model.HasManyRelation,
                modelClass: Order,
                join: {
                    from: 'users.id',
                    to : 'orders.user_id'
                }
            }
        };
    }
    
    $set(obj) { 
        super.$set(obj);

        for (const column in this.constructor.jsonSchema.properties) {
            const cp = this.constructor.jsonSchema.properties[column];

            if(cp.format === 'date-time' && typeof this[key] === 'number') {
                this[key] = new Date(this[key]).toISOString()
            }
        }
    }

};

module.exports = User;