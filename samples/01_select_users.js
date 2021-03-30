const User = require('../models/User');

const run = async () => {

    let dbResult;
    
    dbResult = await User.query().where('id', 1);
    console.log('select all columns', dbResult);

    dbResult = await User.query().select(['id', 'full_name']).where('id', 1);
    console.log('select specific columns', dbResult);

    dbResult = await User.query().where('id', 1);
    console.log('User\'s derived property', dbResult[0].firstName);
}

module.exports = {
    run
};
