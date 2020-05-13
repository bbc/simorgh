import nodeLogger from '#lib/logger.node';
import { SERVER_RESPONSE_TIME } from '#lib/logger.const';

const logger = nodeLogger(__filename);
const NS_PER_SEC = 1e9;

/*
 * Logs express route response time in nanoseconds
 */
const logResponseTime = (req, res, next) => {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    logger.info(SERVER_RESPONSE_TIME, {
      path: req.path,
      nanoseconds: elapsedHrTime[0] * NS_PER_SEC + elapsedHrTime[1],
    });
  });

  next();
};

export default logResponseTime;
