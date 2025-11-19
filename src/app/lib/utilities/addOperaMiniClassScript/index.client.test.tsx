/* eslint-disable no-underscore-dangle */
/* eslint-disable no-eval */
import addOperaMiniClassScript from '.';

const classListAddSpy = jest.spyOn(document.documentElement.classList, 'add');

describe('addOperaMiniClassScript', () => {
  beforeEach(() => {
    classListAddSpy.mockClear();
  });

  class OperaMiniMock {
    // eslint-disable-next-line class-methods-use-this
    get [Symbol.toStringTag]() {
      return 'OperaMini';
    }
  }

  describe('when browser is Opera Mini', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'operamini', {
        writable: true,
        value: new OperaMiniMock(),
      });
    });

    it('should add is-opera-mini class to documentElement', () => {
      eval(addOperaMiniClassScript().props.dangerouslySetInnerHTML.__html);

      expect(classListAddSpy).toHaveBeenCalledWith('is-opera-mini');
    });
  });

  describe('when browser is not Opera Mini', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'operamini', {
        writable: true,
        value: undefined,
      });
    });

    it('should not add is-opera-mini class to documentElement', () => {
      eval(addOperaMiniClassScript().props.dangerouslySetInnerHTML.__html);

      expect(classListAddSpy).not.toHaveBeenCalledWith('is-opera-mini');
    });
  });
});
