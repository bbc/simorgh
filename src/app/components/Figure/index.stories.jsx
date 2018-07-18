import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Figure from './index';

const image = {
  alt:
    'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
  src:
    'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
};

const caption = 'This is a caption!';

storiesOf('Figure', module)
  .add('with a caption', () => <Figure {...image} caption={caption} />)
  .add('without a caption', () => <Figure {...image} />);
