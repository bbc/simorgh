import React from 'react';
import SitewideLinks from './index';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`SitewideLinks`, () => {
  const link = {
    href: 'https://www.bbc.co.uk/news',
    text: 'Link',
  };

  const links = [link];

  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider>
      <SitewideLinks
        links={links}
        copyrightText="Text here. "
        externalLink={link}
      />
    </ServiceContextProvider>,
  );
});
