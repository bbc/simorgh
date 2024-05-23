import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import OnDemandImage from '.';

const component = ({ url, isAmp, service, alt }) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      isAmp={isAmp}
      service={service}
      pageType={MEDIA_PAGE}
      pathname="/path"
    >
      <OnDemandImage imageUrl={url} alt={alt} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('AudioPlayer blocks OnDemandHeading', () => {
  it('should render correctly', () => {
    const { container } = render(
      component({ url: 'mock-url', isAmp: false, service: 'news' }),
    );
    expect(container).toMatchSnapshot();
  });

  it('should ensure the image has the right attributes', () => {
    const { getByAltText } = render(
      component({
        url: 'ichef.bbci.co.uk/images/ic/$recipe/p063j1dv.jpg',
        isAmp: false,
        service: 'pashto',
      }),
    );
    const img = getByAltText('BBC News پښتو');
    expect(img.src).toEqual(
      'https://ichef.bbci.co.uk/images/ic/256x256/p063j1dv.jpg.webp',
    );
    expect(img.alt).toEqual('BBC News پښتو');
  });

  it('should correctly pass through an alt attribute', () => {
    const { getByAltText } = render(
      component({
        url: 'ichef.bbci.co.uk/images/ic/$recipe/p063j1dv.jpg',
        isAmp: false,
        service: 'pashto',
        alt: 'test alt text',
      }),
    );
    expect(getByAltText('test alt text')).toBeInTheDocument();
  });

  it('should ensure the image has the right attributes for amp', () => {
    const { container } = render(
      component({
        url: 'ichef.bbci.co.uk/images/ic/$recipe/p063j1dv.jpg',
        isAmp: true,
        service: 'afaanoromoo',
      }),
    );
    const img = container.querySelector('amp-img');
    expect(img.getAttribute('src')).toEqual(
      'https://ichef.bbci.co.uk/images/ic/256x256/p063j1dv.jpg.webp',
    );
    expect(img.getAttribute('alt')).toEqual('BBC News Afaan Oromoo');
    expect(img.getAttribute('layout')).toEqual('responsive');
  });
});
