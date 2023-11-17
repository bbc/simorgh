import nodeLogger from '#lib/logger.node';
import {
  SERVER_RESPONSE_TIME,
  SLOW_SERVER_RESPONSE_TIME,
} from '#lib/logger.const';

const logger = nodeLogger(__filename);
const NS_PER_SEC = 1e9;

const THREE_SECONDS_IN_NANOSECONDS = 3 * NS_PER_SEC;

/*
 * Logs express route response time in nanoseconds
 */
const logResponseTime = (req, res, next) => {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);

    const nanoseconds = elapsedHrTime[0] * NS_PER_SEC + elapsedHrTime[1];

    let responseTimeLogger = logger.debug;
    let LOG_EVENT = SERVER_RESPONSE_TIME;

    if (nanoseconds > THREE_SECONDS_IN_NANOSECONDS) {
      responseTimeLogger = logger.warn;
      LOG_EVENT = SLOW_SERVER_RESPONSE_TIME;
    }

    responseTimeLogger(LOG_EVENT, {
      path: req.path,
      nanoseconds,
    });
  });

  next();
};

export default logResponseTime;
