const fs = require('fs');

const getKnex = require('./knexfile');

const init = async () => {

    const stepIndex = parseInt(process.argv[3]);
    
    const samples = fs.readdirSync('./samples').sort((a, b) => {
        return parseInt(a.split('_')[0]) - parseInt(b.split('_')[0]);
    });
    if(samples[stepIndex - 1] === undefined) {
        console.log('Sample not found');
        return;
    }

    console.log('Running migrations and seeds');
    const knex = getKnex();
    await knex.migrate.latest();
    await knex.seed.run();

    console.log('Running sample', stepIndex);
    const sample = require('./samples/' + samples[stepIndex - 1]);

    await sample.run();
    
    await knex.migrate.rollback();
};

init().then(() => {
    process.exit(0);
}, (e) => {
    console.log('Error occurred', e);
    process.exit(0);
});
