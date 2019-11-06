import { storiesOf } from '@storybook/react';
import React from 'react';
import OffScreenHeadlineContainer from '.';
import blocksSingleFragment from '../Headings/testHelpers';

const headline = blocksSingleFragment('This is a headline.', []);

storiesOf('Containers|OffScreenHeadline', module)
  .addParameters({ chromatic: { disable: true } })
  .add('default OffScreenHeadline', () => (
    <OffScreenHeadlineContainer type="offScreenHeadline" blocks={headline} />
  ));
