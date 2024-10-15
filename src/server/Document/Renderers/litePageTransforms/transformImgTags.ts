const LITE_ACE_WS_IMG_SIZE = '320';
const LITE_IMAGES_IC_IMG_SIZE = '96xn';

const setImgSize = (src: string) => {
  if (!src) return '';

  let modifiedSrc = src;

  const isAceWs = src.includes('ace/ws');
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
          .replace(/srcSet="([^"]*)"/, '')
          .replace(/sizes="([^"]*)"/, '')
          .replace(src, modifiedSrc),
      );
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (() => {})();
  }

  return modifiedHtml;
};
