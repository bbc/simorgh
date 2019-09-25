import { clone, path } from 'ramda';

const buildHeadingBlock = text => ({
  text,
  markupType: 'plain_text',
  type: 'heading',
});

export const headingResolver = headlines =>
  headlines.headline.replace(/<[^>]*>/g, '');

export default payload => {
  const output = clone(payload);

  const headlines = path(['promo', 'headlines'], output);
  const blocks = path(['content', 'blocks'], output);

  if (!headlines || !blocks) {
    return output;
  }

  output.content.blocks = [
    buildHeadingBlock(headingResolver(payload.promo.headlines)),
    ...blocks,
  ];

  return output;
};
