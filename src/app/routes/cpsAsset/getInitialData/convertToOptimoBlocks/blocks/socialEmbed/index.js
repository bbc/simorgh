import path from 'ramda/src/path';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';

const htmlEscape = string =>
  string
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const convertSocialEmbed = block => {
  const { type, source, embed, ...rest } = block;
  const html = path(['oembed', 'html'], embed);

  return {
    type,
    model: {
      blocks: [
        {
          type: source,
          model: {
            ...rest,
            // If 'embed.oembed.html' exists, merge an htmlEscape'd version into
            // a copy of the original object and then spread it into 'model'.
            ...(html && {
              embed: mergeDeepLeft(
                {
                  oembed: {
                    html: htmlEscape(html),
                  },
                },
                embed,
              ),
            }),
          },
        },
      ],
    },
  };
};

export default convertSocialEmbed;
