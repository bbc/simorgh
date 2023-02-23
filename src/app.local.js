const server = require('./startServer');

const port = 7080;

server.applicationInstanceServerless().listen(port);
console.info(`listening on http://localhost:${port}`);
