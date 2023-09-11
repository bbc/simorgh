import React from 'react';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContext } from '../../../contexts/ServiceContext';
import CopyrightContainer from './index';

const CopyrightWithContext = (copyrightText, contextStub) => (
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
    CopyrightWithContext('This is some copyright text', newsServiceContextStub),
  );
  expect(container).toMatchSnapshot();
});

it('should render Copyright with persian service context', () => {
  const { container } = render(
    CopyrightWithContext('Getty Images', persianServiceContextStub),
  );
  expect(container).toMatchSnapshot();
});
