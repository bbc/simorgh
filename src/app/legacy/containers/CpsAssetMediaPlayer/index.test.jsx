import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { MEDIA_ASSET_PAGE } from '#routes/utils/pageTypes';
import {
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import CpsAssetMediaPlayerContainer from '.';
import videoBlock from './fixtures';

const GenerateMediaPlayer = ({ platform, blocks, assetUri }) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    service="news"
    statusCode={200}
    platform={platform}
    id="foo"
    pageType={MEDIA_ASSET_PAGE}
    pathname="/pathname"
  >
    <ServiceContextProvider service="news">
      <BrowserRouter>
        <CpsAssetMediaPlayerContainer blocks={blocks} assetUri={assetUri} />
      </BrowserRouter>
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('MediaPlayer', () => {
  it('should render the canonical player without a placeholder', () => {
    const { container } = render(
      <GenerateMediaPlayer
        platform="canonical"
        blocks={[videoBlock]}
        assetUri="/pidgin/123456789"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the amp player', () => {
    const { container } = render(
      <GenerateMediaPlayer
        platform="amp"
        blocks={[videoBlock]}
        assetUri="/pidgin/123456789"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the canonical legacy media player', () => {
    const { container } = render(
      <GenerateMediaPlayer
        platform="canonical"
        blocks={[videoBlock]}
        assetUri="/russian/multimedia/2016/05/160505_v_diving_record"
        isLegacyMedia
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the amp legacy media player', () => {
    const { container } = render(
      <GenerateMediaPlayer
        platform="amp"
        blocks={[videoBlock]}
        assetUri="/russian/multimedia/2016/05/160505_v_diving_record"
        isLegacyMedia
      />,
    );
    expect(container).toMatchSnapshot();
  });

  suppressPropWarnings(['assetUri']);
  isNull(
    'is Null when assetUri is not provided',
    <GenerateMediaPlayer platform="canonical" blocks={[videoBlock]} />,
  );
});
