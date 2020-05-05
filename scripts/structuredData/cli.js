const { run } = require('.');

const showInfo = process.argv[2] && process.argv[2] === '-i';
run(showInfo);
