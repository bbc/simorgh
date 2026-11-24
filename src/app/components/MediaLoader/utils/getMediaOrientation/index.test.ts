import getMediaOrientation from '.';

describe('getMediaOrientation', () => {
  it.each`
    mediaBlockVersionConfig | expectedOrientationCofig
    ${['Portrait']}         | ${'portrait'}
    ${['Landscape']}        | ${'landscape'}
    ${['PORTRAIT']}         | ${'portrait'}
    ${['LANDSCAPE']}        | ${'landscape'}
    ${['portrait']}         | ${'portrait'}
    ${['landscape']}        | ${'landscape'}
    ${['']}                 | ${'landscape'}
    ${[]}                   | ${'landscape'}
    ${undefined}            | ${'landscape'}
  `(
    'should return the correct clip orientation setting',
    ({ mediaBlockVersionConfig, expectedOrientationCofig }) => {
      expect(getMediaOrientation(mediaBlockVersionConfig)).toEqual(
        expectedOrientationCofig,
      );
    },
  );
});
