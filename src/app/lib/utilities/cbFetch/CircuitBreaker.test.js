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

  it('should work', async () => {
    const url = 'example.com';
    circuitBreaker.recordFailure(url);
    const failureKey = `${url}-GET`;
    let failure = circuitBreaker.failures[failureKey];
    expect(Object.keys(circuitBreaker.failures)).toHaveLength(1);
    expect(failure.count).toEqual(1);

    const anotherUrl = 'another.com';
    circuitBreaker.recordFailure(anotherUrl);
    failure = circuitBreaker.failures[`${anotherUrl}-GET`];
    expect(Object.keys(circuitBreaker.failures)).toHaveLength(2);
    expect(failure.count).toEqual(1);

    expect(circuitBreaker.canMakeRequest(url)).toBe(true);

    circuitBreaker.recordFailure(url);
    expect(circuitBreaker.canMakeRequest(url)).toBe(true);

    circuitBreaker.recordFailure(url);
    expect(circuitBreaker.canMakeRequest(url)).toBe(true);

    failure = circuitBreaker.failures[failureKey];
    expect(failure.count).toEqual(3);

    circuitBreaker.recordFailure(url);

    failure = circuitBreaker.failures[failureKey];
    expect(failure.count).toEqual(4);

    expect(circuitBreaker.canMakeRequest(url)).toBe(false);

    await new Promise(resolve =>
      setTimeout(resolve, Math.ceil(circuitBreaker.timeout / 2)),
    );
    expect(circuitBreaker.canMakeRequest(url)).toBe(false);

    await new Promise(resolve => setTimeout(resolve, circuitBreaker.timeout));
    expect(circuitBreaker.canMakeRequest(url)).toBe(true);

    circuitBreaker.reset(url);

    expect(Object.keys(circuitBreaker.failures)).toHaveLength(1);
    expect(circuitBreaker.failures).not.toHaveProperty(failureKey);
  });
});
