import * as uuId from 'uuid';
import { OptimoBlock } from '#app/models/types/optimo';
import enrichVivoEmbed from '.';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('enrichVivoEmbed', () => {
  it.each([
    { id: 22523792, type: 'visualisation' },
    { id: 3577809, type: 'story' },
  ])(
    'should enrich a flourish $type embeds with the appropriate details',
    ({ id, type }) => {
      const sampleFlourishEmbed = {
        type: 'paragraph',
        model: {
          text: '',
          blocks: [
            {
              type: 'flourishEmbed',
              model: {
                locator: `urn:flourish:embed:${type}:${id}`,
                provider: 'flourish-visualisation',
                attributes: ['visualisation'],
              },
            },
          ],
        },
      } as OptimoBlock;

      jest.spyOn(uuId, 'v4').mockReturnValueOnce('uniqueId-1234' as string);

      const result = enrichVivoEmbed(sampleFlourishEmbed);
      expect(result).toStrictEqual({
        type: 'oEmbed',
        model: {
          oembed: {
            version: '1.0',
            provider_name: 'Flourish',
            provider_url: 'https://flourish.studio',
            html: `\n  <iframe \n    src="https://flo.uri.sh/${type}/${id}/embed"\n    frameborder="0"\n    scrolling="no"\n    height="575"\n    width="700"\n    style="width:100%;"\n    title="Interactive or visual content"></iframe>\n`,
            width: 700,
            height: 575,
            type: 'rich',
            source: `https://public.flourish.studio/${type}/${id}`,
            url: `https://public.flourish.studio/${type}/${id}`,
            srcLink: `https://flo.uri.sh/${type}/${id}/embed?auto=1`,
            oEmbedType: 'aresFlourish',
            iFrameSrc: `https://flo.uri.sh/${type}/${id}/embed?auto=1`,
            iFrameId: 'flourish-id-uniqueId',
            iFrameTitle: 'Interactive or visual content',
            sizeAdjustScript: `\n    window.addEventListener('message', function (event) {\n      var _message$src;\n      var message = typeof event.data === 'string' && JSON.parse(event.data);\n      if ((message === null || message === void 0 ? void 0 : message.sender) === 'Flourish' \n      && (message === null || message === void 0 ? void 0 : message.context) === 'iframe.resize' \n      && message !== null && message !== void 0 && (_message$src = message.src) !== null && _message$src !== void 0 && _message$src.includes('https://flo.uri.sh/${type}/${id}/embed?auto=1')) {\n        document.getElementById('flourish-id-uniqueId').style.height = message.height + 'px';\n      }\n    });`,
          },
        },
      });
    },
  );

  it('should enrich a riddle embed with the appropriate details', () => {
    const sampleRiddleEmbed = {
      type: 'paragraph',
      model: {
        text: '',
        blocks: [
          {
            type: 'riddleEmbed',
            model: {
              locator: 'urn:riddle:embed:asset:JmrmjKha',
              provider: 'riddle',
            },
          },
        ],
      },
    } as OptimoBlock;

    const result = enrichVivoEmbed(sampleRiddleEmbed);
    expect(result).toStrictEqual({
      type: 'oEmbed',
      model: {
        oembed: {
          version: '2.0',
          provider_name: 'riddle',
          provider_url: 'https://www.riddle.com',
          html: null,
          url: 'https://www.riddle.com/embed/a/JmrmjKha?lazyImages=false&staticHeight=false',
          type: 'rich',
          riddleId: 'JmrmjKha',
          oEmbedType: 'clientSideRiddle',
          iFrameTitle: 'Interactive or visual content',
        },
      },
    });
  });

  it('should not alter non-embed blocks', () => {
    const sampleParagraphBlock = {
      type: 'paragraph',
      model: {
        text: 'Text inside the post ',
        blocks: [
          {
            type: 'fragment',
            model: {
              text: 'Text inside the post ',
              attributes: [],
            },
          },
        ],
      },
    } as OptimoBlock;

    const result = enrichVivoEmbed(sampleParagraphBlock);
    expect(result).toStrictEqual(sampleParagraphBlock);
  });
});
