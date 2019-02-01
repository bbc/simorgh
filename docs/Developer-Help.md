# Developer help

This is a wiki for helping developers working in this application. It has detailed explanations of the application an known gotchas. 

## Code execution overview

Webpack bundles the `src/` code into `build/server.js` which is what is actually executed via `npm run start`. The following describes the code execution order prior to webpack bundling the `src/` code. 

The entry points to the application in terms of code execution are as follows: 
- `npm run build` executes the webpack configs
- `webpack.config.js` is executed and then executes both `webpack.config.client.js` and `webpack.config.server.js`
- `webpack.config.client.js` then executes `src/client.js` 
- `webpack.config.server.js` then executes `src/index.js` 
- `src/index.js` then executes `src/server/index.jsx`