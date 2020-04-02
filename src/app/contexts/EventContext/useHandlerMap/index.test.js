import useHandlerMap from './index';

describe('useHandlerMap', () => {
  let fn1;
  let fn2;
  let fn3;
  let invoke;

  beforeEach(() => {
    fn1 = jest.fn();
    fn2 = jest.fn();
    fn3 = jest.fn();

    invoke = useHandlerMap({
      a: [fn1],
      b: [fn2],
      c: [fn3],
    });
  });

  it('should call none', () => {
    invoke({});
    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();
    expect(fn3).not.toHaveBeenCalled();
  });

  it('should call fn1', () => {
    invoke({
      target: {
        matches: (attr) => attr === 'a',
      },
    });
    expect(fn1).toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();
    expect(fn3).not.toHaveBeenCalled();
  });

  it('should call fn1 and fn2', () => {
    invoke({
      target: {
        matches: (attr) => attr === 'a' || attr === 'b',
      },
    });
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(fn3).not.toHaveBeenCalled();
  });

  it('should call fn3', () => {
    invoke({
      target: {
        matches: (attr) => attr === 'c',
      },
    });
    expect(fn3).toHaveBeenCalled();
    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();
  });
});
