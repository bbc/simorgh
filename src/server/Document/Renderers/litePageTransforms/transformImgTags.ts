const LITE_ACE_WS_IMG_SIZE = '320';
const LITE_IMAGES_IC_IMG_SIZE = '96xn';

const setImgSize = (src: string) => {
  if (!src) return '';

  let modifiedSrc = src;

  // example: https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/2826/live/58ed4db0-df87-11ee-ad97-47305ea5b78b.jpg.webp
  const isAceWs = src.includes('ace/ws');

  // example: https://ichef.test.bbci.co.uk/images/ic/480xn/p01vzypf.jpg.webp
  const isImageIc = src.includes('images/ic');

  const imgSize = src.split('/')?.[5];

  if (isAceWs) {
    modifiedSrc = src.replace(imgSize, LITE_ACE_WS_IMG_SIZE);
  }

  if (isImageIc) {
    modifiedSrc = src.replace(imgSize, LITE_IMAGES_IC_IMG_SIZE);
  }

  return modifiedSrc;
};

export default (html: string) => {
  let modifiedHtml = html;

  try {
    const imgTags = modifiedHtml.match(/<img[^>]*>/g) || [];

    imgTags.forEach(tag => {
      const src = tag?.match(/src="([^"]*)"/)?.[1] || '';

      const modifiedSrc = setImgSize(src);

      if (!modifiedSrc) return;

      modifiedHtml = modifiedHtml.replace(
        tag,
        tag
          .replace(/srcSet="([^"]*)"/, '') // Remove srcSet attribute
          .replace(/sizes="([^"]*)"/, '') // Remove sizes attribute
          .replace(src, modifiedSrc), // Replace src attribute with modifiedSrc
      );
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (() => {})();
  }

  return modifiedHtml;
};
