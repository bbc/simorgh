import encodeChunkFilename from '.';

const unEncodedChunkUrl =
  'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public/static/js/shared-RSlYz48+9sgL1NthbdLLP655b20=-253ae210.e250b270.js';

const correctlyEncodedChunkUrl =
  'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public/static/js/shared-RSlYz48%2B9sgL1NthbdLLP655b20%3D-253ae210.e250b270.js';

const chunkObject = {
  url: unEncodedChunkUrl,
};
describe('encodeChunkFilename', () => {
  it('should return correctly encode chunk url', () => {
    expect(encodeChunkFilename(chunkObject)).toEqual(correctlyEncodedChunkUrl);
  });
});
