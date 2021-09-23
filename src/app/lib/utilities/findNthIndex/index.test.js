import findNthIndex from '.';

const buildArray = length =>
  Array(length)
    .fill()
    .map(() => true);

describe('findNthIndex', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each`
    n         | predicate  | array             | expected | expectError
    ${-1}     | ${Boolean} | ${[false]}        | ${-1}    | ${true}
    ${0}      | ${Boolean} | ${[false]}        | ${-1}    | ${true}
    ${1}      | ${Boolean} | ${[false]}        | ${-1}    | ${false}
    ${1}      | ${Boolean} | ${[true]}         | ${0}     | ${false}
    ${'junk'} | ${Boolean} | ${[true]}         | ${-1}    | ${true}
    ${1}      | ${'junk'}  | ${[true]}         | ${-1}    | ${true}
    ${1}      | ${Boolean} | ${'junk'}         | ${-1}    | ${true}
    ${1}      | ${Boolean} | ${[false, false]} | ${-1}    | ${false}
    ${1}      | ${Boolean} | ${[true, false]}  | ${0}     | ${false}
    ${1}      | ${Boolean} | ${[false, true]}  | ${1}     | ${false}
    ${2}      | ${Boolean} | ${[true, true]}   | ${1}     | ${false}
    ${10}     | ${Boolean} | ${buildArray(10)} | ${9}     | ${false}
    ${11}     | ${Boolean} | ${buildArray(10)} | ${-1}    | ${false}
  `(
    'when passed $n, $predicate, $array, should return $expected',
    ({ n, predicate, array, expected, expectError }) => {
      expect(findNthIndex(n, predicate, array)).toBe(expected);

      if (expectError) {
        expect(global.console.error).toHaveBeenCalled();
      } else {
        expect(global.console.error).not.toHaveBeenCalled();
      }
    },
  );
});
