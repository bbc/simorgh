import encodeChunkFilename from '.';

const unEncodedChunkUrl =
  'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public/static/js/shared-RSlYz48+9sgL1NthbdLLP655b20=-253ae210.e250b270.js';

// Example of encoding just the filename
const correctlyEncodedChunkUrl =
  'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public/static/js/shared-RSlYz48%2B9sgL1NthbdLLP655b20%3D-253ae210.e250b270.js';

// Example of encoding the entire url
const incorrectlyEncodedChunkUrl =
  'https%3A%2F%2Fstatic.test.files.bbci.co.uk%2Fws%2Fsimorgh-assets%2Fpublic%2Fstatic%2Fjs%2Fshared-RSlYz48%2B9sgL1NthbdLLP655b20%3D-253ae210.e250b270.js';

const chunk = {
  url: unEncodedChunkUrl,
};

describe('encodeChunkFilename', () => {
  it('should return correctly encode chunk url', () => {
    expect(encodeChunkFilename(chunk)).toEqual(correctlyEncodedChunkUrl);
  });

  it('should not encode the entire url', () => {
    expect(encodeChunkFilename(chunk)).not.toEqual(incorrectlyEncodedChunkUrl);
  });
});
