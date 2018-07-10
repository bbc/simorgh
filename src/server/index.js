import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from '../app/routes';
import Document from '../app/components/Document';

export function getPublicDirectory() {
  return process.env.NODE_ENV === 'production'
    ? process.env.RAZZLE_PUBLIC_DIR
    : process.env.RAZZLE_PUBLIC_DIR_DEV;
}
/*
  Safely imports the assets manifest file in any edge-case that the 'RAZZLE_ASSETS_MANIFEST' does not exist.
  Enables unit testing of this file.
*/
let assets;
try {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require, global-require
} catch (error) {
  assets = {};
}

const publicDirectory = getPublicDirectory();

const server = express();
server
  .disable('x-powered-by')
  .use('/data', express.static('data'))
  .use(express.static(publicDirectory))
  .get('/status', (req, res) => {
    res.sendStatus(200);
  })
  .get('/*', async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
        document: Document,
        assets,
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
