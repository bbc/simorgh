import { storiesOf } from '@storybook/react';
import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import OnScreenHeadlineContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';
import blocksSingleFragment from '../Headings/testHelpers';

const headline = blocksSingleFragment('This is a headline.', []);

storiesOf('Containers|OnScreenHeadline', module)
  .addParameters({ chromatic: { disable: true } })
  .add('default OnScreenHeadline', () => (
    <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
      <OnScreenHeadlineContainer type="onScreenHeadline" blocks={headline} />
    </ServiceContext.Provider>
  ));
