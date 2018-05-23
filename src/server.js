import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from './routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); /* eslint-disable-line import/no-dynamic-require */

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
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
