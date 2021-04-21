import { string, shape, arrayOf, number } from 'prop-types';

export const cpsSocialEmbedBlockPropTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      indexOfType: number.isRequired,
      model: shape({
        // `id` is provided by Ares on the basis it knows how to extract it
        // from the URL. For unsupported providers (e.g. Facebook), this will
        // not be supplied - for that reason it is not required.
        id: string,
        href: string.isRequired,
        // 'embed' is not required, however if it is included it must contain
        // 'oembed' and 'oembed.html' properties.
        embed: shape({
          oembed: shape({
            html: string.isRequired,
          }).isRequired,
        }),
      }).isRequired,
    }),
  ),
};

export const socialEmbedBlockPropTypes = {
  source: string.isRequired,
  // 'blocks' can contain 'renditions' blocks, whose blocks can contain
  // 'aresOEmbed' blocks. When an 'aresOEmbed' block exists, we expect to
  // find an 'oembed' object with an 'html' property.
  blocks: arrayOf(
    shape({
      model: shape({
        blocks: arrayOf(
          shape({
            model: shape({
              oembed: shape({
                html: string.isRequired,
              }),
            }),
          }),
        ),
      }),
    }),
  ),
};
