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
        timeout: 500,
        resetTimeout: 3000,
      };
      circuitBreakers[host] = new CircuitBreaker(fetch, circuitBreakerOptions);
      circuitBreaker = circuitBreakers[host];
    }

    return circuitBreaker.fire(url, options);
  };
}

export default createFetchCircuitBreaker();
