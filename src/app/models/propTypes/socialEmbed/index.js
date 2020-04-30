import { string, shape, arrayOf, number } from 'prop-types';

const socialEmbedBlockPropTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      indexOfType: number.isRequired,
      model: shape({
        // `id` is provided by Ares on the basis it knows how to extract it
        // from the URL. For unsupported providers (e.g. Facebook), this will
        // not be supplied - for that reason it is no required.
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

export default socialEmbedBlockPropTypes;
