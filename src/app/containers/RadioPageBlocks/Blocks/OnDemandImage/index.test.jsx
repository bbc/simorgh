import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import OnDemandImage from '.';

// eslint-disable-next-line react/prop-types
const component = ({ url, isAmp, service }) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      isAmp={isAmp}
      service={service}
      pageType="media"
      pathname="/path"
    >
      <OnDemandImage imageUrl={url} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('AudioPlayer blocks OnDemandHeading', () => {
  shouldMatchSnapshot(
    'should render correctly',
    component({ url: 'mock-url', isAmp: false, service: 'news' }),
  );

  it('should ensure the image has the right attributes', () => {
    render(
      component({
        url: 'ichef.bbci.co.uk/images/ic/$recipe/p063j1dv.jpg',
        isAmp: false,
        service: 'pashto',
      }),
    );
    const img = document.querySelector('img');
    expect(img.src).toEqual(
      'https://ichef.bbci.co.uk/images/ic/112x112/p063j1dv.jpg',
    );
    expect(img.alt).toEqual('BBC News پښتو');
    expect(img.srcset).toEqual(
      'https://ichef.bbci.co.uk/images/ic/112x112/p063j1dv.jpg 400w,https://ichef.bbci.co.uk/images/ic/224x224/p063j1dv.jpg 1008w',
    );
  });

  it('should ensure the image has the right attributes for amp', () => {
    render(
      component({
        url: 'ichef.bbci.co.uk/images/ic/$recipe/p063j1dv.jpg',
        isAmp: true,
        service: 'afaanoromoo',
      }),
    );
    const img = document.querySelector('amp-img');
    expect(img.getAttribute('src')).toEqual(
      'https://ichef.bbci.co.uk/images/ic/112x112/p063j1dv.jpg',
    );
    expect(img.getAttribute('alt')).toEqual('BBC News Afaan Oromoo');
    expect(img.getAttribute('layout')).toEqual('responsive');
    expect(img.getAttribute('srcset')).toEqual(
      'https://ichef.bbci.co.uk/images/ic/112x112/p063j1dv.jpg 400w,https://ichef.bbci.co.uk/images/ic/224x224/p063j1dv.jpg 1008w',
    );
  });
});
