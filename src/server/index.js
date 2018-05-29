import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from '../app/routes';

/* eslint-disable import/no-dynamic-require */
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/status', (req, res) => {
    res.sendStatus(200);
  })
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
