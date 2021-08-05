import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import FauxHeadlineContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';
import blocksSingleFragment from '../Headings/testHelpers';

const headline = blocksSingleFragment('This is a headline.', []);

const Component = () => (
  <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
    <FauxHeadlineContainer type="fauxHeadline" blocks={headline} />
  </ServiceContext.Provider>
);

export default {
  title: 'Containers/Faux Headline',
  Component,
  parameters: { chromatic: { disableSnapshot: true } },
};

export const FauxHeadline = Component;
