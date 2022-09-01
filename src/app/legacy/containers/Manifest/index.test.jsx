import React from 'react';
import { render } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ManifestContainer from '.';

const contextStub = {
  manifestPath: '/manifest.json',
  service: 'news',
};

const mountManifest = context =>
  render(
    <ServiceContext.Provider value={context}>
      <ManifestContainer />
    </ServiceContext.Provider>,
  );

describe('ManifestContainer', () => {
  it('should render with context manifest path', () => {
    const wrapper = mountManifest(contextStub);
    const { linkTags } = Helmet.peek();
    const { href, rel } = linkTags[0];

    expect(linkTags).toHaveLength(1);
    expect(href).toEqual('/news/manifest.json');
    expect(rel).toEqual('manifest');

    wrapper.unmount();
  });

  it('should not render with no manifest path provided', () => {
    const wrapper = mountManifest({ service: 'news' });
    const { linkTags } = Helmet.peek();

    expect(linkTags).toHaveLength(0);
    wrapper.unmount();
  });
});
