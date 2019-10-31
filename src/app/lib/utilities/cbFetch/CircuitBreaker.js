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
    const now = Date.now();

    const failure = this.failures[key];
    if (!failure) {
      return true;
    }

    const { updatedAt, count } = failure;

    if (count <= this.threshold) {
      return true;
    }

    const multiplier = count - this.threshold;
    let timeout = multiplier * this.timeout;
    timeout = timeout > this.maxTimeout ? this.maxTimeout : timeout;

    const expiry = updatedAt + timeout;
    if (now >= expiry) {
      return true;
    }

    // Can make request if expiry time difference is more than max timeout.
    // This to account for time updating on client.
    const difference = Math.abs(now - expiry);
    if (difference > this.maxTimeout) {
      return true;
    }

    return false;
  }

  recordFailure(url, options) {
    const key = getKey(url, options);
    const exists = this.failures[key];
    const updatedAt = Date.now();

    this.failures[key] = {
      count: !exists ? 1 : exists.count + 1,
      updatedAt,
    };
  }
}
