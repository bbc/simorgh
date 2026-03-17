import { OEmbedData } from '#app/components/Embeds/types';
import * as uuId from 'uuid';
import addFullHeightToFlourishSrc from '.';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('addFullHeightToFlourishSrc', () => {
  it('should format the block to only include relevant information', () => {
    const sampleFlourishIframe =
      '<iframe src="https://flo.uri.sh/someType/someId/embed" height="575" width="700" style="width:100%;" title="Interactive or visual content"></iframe>';

    const flourishBlock = {
      html: sampleFlourishIframe,
    } as OEmbedData;

    jest
      .spyOn(uuId, 'v4')
      .mockReturnValueOnce(
        'uniqueID-1234' as unknown as Uint8Array<ArrayBufferLike>,
      );

    const actual = addFullHeightToFlourishSrc(flourishBlock);
    const { sizeAdjustScript } = actual as OEmbedData;

    expect(actual).toEqual(
      expect.objectContaining({
        html: `<iframe src="https://flo.uri.sh/someType/someId/embed" height="575" width="700" style="width:100%;" title="Interactive or visual content"></iframe>`,
        iFrameSrc: 'https://flo.uri.sh/someType/someId/embed?auto=1',
        iFrameId: 'flourish-id-uniqueID',
        iFrameTitle: 'Interactive or visual content',
      }),
    );

    expect(sizeAdjustScript?.replace(/(\s|\n)/g, '')).toEqual(
      `window.addEventListener('message',function(event){var_message$src;varmessage=typeofevent.data==='string'&&JSON.parse(event.data);if((message===null||message===void0?void0:message.sender)==='Flourish'&&(message===null||message===void0?void0:message.context)==='iframe.resize'&&message!==null&&message!==void0&&(_message$src=message.src)!==null&&_message$src!==void0&&_message$src.includes('https://flo.uri.sh/someType/someId/embed?auto=1')){document.getElementById('flourish-id-uniqueID').style.height=message.height+'px';}});`,
    );
  });
});
