import 'isomorphic-fetch';
import CircuitBreaker from './CircuitBreaker';

export function createFetchWithCircuitBreakers() {
  return async (url, options = { method: 'GET' }) => {
    
  };
}

export function createFetchWithCircuitBreaker(threshold, timeout) {
  const circuitBreaker = new CircuitBreaker({ threshold, timeout });

  return async (url, options = {}) => {
    if (!circuitBreaker.canMakeRequest(url, options)) {
      throw new Error('Client side rate limiting applied.');
    }

    try {
      const response = await fetch(url, options);
      // TODO: by default fetch doesn't throw for 4XX and 5XX responses.
      // We can also record failure here in future.
      circuitBreaker.reset(url, options);
      return response;
    } catch (e) {
      circuitBreaker.recordFailure(url, options);
      throw e;
    }
  };
}

export default createFetchWithCircuitBreaker();
