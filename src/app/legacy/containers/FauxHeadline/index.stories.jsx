import React from 'react';
import FauxHeadlineContainer from '.';
import blocksSingleFragment from '../Headings/testHelpers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import { ServiceContext } from '#contexts/ServiceContext';

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
