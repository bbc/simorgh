import path from 'ramda/src/path';
import assocPath from 'ramda/src/assocPath';

const noCookieYoutube = ({ embedHtml, embedProvider }) => {
  if (!embedHtml) return embedHtml;
  const isYoutubeEmbed = embedProvider === 'YouTube';
  const isEmbedWithCookie = /www\.youtube-nocookie\.com/.test(embedHtml);
  if (isYoutubeEmbed && !isEmbedWithCookie) {
    const html = embedHtml.replace(
      'www.youtube.com',
      'www.youtube-nocookie.com',
    );
    return html;
  }
  return embedHtml;
};

export default json => {
  try {
    const groups = path(['content', 'model', 'blocks'], json);
    const setGroups = assocPath(['content', 'model', 'blocks']);
    const oEmbedPath = [
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'oembed',
    ];

    const blocksWithNoCookies = groups.map(item => {
      const itemType = path(['type'], item);
      if (!(itemType === 'social')) return item;

      const OEmbed = path(oEmbedPath, item);
      const setOEmbedHtml = assocPath(oEmbedPath.concat('html'));

      const embedHtml = path(['html'], OEmbed);
      const embedProvider = path(['provider_name'], OEmbed);

      const noCookieHtml = noCookieYoutube({ embedHtml, embedProvider });

      return setOEmbedHtml(noCookieHtml, item);
    });

    return setGroups(blocksWithNoCookies, json);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return json;
  }
};
