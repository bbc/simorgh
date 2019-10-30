import CircuitBreaker from './CircuitBreaker';

describe('CircuitBreaker', () => {
  let circuitBreaker;

  beforeEach(() => {
    circuitBreaker = new CircuitBreaker();
  });

  it('should setup new CircuitBreaker', () => {
    expect(circuitBreaker.threshold).toEqual(3);
    expect(circuitBreaker.timeout).toEqual(500);
    expect(circuitBreaker.failures).toEqual({});
    expect(circuitBreaker.maxTimeout).toEqual(60 * 1000 * 3);
  });

  it('should work', () => {
    const url = 'example.com';
    circuitBreaker.recordFailure(url);
    let failure = circuitBreaker.failures[`${url}-GET`];
    expect(Object.keys(circuitBreaker.failures)).toHaveLength(1);
    expect(failure.count).toEqual(1);

    const anotherUrl = 'another.com';
    circuitBreaker.recordFailure(anotherUrl);
    failure = circuitBreaker.failures[`${anotherUrl}-GET`];
    expect(Object.keys(circuitBreaker.failures)).toHaveLength(2);
    expect(failure.count).toEqual(1);
  });
});
