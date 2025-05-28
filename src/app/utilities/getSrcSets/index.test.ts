import { Theme } from '@emotion/react';
import { GROUP_2_MAX_WIDTH } from '#app/components/ThemeProvider/mediaQueries';
import getSrcSets from '.';

describe('getSrcSets', () => {
  it('should return the correct src sets for a given image', () => {
    const mockMq = {
      GROUP_2_MAX_WIDTH,
    } as Theme['mq'];

    const srcSets = getSrcSets({
      imageUrlTemplate:
        'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01wjx8g.jpg',
      mq: mockMq,
    });

    expect(srcSets).toStrictEqual({
      sizes: '(max-width: 37.4375rem) 128px, 512px',
      srcSet: `https://ichef.test.bbci.co.uk/images/ic/184xn/p01wjx8g.jpg 128w, 
                          https://ichef.test.bbci.co.uk/images/ic/368xn/p01wjx8g.jpg 256w, 
                          https://ichef.test.bbci.co.uk/images/ic/224xn/p01wjx8g.jpg 512w, 
                          https://ichef.test.bbci.co.uk/images/ic/448xn/p01wjx8g.jpg 1024w`,
    });
  });
});
