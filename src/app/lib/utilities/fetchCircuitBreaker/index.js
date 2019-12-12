import 'isomorphic-fetch';
import CircuitBreaker from 'opossum';

export function createFetchCircuitBreaker() {
  const circuitBreakers = {};

  return (url, options) => {
    const { host } = new URL(url);
    let circuitBreaker = circuitBreakers[host];

    if (!circuitBreaker) {
      const circuitBreakerOptions = {
        name: host,
        timeout: 5000,
        resetTimeout: 10000,
      };
      circuitBreakers[host] = new CircuitBreaker(fetch, circuitBreakerOptions);
      circuitBreaker = circuitBreakers[host];
    }

    return !options
      ? circuitBreaker.fire(url)
      : circuitBreaker.fire(url, options);
  };
}

export default createFetchCircuitBreaker();
