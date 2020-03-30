/* eslint-disable react/prop-types */
import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { StaticRouter } from 'react-router-dom';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import assocPath from 'ramda/src/assocPath';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { MediaAssetPage } from '..';
import mapPageData from '#data/pidgin/cpsAssets/23248703';
import uzbekPageData from '#data/uzbek/cpsAssets/sport-23248721';
import igboPageData from '#data/igbo/cpsAssets/afirika-23252735';
import getInitialData from '#app/routes/cpsAsset/getInitialData';

const toggleState = {
  local: {
    mediaPlayer: {
      enabled: true,
    },
  },
  test: {
    mediaPlayer: {
      enabled: true,
    },
  },
  live: {
    mediaPlayer: {
      enabled: false,
    },
  },
};

const createAssetPage = ({ pageData }, service) => (
  <StaticRouter>
    <ToggleContext.Provider value={{ toggleState, toggleDispatch: jest.fn() }}>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={false}
          pageType={pageData.metadata.type}
          pathname={pageData.metadata.locators.assetUri}
          service={service}
          statusCode={200}
        >
          <MediaAssetPage service={service} pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContext.Provider>
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

jest.mock('#containers/PageHandlers/withLoading', () => Component => {
  const LoadingContainer = props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
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

const escapedText = text => {
  const textReplacements = {
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
  };

  const replacementsRegex = new RegExp(
    Object.keys(textReplacements).join('|'),
    'gi',
  );

  return text.replace(replacementsRegex, match => textReplacements[match]);
};

const getBlockTextAtIndex = (index, originalPageData) => {
  return path(['content', 'blocks', index, 'text'], originalPageData);
};

describe('Media Asset Page', () => {
  let pageData;
  let asFragment;
  let getByText;
  beforeEach(async () => {
    fetch.mockResponse(JSON.stringify(mapPageData));
    const response = await getInitialData('some-map-path');
    pageData = response.pageData;

    ({ asFragment, getByText } = render(
      createAssetPage({ pageData }, 'pidgin'),
    ));
  });

  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  it('should render the index image as metadata image', async () => {
    await waitForDomChange({
      container: document.querySelector('head'),
    });

    const actual = Array.from(
      document.querySelectorAll(
        'head > meta[property*="image"], head > meta[name*="image"]',
      ),
    ).map(tag =>
      tag.hasAttribute('property')
        ? {
            property: tag.getAttribute('property'),
            content: tag.getAttribute('content'),
          }
        : {
            name: tag.getAttribute('name'),
            content: tag.getAttribute('content'),
          },
    );
    const expected = [
      {
        property: 'og:image',
        content:
          'http://ichef.test.bbci.co.uk/news/1024/branded_pidgin/6FC4/test/_63721682_p01kx435.jpg',
      },
      { property: 'og:image:alt', content: 'connectionAltText' },
      { name: 'twitter:image:alt', content: 'connectionAltText' },
      {
        name: 'twitter:image:src',
        content:
          'http://ichef.test.bbci.co.uk/news/1024/branded_pidgin/6FC4/test/_63721682_p01kx435.jpg',
      },
    ];

    expect(actual).toEqual(expected);
  });

  it('should render component', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render paragraph', () => {
    const paragraphText = getBlockTextAtIndex(1, mapPageData);
    expect(getByText(escapedText(paragraphText))).toBeInTheDocument();
  });

  it('should render image', () => {
    const imageCaption = path(
      ['content', 'blocks', 25, 'caption'],
      mapPageData,
    );
    // Images not rendered properly due to lazyload, therefore can only check caption text
    expect(getByText(escapedText(imageCaption))).toBeInTheDocument();
  });

  describe('AV player', () => {
    let liveStreamSource;

    const getLiveStreamBlock = processedPageData => {
      return path(['content', 'model', 'blocks', 1], processedPageData);
    };

    const getLiveStreamSource = liveStreamBlock => {
      return path(
        [
          'model',
          'blocks',
          '0',
          'model',
          'blocks',
          0,
          'model',
          'versions',
          0,
          'versionId',
        ],
        liveStreamBlock,
      );
    };

    it('should render version (live audio stream)', async () => {
      fetch.mockResponse(JSON.stringify(uzbekPageData));
      const response = await getInitialData('some-map-path');
      pageData = response.pageData;
      const liveStreamBlock = getLiveStreamBlock(pageData);
      liveStreamSource = getLiveStreamSource(liveStreamBlock);
      expect(liveStreamBlock.type).toBe('version');

      ({ asFragment } = render(createAssetPage({ pageData }, 'uzbek')));

      expect(
        document.querySelector(`iframe[src*=${liveStreamSource}]`),
      ).not.toBeNull();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render video', () => {
      const liveStreamBlock = getLiveStreamBlock(pageData);
      liveStreamSource = getLiveStreamSource(liveStreamBlock);
      expect(liveStreamBlock.type).toBe('video');

      expect(
        document.querySelector(`iframe[src*=${liveStreamSource}]`),
      ).not.toBeNull();
    });
  });

  describe('heading', () => {
    let headingText;

    const getBlockAtIndex = (index, processedPageData) => {
      return path(['content', 'model', 'blocks', index], processedPageData);
    };

    beforeAll(() => {
      headingText = getBlockTextAtIndex(2, mapPageData);
    });

    it('should render faux headline', () => {
      const fauxHeadlineBlock = getBlockAtIndex(2, pageData);

      expect(fauxHeadlineBlock.type).toBe('fauxHeadline');
      expect(getByText(escapedText(headingText))).toBeInTheDocument();
    });

    it('should render visually hidden headline', () => {
      const hiddenHeadline = getBlockAtIndex(0, pageData);

      expect(hiddenHeadline.type).toBe('visuallyHiddenHeadline');
      expect(getByText(escapedText(headingText))).toBeInTheDocument();
    });
  });

  it('should render sub heading', () => {
    const subHeadingText = getBlockTextAtIndex(3, mapPageData);

    expect(getByText(escapedText(subHeadingText))).toBeInTheDocument();
  });

  it('should render crosshead', () => {
    const crossHeadText = getBlockTextAtIndex(4, mapPageData);

    expect(getByText(escapedText(crossHeadText))).toBeInTheDocument();
  });

  it('should render firstPublished timestamp for Pidgin', () => {
    expect(getByText('13 September 2019')).toBeInTheDocument();
  });

  it('should render lastPublished timestamp for Pidgin', () => {
    expect(getByText('New Informate 20 November 2019')).toBeInTheDocument();
  });

  it('has a single "main" element, and a single "region" element (a11y)', async () => {
    expect(document.querySelectorAll(`[role='main']`).length).toBe(1);
    expect(document.querySelectorAll(`[role='region']`).length).toBe(1);
  });
});

it('should not show the timestamp when allowDateStamp is false', async () => {
  fetch.mockResponse(JSON.stringify(mapPageData));
  const { pageData } = await getInitialData('some-map-path');
  const pageDataWithHiddenTimestamp = assocPath(
    ['metadata', 'options', 'allowDateStamp'],
    false,
    pageData,
  );

  render(createAssetPage({ pageData: pageDataWithHiddenTimestamp }, 'pidgin'));

  expect(document.querySelector('main time')).toBeNull();
});

it('should not show the iframe when available is false', async () => {
  fetch.mockResponse(JSON.stringify(uzbekPageData));
  const { pageData } = await getInitialData('some-map-path');
  const uzbekDataExpiredLivestream = assocPath(
    ['content', 'blocks', 0, 'available'],
    false,
    pageData,
  );

  fetch.mockResponse(JSON.stringify(uzbekDataExpiredLivestream));
  const { pageData: pageDataWithExpiredLiveStream } = await getInitialData(
    'some-map-path',
  );

  render(createAssetPage({ pageData: pageDataWithExpiredLiveStream }, 'uzbek'));

  expect(document.querySelector('iframe')).toBeNull();
});

it('should show the media message when available is false', async () => {
  const uzbekDataExpiredLivestream = assocPath(
    ['content', 'blocks', 0, 'available'],
    false,
    uzbekPageData,
  );

  fetch.mockResponse(JSON.stringify(uzbekDataExpiredLivestream));
  const { pageData: pageDataWithExpiredLiveStream } = await getInitialData(
    'some-map-path',
  );
  const { getByText } = render(
    createAssetPage({ pageData: pageDataWithExpiredLiveStream }, 'uzbek'),
  );

  expect(
    getByText('Бу контентни ортиқ тинглаб/томоша қилиб бўлмайди.'),
  ).toBeInTheDocument();
});

it('should show the media message when there is no media block', async () => {
  const blocks = pathOr([], ['content', 'blocks'], uzbekPageData);
  const blockTypes = pathOr([], ['metadata', 'blockTypes'], uzbekPageData);
  const uzbekDataWithNoMediaBlock = assocPath(
    ['content', 'blocks'],
    blocks.filter(block => block.type !== 'version'),
    uzbekPageData,
  );
  const uzbekDataWithNoMediaType = assocPath(
    ['metadata', 'blockTypes'],
    blockTypes.filter(type => type !== 'version'),
    uzbekDataWithNoMediaBlock,
  );

  fetch.mockResponse(JSON.stringify(uzbekDataWithNoMediaType));
  const { pageData: pageDataWithExpiredLiveStream } = await getInitialData(
    'some-map-path',
  );
  const { getByText } = render(
    createAssetPage({ pageData: pageDataWithExpiredLiveStream }, 'uzbek'),
  );

  expect(
    getByText('Бу контентни ортиқ тинглаб/томоша қилиб бўлмайди.'),
  ).toBeInTheDocument();
});

it('should only render firstPublished timestamp for Igbo when lastPublished is less than 1 min later', async () => {
  fetch.mockResponse(JSON.stringify(igboPageData));
  const { pageData } = await getInitialData('some-map-path');

  const { getByText } = render(createAssetPage({ pageData }, 'igbo'));

  expect(getByText('23 Ọktọba 2019')).toBeInTheDocument();
});
