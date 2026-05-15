import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const writeResponse = ({ res, statusCode, body }) => {
  res.statusCode = statusCode;
  res.end(body);
};

const requestHandler = (req, res) => {
  try {
    if (req.url === '/status') {
      writeResponse({ res, statusCode: 200, body: 'Ok' });
      return;
    }

    logger.warn('express_server_removed', {
      method: req.method,
      url: req.url,
      message: 'Express server has been removed from this project.',
    });

    writeResponse({
      res,
      statusCode: 503,
      body: 'Service unavailable: Express server has been removed.',
    });
  } catch (error) {
    logger.error('server_request_failed', { error });
    writeResponse({ res, statusCode: 500, body: 'Internal server error' });
  }
};

export default requestHandler;
