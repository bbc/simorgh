import fixtureStreamDataWithFlourish from '../fixture/fixtureStreamDataWithFlourish';
import makeRequest from './makeRequest';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('uniqueId-1234' as string),
}));

describe('makeRequest', () => {
  it('should return formatted stream data for valid requests', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(fixtureStreamDataWithFlourish),
        }),
      ) as jest.Mock,
    );

    const result = await makeRequest('someID');
    const content = result.results[0].content.model.blocks[1].model;
    expect(content).toStrictEqual({
      oembed: {
        height: 575,
        html: '\n  <iframe \n    src="https://flo.uri.sh/story/3577809/embed"\n    frameborder="0"\n    scrolling="no"\n    height="575"\n    width="700"\n    style="width:100%;"\n    title="Interactive or visual content"></iframe>\n',
        iFrameId: 'flourish-id-uniqueId',
        iFrameSrc: 'https://flo.uri.sh/story/3577809/embed?auto=1',
        iFrameTitle: 'Interactive or visual content',
        oEmbedType: 'aresFlourish',
        provider_name: 'Flourish',
        provider_url: 'https://flourish.studio',
        sizeAdjustScript: `\n    window.addEventListener('message', function (event) {\n      var _message$src;\n      var message = typeof event.data === 'string' && JSON.parse(event.data);\n      if ((message === null || message === void 0 ? void 0 : message.sender) === 'Flourish' \n      && (message === null || message === void 0 ? void 0 : message.context) === 'iframe.resize' \n      && message !== null && message !== void 0 && (_message$src = message.src) !== null && _message$src !== void 0 && _message$src.includes('https://flo.uri.sh/story/3577809/embed?auto=1')) {\n        document.getElementById('flourish-id-uniqueId').style.height = message.height + 'px';\n      }\n    });`,
        source: 'https://public.flourish.studio/story/3577809',
        srcLink: 'https://flo.uri.sh/story/3577809/embed?auto=1',
        type: 'rich',
        url: 'https://public.flourish.studio/story/3577809',
        version: '1.0',
        width: 700,
      },
    });
  });

  it('should return null on 4XX responses', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          status: 404,
          json: () =>
            Promise.resolve({
              data: {
                results: [],
                page: null,
              },
            }),
        }),
      ) as jest.Mock,
    );

    const result = await makeRequest('someID');
    expect(result).toStrictEqual(null);
  });
});
