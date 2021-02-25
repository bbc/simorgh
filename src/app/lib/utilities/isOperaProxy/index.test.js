import { setWindowValue, resetWindowValue } from '@bbc/psammead-test-helpers';
import isOperaProxy from '.';

const originalWindowOperaMini = window.OperaMini;

describe('isOperaProxy', () => {
  afterEach(() => {
    resetWindowValue('operamini', originalWindowOperaMini);
  });

  it('returns false when not invoked by the opera mini proxy', () => {
    setWindowValue('operamini', null);

    expect(isOperaProxy()).not.toBeTruthy();
  });

  it('returns true when invoked by the opera mini proxy', () => {
    class Opera {
      // eslint-disable-next-line class-methods-use-this
      get [Symbol.toStringTag]() {
        return 'OperaMini';
      }
    }

    setWindowValue('operamini', new Opera());

    expect(isOperaProxy()).not.toBeTruthy();
  });
});
