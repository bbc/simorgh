import { storiesOf } from '@storybook/react';
import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import HeadingsContainer from '.';
import { ServiceContext } from '../../contexts/ServiceContext';
import blocksSingleFragment from './testHelpers';

const headline = blocksSingleFragment('This is a headline.', []);

const subheadline = blocksSingleFragment('This is a subheadline.', []);

const headingsContainerWithContext = (type, blocks) => (
  <ServiceContext.Provider value={{ script: latin }}>
    <HeadingsContainer type={type} blocks={blocks} />
  </ServiceContext.Provider>
);

storiesOf('Containers|Heading', module)
  .add('default heading', () =>
    headingsContainerWithContext('headline', headline),
  )
  .add('default subheading', () =>
    headingsContainerWithContext('subheadline', subheadline),
  );
