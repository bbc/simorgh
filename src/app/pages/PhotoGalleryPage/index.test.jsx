import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import assocPath from 'ramda/src/assocPath';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import noOnwardJourneys from '#data/pidgin/cpsAssets/sport-23252855-LEGACY.json';
import someCpsOnwardJourneys from '#data/azeri/cpsAssets/azerbaijan-44208474.json';
import allCpsOnwardJourneys from '#data/pidgin/cpsAssets/tori-49221071.json';
import pglAboutData from '#data/afaanoromoo/cpsAssets/oduu-41217768.json';
import getInitialData from '#routes/cpsAsset/getInitialData';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import ThemeProvider from '#components/ThemeProvider';
import PhotoGalleryPage from '.';

jest.mock('#components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

jest.mock('#containers/ComscoreAnalytics', () => {
  const ComscoreAnalytics = () => <div>comscore</div>;
  return ComscoreAnalytics;
});

jest.mock('#components/ThemeProvider');

const Page = ({ pageData, service }) => (
  <StaticRouter>
    <ThemeProvider service={service} variant="default">
      <ToggleContextProvider>
        <ServiceContextProvider service={service}>
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp={false}
            pageType={pageData.metadata.type}
            pathname={pageData.metadata.locators.assetUri}
            service={service}
            statusCode={200}
          >
            <PhotoGalleryPage service={service} pageData={pageData} />
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    </ThemeProvider>
  </StaticRouter>
);

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  const PageWrapperContainer = props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('#containers/PageHandlers/withError', () => Component => {
  const ErrorContainer = props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('#containers/PageHandlers/withData', () => Component => {
  const DataContainer = props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('#containers/PageHandlers/withContexts', () => Component => {
  const ContextsContainer = props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return ContextsContainer;
});

const pageType = 'cpsAsset';

// Skipped as this component will no longer be used.
describe.skip('Photo Gallery Page', () => {
  beforeEach(() => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';
  });

  afterEach(() => {
    delete process.env.SIMORGH_ICHEF_BASE_URL;
  });

  describe('snapshots', () => {
    it('should match snapshot for PGL with no onward journeys', async () => {
      fetch.mockResponse(JSON.stringify(noOnwardJourneys));
      const { pageData } = await getInitialData({
        path: 'some-cps-pgl-path',
        pageType,
      });

      const { container } = render(
        <Page pageData={pageData} service="pidgin" />,
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot for PGL with about tags', async () => {
      fetch.mockResponse(JSON.stringify(pglAboutData));
      const { pageData } = await getInitialData({
        path: 'some-cps-pgl-path',
        pageType,
      });

      const { container } = render(
        <Page pageData={pageData} service="afaanoromoo" />,
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot for PGL with non-CPS onward journeys filtered', async () => {
      fetch.mockResponse(JSON.stringify(someCpsOnwardJourneys));
      const { pageData } = await getInitialData({
        path: 'some-cps-pgl-path',
        pageType,
      });
      const { container } = render(
        <Page pageData={pageData} service="azeri" />,
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot for PGL with all CPS onward journeys', async () => {
      fetch.mockResponse(JSON.stringify(allCpsOnwardJourneys));
      const { pageData } = await getInitialData({
        path: 'some-cps-pgl-path',
        pageType,
      });

      const { container } = render(
        <Page pageData={pageData} service="pidgin" />,
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('should only render firstPublished timestamp for Igbo when lastPublished is less than 1 min later', async () => {
    fetch.mockResponse(JSON.stringify(pglAboutData));
    const { pageData } = await getInitialData({
      path: 'some-cps-pgl-path',
      pageType,
    });
    const { getByText } = render(
      <Page pageData={pageData} service="afaanoromoo" />,
    );
    expect(getByText('21 Fuulbaana 2017')).toBeInTheDocument();
  });

  it('should not show the pop-out timestamp when allowDateStamp is false', async () => {
    fetch.mockResponse(JSON.stringify(pglAboutData));
    const { pageData } = await getInitialData({
      path: 'some-cps-pgl-path',
      pageType,
    });
    const pageDataWithHiddenTimestamp = assocPath(
      ['metadata', 'options', 'allowDateStamp'],
      false,
      pageData,
    );
    const { asFragment } = render(
      <Page pageData={pageDataWithHiddenTimestamp} service="afaanoromoo" />,
    );

    expect(document.querySelector('main time')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render image with the .webp image extension', async () => {
    const imageBlock = someCpsOnwardJourneys.data.article.content.blocks[0];
    const { altText: imageAltText, path: imageLocator } = imageBlock;
    const imageURL = `https://ichef.test.bbci.co.uk/ace/ws/640${imageLocator}.webp`;
    const expectedSrcSetURLs = [
      `https://ichef.test.bbci.co.uk/ace/ws/240${imageLocator}.webp 240w`,
      `https://ichef.test.bbci.co.uk/ace/ws/320${imageLocator}.webp 320w`,
      `https://ichef.test.bbci.co.uk/ace/ws/480${imageLocator}.webp 480w`,
      `https://ichef.test.bbci.co.uk/ace/ws/624${imageLocator}.webp 624w`,
      `https://ichef.test.bbci.co.uk/ace/ws/800${imageLocator}.webp 800w`,
    ].join(', ');

    fetch.mockResponse(JSON.stringify(someCpsOnwardJourneys));
    const { pageData } = await getInitialData({
      path: 'some-cps-pgl-path',
      pageType,
    });

    render(<Page pageData={pageData} service="azeri" />);

    const { src, srcset } = screen.getByAltText(imageAltText);

    expect(src).toEqual(imageURL);
    expect(srcset).toEqual(expectedSrcSetURLs);
  });

  it('should render related content images with the .webp image extension', async () => {
    const imageBlock =
      someCpsOnwardJourneys.data.article.relatedContent.groups[0].promos[0]
        .indexImage;
    const { path: imagePath, altText: imageAltText } = imageBlock;
    const imageURL = `https://ichef.test.bbci.co.uk/ace/ws/660${imagePath}.webp`;
    const expectedSrcSetURLs = [
      `https://ichef.test.bbci.co.uk/ace/ws/70${imagePath}.webp 70w`,
      `https://ichef.test.bbci.co.uk/ace/ws/95${imagePath}.webp 95w`,
      `https://ichef.test.bbci.co.uk/ace/ws/144${imagePath}.webp 144w`,
      `https://ichef.test.bbci.co.uk/ace/ws/183${imagePath}.webp 183w`,
      `https://ichef.test.bbci.co.uk/ace/ws/240${imagePath}.webp 240w`,
      `https://ichef.test.bbci.co.uk/ace/ws/320${imagePath}.webp 320w`,
      `https://ichef.test.bbci.co.uk/ace/ws/660${imagePath}.webp 660w`,
    ].join(', ');

    fetch.mockResponse(JSON.stringify(someCpsOnwardJourneys));
    const { pageData } = await getInitialData({
      path: 'some-cps-pgl-path',
      pageType,
    });

    render(<Page pageData={pageData} service="azeri" />);

    const { src, srcset } = screen.getByAltText(imageAltText);

    expect(src).toEqual(imageURL);
    expect(srcset).toEqual(expectedSrcSetURLs);
  });
});
