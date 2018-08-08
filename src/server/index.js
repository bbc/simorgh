import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from '../app/routes';
import Document from '../app/containers/Document';

const getPublicDirectory = () =>
  process.env.NODE_ENV === 'production'
    ? process.env.RAZZLE_PUBLIC_DIR
    : process.env.RAZZLE_PUBLIC_DIR_DEV;

/*
  Safely imports the assets manifest file in any edge-case that the 'RAZZLE_ASSETS_MANIFEST' does not exist.
  Enables unit testing of this file.
*/
let assets = [];
try {
  const assetManifest = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require, global-require

  assets = Object.keys(assetManifest).map(key => assetManifest[key].js);
} catch (error) {
  console.log(
    `Error parsing assets manifest. RAZZLE_ASSETS_MANIFEST = ${
      process.env.RAZZLE_ASSETS_MANIFEST
    }`,
  );
}

const publicDirectory = getPublicDirectory();
const dataFolderToRender =
  process.env.NODE_ENV === 'production' ? 'data/prod' : 'data';

const server = express();
server
  .disable('x-powered-by')
  .use('/data', express.static(dataFolderToRender))
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
