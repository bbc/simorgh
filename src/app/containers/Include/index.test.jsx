import React from 'react';
import { render } from '@testing-library/react';
import IncludeContainer from '.';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';

const fakeMarkup = `<div>Visual Jounalism Markup</div><script type="text/javascript" src="localhost/vj.js"></script>`;

// eslint-disable-next-line react/prop-types
const IncludeContainerWithMockContext = ({ toggleState, html, type }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    isAmp={false}
    pageType="STY"
    service="news"
    statusCode={200}
    pathname="/pathname"
  >
    <ToggleContext.Provider value={{ toggleState, toggleDispatch: jest.fn() }}>
      <IncludeContainer html={html} type={type} />
    </ToggleContext.Provider>
  </RequestContextProvider>
);

describe('IncludeContainer', () => {
  it('should render HTML when include toggle is enabled', async () => {
    const mockToggles = {
      test: {
        include: {
          enabled: true,
        },
      },
    };
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={mockToggles}
        html={fakeMarkup}
        type="idt2"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render any HTML when html prop is null', async () => {
    const mockToggles = {
      test: {
        include: {
          enabled: true,
        },
      },
    };
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={mockToggles}
        type="idt2"
        html={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render any HTML for an unsupported include type', async () => {
    const mockToggles = {
      test: {
        include: {
          enabled: true,
        },
      },
    };
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={mockToggles}
        html={fakeMarkup}
        type="idt20"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render any HTML when include toggle is disabled', async () => {
    const mockToggles = {
      test: {
        include: {
          enabled: false,
        },
      },
    };
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={mockToggles}
        html={fakeMarkup}
        type="idt2"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
