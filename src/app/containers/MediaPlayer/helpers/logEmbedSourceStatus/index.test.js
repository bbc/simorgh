import loggerMock from '#testHelpers/loggerMock';
import { MEDIA_PLAYER_RESPONSE } from '#lib/logger.const';
import logEmbedSourceStatus from '.';

const fetchResponse = { status: 200 };
const url = '/embed/source';

describe('logEmbedSourceStatus', () => {
  beforeEach(() => {
    fetch.mockImplementation(() => fetchResponse);
  });

  it('should log info level on 200', async () => {
    fetchResponse.status = 200;
    await logEmbedSourceStatus(url);
    expect(loggerMock.info).toHaveBeenLastCalledWith(MEDIA_PLAYER_RESPONSE, {
      url,
      status: 200,
    });
  });

  it('should log warn level on 4xx', async () => {
    fetchResponse.status = 400;
    await logEmbedSourceStatus(url);
    expect(loggerMock.warn).toHaveBeenLastCalledWith(MEDIA_PLAYER_RESPONSE, {
      url,
      status: 400,
    });
    fetchResponse.status = 404;
    await logEmbedSourceStatus(url);
    expect(loggerMock.warn).toHaveBeenLastCalledWith(MEDIA_PLAYER_RESPONSE, {
      url,
      status: 404,
    });
  });

  it('should log warn level on 5xx', async () => {
    fetchResponse.status = 500;
    await logEmbedSourceStatus(url);
    expect(loggerMock.warn).toHaveBeenLastCalledWith(MEDIA_PLAYER_RESPONSE, {
      url,
      status: 500,
    });
  });
});
