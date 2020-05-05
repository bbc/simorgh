import React from 'react';
import { render, waitFor } from '@testing-library/react';
import IncludeContainer from '.';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';

const defaultToggleState = {
  include: {
    enabled: true,
  },
};

const toggleStateFalse = {
  include: {
    enabled: true,
  },
};

const fakeMarkup = `<div>Visual Journalism Markup</div><script type="text/javascript" src="localhost/vj.js"></script>`;

// eslint-disable-next-line react/prop-types
const MockContext = ({ toggleState, children }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    isAmp={false}
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

// eslint-disable-next-line react/prop-types
const IncludeContainerWithMockContext = ({ toggleState, html, type }) => (
  <MockContext toggleState={toggleState}>
    <IncludeContainer html={html} type={type} />
  </MockContext>
);

describe('IncludeContainer', () => {
  beforeEach(() => {
    window.require = { config: jest.fn() };
  });

  afterEach(() => {
    window.require = null;
  });

  it('should render HTML when include toggle is enabled', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        html={fakeMarkup}
        type="idt2"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render any HTML when html prop is null', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        type="idt2"
        html={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render any HTML for an unsupported include type', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        html={fakeMarkup}
        type="idt20"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render any HTML when include toggle is disabled', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={toggleStateFalse}
        html={fakeMarkup}
        type="idt2"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  const runningIncludeTest = includeType => {
    it(`should add require to the page for ${includeType}`, async () => {
      render(
        <IncludeContainerWithMockContext
          toggleState={toggleStateFalse}
          html={fakeMarkup}
          type={includeType}
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
      });
    });
  };
  runningIncludeTest('vj');
  runningIncludeTest('idt1');

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
    });
  });

  it(`should not add require to the page for idt2`, async () => {
    render(
      <IncludeContainerWithMockContext
        toggleState={toggleStateFalse}
        html={fakeMarkup}
        type="idt2"
      />,
    );

    await waitFor(() => {
      expect(Array.from(document.querySelectorAll('head script'))).toHaveLength(
        0,
      );
      expect(window.require.config).toHaveBeenCalledTimes(0);
    });
  });
});
