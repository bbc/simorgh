import React from 'react';
import { render } from '../react-testing-library-with-providers';
import { ServiceContext } from '#contexts/ServiceContext';
import CopyrightContainer from './index';
import { ServiceConfig } from '#models/types/serviceConfig';

const CopyrightWithContext = (
  copyrightText: string,
  contextStub: ServiceConfig,
) => (
  <ServiceContext.Provider value={contextStub}>
    <CopyrightContainer>{copyrightText}</CopyrightContainer>
  </ServiceContext.Provider>
);

const newsServiceContextStub = {
  dir: 'ltr',
  lang: 'en-GB',
  imageCopyrightOffscreenText: 'Image source, ',
};

const persianServiceContextStub = {
  dir: 'rtl',
  lang: 'fa',
  imageCopyrightOffscreenText: ' ، منبع تصویر',
};

it('should render Copyright with news service context', () => {
  const { container } = render(
    CopyrightWithContext(
      'This is some copyright text',
      newsServiceContextStub as ServiceConfig,
    ),
  );
  expect(container).toMatchSnapshot();
});

it('should render Copyright with persian service context', () => {
  const { container } = render(
    CopyrightWithContext(
      'Getty Images',
      persianServiceContextStub as ServiceConfig,
    ),
  );
  expect(container).toMatchSnapshot();
});
