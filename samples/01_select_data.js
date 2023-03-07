const User = require('../models/User');
const lib = require('../lib');

const run = async () => {

    let dbResult;

    dbResult = await User.query().where('id', 1);
    lib.print(1, 'Select all rows', dbResult);

    dbResult = await User.query().select(['id', 'full_name']).where('id', 1);
    lib.print(2, 'Select all rows with specific columns', dbResult);

    dbResult = await User.query().where('id', 1);
    lib.print(3, 'Object\'s derived property', dbResult[0].firstName);

    dbResult = await User.query().findById(1);
    lib.print(4, 'Find by id', dbResult);

    dbResult = await User.query().count('*');
    lib.print(4, 'Select count(*)', dbResult[0]['count(*)']);

    dbResult = await User.query().resultSize();
    lib.print(4, 'Select count(*) with resultSize()', dbResult);

};

module.exports = {
    run
};
