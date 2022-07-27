import loggerMock from '#testHelpers/loggerMock';
import { MEDIA_MISSING_FIELD } from '#lib/logger.const';
import logMissingMediaId from '.';

const url = 'persian/afghanistan/2013/04/130429_l42_vid_afgh_corruption';
const assetType = 'legacy';
const missingField = 'blockId';

describe('logMissingMediaId', () => {
  it('should log warn message for missing blockId', async () => {
    logMissingMediaId({ url, assetType });
    expect(loggerMock.warn).toHaveBeenLastCalledWith(MEDIA_MISSING_FIELD, {
      url,
      assetType,
      missingField,
    });
  });
});
