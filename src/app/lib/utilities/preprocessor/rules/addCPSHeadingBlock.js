import R from 'ramda';

const buildHeadingBlock = text => ({
    text,
    markupType: 'plain_text',
    type: 'heading',
  })

export default payload => {
    const output = R.clone(payload);

    if (!payload || !payload.promo || !payload.promo.headlines || !payload.content) {
        return output;
    }

    output.content.blocks = [
        buildHeadingBlock(headingResolver(payload.promo.headlines)),
        ...output.content.blocks
    ];

    return output;
};

export const headingResolver = headlines => headlines.headline.replace(/<[^>]*>/g, '');
