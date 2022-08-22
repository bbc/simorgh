import React from 'react';
import { latin } from '#psammead/gel-foundations/src/scripts';
import FauxHeadlineContainer from '.';
import blocksSingleFragment from '../Headings/testHelpers';
import { ServiceContext } from '../../../contexts/ServiceContext';

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
