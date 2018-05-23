import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from '../app/routes';

const assetPath = process.env.RAZZLE_ASSETS_MANIFEST || '../../build/assets.json';
const staticPath = process.env.RAZZLE_PUBLIC_DIR || '../../build/public';

const assets = require(assetPath); /* eslint-disable-line import/no-dynamic-require max-len */

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(staticPath))
  .get('/*', async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
