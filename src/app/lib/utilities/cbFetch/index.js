import 'isomorphic-fetch';
import CircuitBreaker from './CircuitBreaker';

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
