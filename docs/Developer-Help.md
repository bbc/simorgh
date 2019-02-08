# Developer help

This is a wiki for helping developers working in this application. It has detailed explanations of the application and known gotchas. 

## Code execution overview

Webpack creates two bundles, the first being `server` that has an entrypoint of `/src/index.js` and the second being `client` which has an entry point of `/src/client.js`

The entry points to the application in terms of code execution are as follows: 
- `npm run build:ci` executes the webpack configs
- `webpack.config.js` is executed and then executes both `webpack.config.client.js` and `webpack.config.server.js`
- `webpack.config.client.js` then executes `src/client.js` 
- `webpack.config.server.js` then executes `src/index.js` 
- `src/index.js` then executes `src/server/index.jsx`

## `.env` is showing in my `git status`

The `.env` file should not be commited as it is often overwritten by the values in `envConfig/` at build time. There is a `postshrinkwrap` command which runs after an `npm install` so should be run during setup of the application. 

If the `.env` file is appearing in your `git status` it means it is now longer being assumed as unchanged, to fix this run:
```
git update-index --assume-unchanged .env
```