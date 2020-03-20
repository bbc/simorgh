import processUnavailableMedia, {
  unavailableMediaBlock,
  addUnavailableMediaBlock,
} from '.';

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
              type: 'external_vpid',
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
      },
      content: { model: { blocks: [] } },
    };
    const expectedPageData = {
      metadata: {
        blockTypes: ['paragraph', 'heading'],
      },
      content: { model: { blocks: [unavailableMediaBlock] } },
    };
    const receivedPageData = processUnavailableMedia(pageData);
    expect(receivedPageData).toEqual(expectedPageData);
  });

  it('runs addUnavailableMediaBlock when there is an external_vpid in the content blocks', () => {
    const pageData = {
      metadata: {
        blockTypes: ['external_vpid', 'paragraph', 'heading'],
      },
      content: { model: { blocks: [] } },
    };
    const expectedPageData = {
      metadata: {
        blockTypes: ['external_vpid', 'paragraph', 'heading'],
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
});
