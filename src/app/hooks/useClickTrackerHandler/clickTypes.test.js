import { isValidClick } from './clickTypes';

const { navigator } = window;

beforeAll(() => {
  delete window.navigator;
  window.navigator = {};
});

afterAll(() => {
  window.navigator = navigator;
});

describe('Click Types', () => {
  it(`should allow unmodified left and middle clicks`, () => {
    const leftClick = new MouseEvent('click', { button: 0 });
    const middleClick = new MouseEvent('click', { button: 1 });
    const middleClickIE = new MouseEvent('click', { button: 4 });

    expect(isValidClick(leftClick)).toBe(true);
    expect(isValidClick(middleClick)).toBe(true);
    expect(isValidClick(middleClickIE)).toBe(true);
  });

  it.each`
    platform     | functionKey | shiftKey | altKey   | expected
    ${'Windows'} | ${false}    | ${false} | ${true}  | ${false}
    ${'Windows'} | ${false}    | ${true}  | ${false} | ${true}
    ${'Windows'} | ${false}    | ${true}  | ${true}  | ${true}
    ${'Windows'} | ${true}     | ${false} | ${false} | ${true}
    ${'Windows'} | ${true}     | ${false} | ${true}  | ${true}
    ${'Windows'} | ${true}     | ${true}  | ${false} | ${true}
    ${'Windows'} | ${true}     | ${true}  | ${true}  | ${true}
    ${'Mac'}     | ${false}    | ${false} | ${true}  | ${false}
    ${'Mac'}     | ${false}    | ${true}  | ${false} | ${true}
    ${'Mac'}     | ${false}    | ${true}  | ${true}  | ${true}
    ${'Mac'}     | ${true}     | ${false} | ${false} | ${true}
    ${'Mac'}     | ${true}     | ${false} | ${true}  | ${true}
    ${'Mac'}     | ${true}     | ${true}  | ${false} | ${true}
    ${'Mac'}     | ${true}     | ${true}  | ${true}  | ${true}
  `(
    'should return correct boolean value depending on whether a click is valid or not',
    ({ platform, functionKey, shiftKey, altKey, expected }) => {
      window.navigator.platform = platform;

      const event = new MouseEvent('click', {
        button: 0,
        [platform === 'Mac' ? 'metaKey' : 'ctrlKey']: functionKey,
        shiftKey,
        altKey,
      });
      expect(isValidClick(event)).toBe(expected);
    },
  );
});
