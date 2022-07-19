import React from 'react';
import { latin } from '#legacy/gel-foundations/src/scripts';
import { ServiceContext } from '#contexts/ServiceContext';
import FauxHeadlineContainer from '.';
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
  parameters: { chromatic: { disable: true } },
};

export const FauxHeadline = Component;
