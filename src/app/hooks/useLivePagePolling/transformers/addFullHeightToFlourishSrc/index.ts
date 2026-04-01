import { OEmbedData } from '#app/components/Embeds/types';
import { v4 as uuid } from 'uuid';

export default (aresOEmbedData: OEmbedData) => {
  const { html } = aresOEmbedData;

  if (html) {
    const srcMatch = html.match(/src="(http.*?)"/);
    const srcLink = srcMatch?.[1] ?? null;
    const iFrameSrc = `${srcLink}?auto=1`;
    const [uniqueStr] = uuid().split('-');
    const iFrameId = `flourish-id-${uniqueStr}`;
    const titleMatch = html.match(/title="(.*?)"/);
    const iFrameTitle = titleMatch?.[1] ?? null;

    const sizeAdjustScript = `
    window.addEventListener('message', function (event) {
      var _message$src;
      var message = typeof event.data === 'string' && JSON.parse(event.data);
      if ((message === null || message === void 0 ? void 0 : message.sender) === 'Flourish' 
      && (message === null || message === void 0 ? void 0 : message.context) === 'iframe.resize' 
      && message !== null && message !== void 0 && (_message$src = message.src) !== null && _message$src !== void 0 && _message$src.includes('${iFrameSrc}')) {
        document.getElementById('${iFrameId}').style.height = message.height + 'px';
      }
    });`;

    return {
      ...aresOEmbedData,
      ...(srcLink && { iFrameSrc }),
      iFrameId,
      iFrameTitle,
      sizeAdjustScript,
    };
  }

  return aresOEmbedData;
};
