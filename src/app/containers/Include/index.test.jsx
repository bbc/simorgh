import React from 'react';
import { render } from '@testing-library/react';
import loggerMock from '#testHelpers/loggerMock';
import IncludeContainer from '.';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import * as idt2Amp from './amp/Idt2Amp';
import * as vjAmp from './amp/VjAmp';
import * as canonical from './canonical';
import { INCLUDE_RENDERED } from '#lib/logger.const';

const defaultToggleState = {
  include: {
    enabled: true,
  },
};

const toggleStateFalse = {
  include: {
    enabled: false,
  },
};

const fakeMarkup = `<div>Visual Journalism Markup</div><script type="text/javascript" src="localhost/vj.js"></script>`;

const includeProps = {
  html: fakeMarkup,
  idt2: {
    altText: 'some alt text',
    dimensions: {
      small: {
        href:
          'https://www.example.com/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6/image/150',
        height: 400,
        width: 500,
      },
      medium: {
        href:
          'https://www.example.com/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6/image/350',
        height: 600,
        width: 700,
      },
      large: {
        href:
          'https://www.example.com/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6/image/550',
        height: 800,
        width: 900,
      },
    },
  },
  type: 'idt2',
  isAmpSupported: true,
  href: '/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6',
};

// eslint-disable-next-line react/prop-types
const MockContext = ({ toggleState, isAmp, children }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    isAmp={isAmp || false}
    pageType="STY"
    service="news"
    statusCode={200}
    pathname="/pathname"
  >
    <ToggleContext.Provider value={{ toggleState, toggleDispatch: jest.fn() }}>
      {children}
    </ToggleContext.Provider>
  </RequestContextProvider>
);

/* eslint-disable react/prop-types */
const IncludeContainerWithMockContext = ({ toggleState, isAmp, ...props }) => (
  <MockContext toggleState={toggleState} isAmp={isAmp}>
    <IncludeContainer {...props} />
  </MockContext>
);
/* eslint-enable react/prop-types */

describe('IncludeContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
    loggerMock.info.mockClear();
  });

  it('should not render include for a Canonical page with toggles disabled', async () => {
    const mockCanonical = jest
      .fn()
      .mockReturnValue('canonical-includes-component');
    canonical.default = mockCanonical;

    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={toggleStateFalse}
        {...includeProps}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(mockCanonical).not.toHaveBeenCalled();
    expect(loggerMock.info).not.toHaveBeenCalled();
  });

  it('should render include for a Canonical page with toggles enabled', async () => {
    const mockCanonical = jest
      .fn()
      .mockReturnValue('canonical-includes-component');
    canonical.default = mockCanonical;

    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        {...includeProps}
        type="vj"
        href="/include/vjamericas/176-eclipse-lookup/mundo/app"
      />,
    );

    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_RENDERED, {
      type: 'vj',
      includeUrl: '/include/vjamericas/176-eclipse-lookup/mundo/app',
    });
    expect(container).toMatchSnapshot();
    expect(mockCanonical).toHaveBeenCalledTimes(1);
  });

  it('should render include for IDT2 on an Amp page with toggles enabled', async () => {
    const mockIdt2Amp = jest.fn().mockReturnValue('IDT2-Amp-component');
    idt2Amp.default = mockIdt2Amp;

    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        isAmp
        {...includeProps}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(mockIdt2Amp).toHaveBeenCalledTimes(1);
    expect(mockIdt2Amp).toHaveBeenCalledWith(includeProps, {});
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_RENDERED, {
      type: 'idt2',
      includeUrl: '/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6',
    });
  });

  it('should not render include for an Amp page with toggles disabled', async () => {
    const mockIdt2Amp = jest.fn().mockReturnValue('IDT2-Amp-component');
    idt2Amp.default = mockIdt2Amp;
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={toggleStateFalse}
        html={fakeMarkup}
        type="idt2"
        isAmp
        href="/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6"
      />,
    );
    expect(container).toMatchSnapshot();
    expect(mockIdt2Amp).not.toHaveBeenCalled();
    expect(loggerMock.info).not.toHaveBeenCalled();
  });

  it('should render a VJ include on an Amp page with toggles enabled', () => {
    const vjProps = {
      src:
        'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
      image:
        'https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_cv_table_ws_640_3x-nc_v0mmu.png',
      imageHeight: '360',
      imageWidth: '640',
      href:
        '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
      isAmpSupported: true,
      type: 'vj',
    };

    const mockVjAmp = jest.fn().mockReturnValue('VJ-Amp-component');
    vjAmp.default = mockVjAmp;

    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        isAmp
        {...vjProps}
      />,
    );

    expect(container).toMatchSnapshot();
    expect(mockVjAmp).toHaveBeenCalledTimes(1);
    expect(mockVjAmp).toHaveBeenCalledWith(vjProps, {});
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_RENDERED, {
      type: 'vj',
      includeUrl:
        '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
    });
  });

  it('should render a fallback for VJs on an Amp page when isAmpSupported is set to false', () => {
    const vjProps = {
      href:
        '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
      index: 0,
      isAmpSupported: false,
      type: 'vj',
    };

    const mockAmpFallback = jest.fn().mockReturnValue('VJ-Amp-fallback');
    vjAmp.default = mockAmpFallback;

    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        isAmp
        {...vjProps}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
