import 'isomorphic-fetch';
import { omit } from 'ramda';

class CircuitBreaker {
  constructor({ threshold = 3, timeout = 500 }) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failures = {};
    this.maxTimeout = 60 * 1000 * 3;
  }

  static getKey(url, { method = 'GET' }) {
    return `${url}-${method}`;
  }

  reset(url, options) {
    this.failures = omit([CircuitBreaker.getKey(url, options)], this.failures);
  }

  canMakeRequest(url, options) {
    const key = CircuitBreaker.getKey(url, options);

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
    const key = CircuitBreaker.getKey(url, options);
    const exists = this.failures[key];

    if (exists && exists.count > this.threshold) {
      const timeout = exists.count * this.timeout;
      this.failures[key] = {
        count: exists.count + 1,
        expiry:
          Date.now() + (timeout > this.maxTimeout ? this.maxTimeout : timeout),
      };
    } else if (exists && exists.count <= this.threshold) {
      this.failures[key] = {
        count: exists.count + 1,
        expiry: Date.now(),
      };
    } else {
      this.failures[key] = {
        count: 1,
        expiry: Date.now(),
      };
    }
  }
}

export function createFetchWithCircuitBreaker(threshold = 3, timeout = 500) {
  const circuitBreaker = new CircuitBreaker({ threshold, timeout });

  return async (url, options = {}) => {
    console.log('circuit breaker', circuitBreaker);
    if (!circuitBreaker.canMakeRequest(url, options)) {
      // TODO: What do we do when the circuit is closed?
      throw new Error('Client side rate limiting applied.');
    }

    try {
      const response = await fetch(url, options);
      // TODO: by default fetch doesn't throw for 4XX and 5XX responses.
      // We can also record failure here.
      circuitBreaker.reset(url, options);
      return response;
    } catch (e) {
      circuitBreaker.recordFailure(url, options);
      throw e;
    }
  };
}

export default createFetchWithCircuitBreaker();
