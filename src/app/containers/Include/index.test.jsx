import React from 'react';
import { render, waitFor } from '@testing-library/react';
import loggerMock from '#testHelpers/loggerMock';
import IncludeContainer from '.';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
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
const IncludeContainerWithMockContext = ({
  toggleState,
  html,
  href,
  type,
  isAmp,
}) => (
  <MockContext toggleState={toggleState} isAmp={isAmp}>
    <IncludeContainer html={html} type={type} href={href} />
  </MockContext>
);
/* eslint-enable react/prop-types */

describe('IncludeContainer', () => {
  beforeEach(() => {
    window.require = { config: jest.fn() };
  });

  afterEach(() => {
    window.require = null;
    loggerMock.info.mockClear();
  });

  it('should render HTML when include toggle is enabled', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        html={fakeMarkup}
        type="idt2"
        href="/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6"
      />,
    );
    expect(container).toMatchSnapshot();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_RENDERED, {
      type: 'idt2',
      includeUrl: '/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6',
    });
  });

  it('should not render any HTML when html prop is null', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        type="idt2"
        html={null}
        href="/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6"
      />,
    );
    expect(container).toMatchSnapshot();
    expect(loggerMock.info).not.toHaveBeenCalled();
  });

  it('should not render any HTML for an unsupported include type', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        html={fakeMarkup}
        type="idt20"
        href="/idt20/cb1a5166-cfbb-4520-bdac-6159299acff6"
      />,
    );
    expect(container).toMatchSnapshot();
    expect(loggerMock.info).not.toHaveBeenCalled();
  });

  it('should not render any HTML when include toggle is disabled', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={toggleStateFalse}
        html={fakeMarkup}
        type="idt2"
        href="/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6"
      />,
    );
    expect(container).toMatchSnapshot();
    expect(loggerMock.info).not.toHaveBeenCalled();
  });

  it('should not render any HTML when its an amp page', async () => {
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
    expect(loggerMock.info).not.toHaveBeenCalled();
  });

  const runningIncludeTest = (includeType, href) => {
    it(`should add require to the page for ${includeType}`, async () => {
      render(
        <IncludeContainerWithMockContext
          toggleState={defaultToggleState}
          html={fakeMarkup}
          type={includeType}
          href={href}
        />,
      );

      await waitFor(() => {
        const scripts = Array.from(document.querySelectorAll('head script'));

        expect(scripts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              src: `https://news.files.bbci.co.uk/include/vjassets/js/vendor/require-2.1.20b.min.js`,
            }),
            expect.objectContaining({
              text: expect.stringContaining('require.config'),
            }),
          ]),
        );

        expect(scripts).toHaveLength(2);

        expect(window.require.config).toHaveBeenCalledTimes(1);

        expect(loggerMock.info).toHaveBeenCalledTimes(1);
        expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_RENDERED, {
          type: `${includeType}`,
          includeUrl: `${href}`,
        });
      });
    });
  };
  runningIncludeTest(
    'vj',
    '/include/vjamericas/176-eclipse-lookup/mundo/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-werty/venta-app_eclipse-mundo_bjd2w.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-werty/venta-app_eclipse-mundo_bjd2w.png',
  );
  runningIncludeTest('idt1', 'indepthtoolkit/data-pics/Env_Test_2');

  it(`should add require once for page with multiple vj and idt1 includes`, async () => {
    render(
      <MockContext toggleState={defaultToggleState}>
        <IncludeContainer html={fakeMarkup} type="idt1" />
        <IncludeContainer html={fakeMarkup} type="vj" />
        <IncludeContainer html={fakeMarkup} type="idt1" />
        <IncludeContainer html={fakeMarkup} type="vj" />
      </MockContext>,
    );

    await waitFor(() => {
      const scripts = Array.from(document.querySelectorAll('head script'));

      expect(scripts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            src: `https://news.files.bbci.co.uk/include/vjassets/js/vendor/require-2.1.20b.min.js`,
          }),
          expect.objectContaining({
            text: expect.stringContaining('require.config'),
          }),
        ]),
      );

      expect(scripts).toHaveLength(2);

      expect(window.require.config).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledTimes(4);
    });
  });

  it(`should not add require to the page for idt2`, async () => {
    render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        html={fakeMarkup}
        type="idt2"
        href="/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6"
      />,
    );

    await waitFor(() => {
      expect(Array.from(document.querySelectorAll('head script'))).toHaveLength(
        0,
      );
      expect(window.require.config).toHaveBeenCalledTimes(0);
      expect(loggerMock.info).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_RENDERED, {
        type: 'idt2',
        includeUrl: '/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6',
      });
    });
  });
});
