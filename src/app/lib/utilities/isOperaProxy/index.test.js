import isOperaProxy from '.';

const originalWindowOperaMini = window.operamini;

describe('isOperaProxy', () => {
  afterEach(() => {
    window.operamini = originalWindowOperaMini;
  });

  it('returns false when not invoked by the opera mini proxy', () => {
    window.operamini = null;

    expect(isOperaProxy()).not.toBeTruthy();
  });

  it('returns true when invoked by the opera mini proxy', () => {
    class OperaMiniMock {
      // eslint-disable-next-line class-methods-use-this
      get [Symbol.toStringTag]() {
        return 'OperaMini';
      }
    }
    window.operamini = new OperaMiniMock();

    expect(isOperaProxy()).toBeTruthy();
  });
});
