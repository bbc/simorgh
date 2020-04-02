import path from 'ramda/src/path';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import { htmlEscape } from 'escape-goat';

const convertSocialEmbed = (block) => {
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
