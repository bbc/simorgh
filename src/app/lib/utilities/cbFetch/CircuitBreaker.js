import { omit } from 'ramda';

function getKey(url, { method = 'GET' } = {}) {
  return `${url}-${method}`;
}

export default class CircuitBreaker {
  constructor({ threshold = 3, timeout = 500 } = {}) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failures = {};
    this.maxTimeout = 60 * 1000 * 3;
  }

  reset(url, options) {
    this.failures = omit([getKey(url, options)], this.failures);
  }

  canMakeRequest(url, options) {
    const key = getKey(url, options);

    const exists = this.failures[key];
    if (!exists) {
      return true;
    }

    const { expiry } = exists;
    if (Date.now() > expiry) {
      return true;
    }

    // Can make request if expiry time difference is more than max timeout.
    // This to account for time updating on client.
    const difference = Math.abs(Date.now() - expiry);
    if (difference > this.maxTimeout) {
      return true;
    }

    return false;
  }

  recordFailure(url, options) {
    const key = getKey(url, options);
    const exists = this.failures[key];
    const now = Date.now();

    if (exists && exists.count > this.threshold) {
      const timeout = exists.count * this.timeout;
      this.failures[key] = {
        count: exists.count + 1,
        expiry: now + (timeout > this.maxTimeout ? this.maxTimeout : timeout),
      };
    } else if (exists && exists.count <= this.threshold) {
      this.failures[key] = {
        count: exists.count + 1,
        expiry: now,
      };
    } else {
      this.failures[key] = {
        count: 1,
        expiry: now,
      };
    }
  }
}
