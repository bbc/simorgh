import { storiesOf } from '@storybook/react';
import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import FauxHeadlineContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';
import blocksSingleFragment from '../Headings/testHelpers';

const headline = blocksSingleFragment('This is a headline.', []);

storiesOf('Containers|FauxHeadline', module)
  .addParameters({ chromatic: { disable: true } })
  .add('default FauxHeadline', () => (
    <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
      <FauxHeadlineContainer type="fauxHeadline" blocks={headline} />
    </ServiceContext.Provider>
  ));
