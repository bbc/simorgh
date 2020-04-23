import loggerMock from '#testHelpers/loggerMock';
import processUnavailableMedia, {
  unavailableMediaBlock,
  addUnavailableMediaBlock,
  EXTERNAL_VPID,
} from '.';
import {
  MEDIA_ASSET_REVOKED,
  MEDIA_METADATA_UNAVAILABLE,
  MEDIA_ASSET_EXPIRED,
  NO_MEDIA_BLOCK,
} from '#lib/logger.const';

describe('processUnavailableMedia', () => {
  const expectedProcessedData = {
    content: {
      model: {
        blocks: [
          unavailableMediaBlock,
          {
            type: 'paragraph',
          },
          {
            type: 'paragraph',
          },
        ],
      },
    },
  };

  it('filters external_vpid from the rendered blocks', () => {
    const pageData = {
      content: {
        model: {
          blocks: [
            {
              type: EXTERNAL_VPID,
            },
            {
              type: 'paragraph',
            },
            {
              type: 'paragraph',
            },
          ],
        },
      },
    };
    const receivedPageData = addUnavailableMediaBlock(pageData);
    expect(receivedPageData).toEqual(expectedProcessedData);
  });

  it('adds an unavailableMedia block when addUnavailableMediaBlock is run', () => {
    const pageData = {
      content: {
        model: {
          blocks: [
            {
              type: 'paragraph',
            },
            {
              type: 'paragraph',
            },
          ],
        },
      },
    };
    const receivedPageData = addUnavailableMediaBlock(pageData);
    expect(receivedPageData).toEqual(expectedProcessedData);
  });

  it('runs addUnavailableMediaBlock when there is no media block', () => {
    const pageData = {
      metadata: {
        blockTypes: ['paragraph', 'heading'],
        locators: { assetUri: 'mock-uri' },
      },
      content: { model: { blocks: [] } },
    };
    const expectedPageData = {
      metadata: {
        blockTypes: ['paragraph', 'heading'],
        locators: { assetUri: 'mock-uri' },
      },
      content: { model: { blocks: [unavailableMediaBlock] } },
    };
    const receivedPageData = processUnavailableMedia(pageData);
    expect(receivedPageData).toEqual(expectedPageData);
    expect(loggerMock.warn).toHaveBeenCalledWith(NO_MEDIA_BLOCK, {
      url: 'mock-uri',
    });
  });

  it('runs addUnavailableMediaBlock when there is an external_vpid in the content blocks', () => {
    const pageData = {
      metadata: {
        blockTypes: [EXTERNAL_VPID, 'paragraph', 'heading'],
      },
      content: { model: { blocks: [] } },
    };
    const expectedPageData = {
      metadata: {
        blockTypes: [EXTERNAL_VPID, 'paragraph', 'heading'],
      },
      content: { model: { blocks: [unavailableMediaBlock] } },
    };
    const receivedPageData = processUnavailableMedia(pageData);
    expect(receivedPageData).toEqual(expectedPageData);
  });

  it('does not run addUnavailableMediaBlock when there is a media type in the content blocks', () => {
    const pageData = {
      metadata: {
        blockTypes: ['media', 'paragraph', 'heading'],
      },
      content: { model: { blocks: [] } },
    };
    const receivedPageData = processUnavailableMedia(pageData);
    expect(receivedPageData).toEqual(pageData);
  });

  it('logs the right code when the media asset is revoked', async () => {
    const pageData = {
      metadata: {
        blockTypes: [EXTERNAL_VPID, 'paragraph', 'heading'],
      },
      content: {
        model: { blocks: [{ statusCode: 404, type: EXTERNAL_VPID }] },
      },
    };
    processUnavailableMedia(pageData);
    expect(loggerMock.warn).toHaveBeenCalledWith(MEDIA_ASSET_REVOKED);
  });

  it('logs the right code when the media asset has expired', async () => {
    const pageData = {
      metadata: {
        blockTypes: [EXTERNAL_VPID, 'paragraph', 'heading'],
      },
      content: {
        model: { blocks: [{ statusCode: 410, type: EXTERNAL_VPID }] },
      },
    };
    processUnavailableMedia(pageData);
    expect(loggerMock.warn).toHaveBeenCalledWith(MEDIA_ASSET_EXPIRED);
  });

  it('logs the right code when the media metadata is unavailable', async () => {
    const pageData = {
      metadata: {
        blockTypes: [EXTERNAL_VPID, 'paragraph', 'heading'],
      },
      content: {
        model: { blocks: [{ type: EXTERNAL_VPID }] },
      },
    };
    processUnavailableMedia(pageData);
    expect(loggerMock.error).toHaveBeenCalledWith(MEDIA_METADATA_UNAVAILABLE);
  });
});
