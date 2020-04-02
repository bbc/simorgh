import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);
const NS_PER_SEC = 1e9;

/*
 * Logs express route response time in nanoseconds
 */
const logResponseTime = (req, res, next) => {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    logger.info(
      `ResponseTime: ${
        elapsedHrTime[0] * NS_PER_SEC + elapsedHrTime[1]
      }, Path: ${req.path}`,
    );
  });

  next();
};

export default logResponseTime;
