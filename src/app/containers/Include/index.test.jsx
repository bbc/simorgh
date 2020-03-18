import React from 'react';
import { render } from '@testing-library/react';
import IncludeContainer from '.';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';

const fakeMarkup = `&lt;div&gt;Visual Jounalism Markup&lt;/div&gt;&lt;script type=&quot;text/javascript&quot; src=&quot;localhost/vj.js&quot;&gt;&lt;/script&gt;`;

// eslint-disable-next-line react/prop-types
const IncludeContainerWithMockContext = ({ toggleState, html }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    isAmp={false}
    pageType="STY"
    service="news"
    statusCode={200}
    pathname="/pathname"
  >
    <ToggleContext.Provider value={{ toggleState, toggleDispatch: jest.fn() }}>
      <IncludeContainer html={html} />
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
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render any HTML when html prop is null', async () => {
    const mockToggles = {
      test: {
        include: {
          enabled: false,
        },
      },
    };
    const { container } = render(
      <IncludeContainerWithMockContext toggleState={mockToggles} />,
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
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
