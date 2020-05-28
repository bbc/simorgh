import React from 'react';
import { render } from '@testing-library/react';
import IncludeContainer from '.';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import * as amp from './index.amp';
import * as canonical from './index.canonical';

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
        href: 'small.jpeg/150',
        height: 400,
        width: 500,
      },
      medium: {
        href: 'medium.jpeg/350',
        height: 600,
        width: 700,
      },
      large: {
        href: 'large.jpeg/550',
        height: 800,
        width: 900,
      },
    },
  },
  type: 'idt2',
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
  });

  it('should not render include for a Canonical page with toggles disabled', async () => {
    const mockCanonical = jest
      .fn()
      .mockReturnValue('canonical-includes-container');
    canonical.default = mockCanonical;

    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={toggleStateFalse}
        {...includeProps}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(mockCanonical).not.toHaveBeenCalled();
  });

  it('should render include for a Canonical page with toggles enabled', async () => {
    const mockCanonical = jest
      .fn()
      .mockReturnValue('canonical-includes-container');
    canonical.default = mockCanonical;

    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        {...includeProps}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(mockCanonical).toHaveBeenCalledTimes(1);
  });

  it('should render include for an Amp page with toggles enabled', async () => {
    const mockAmp = jest.fn().mockReturnValue('amp-includes-container');
    amp.default = mockAmp;

    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        isAmp
        {...includeProps}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(mockAmp).toHaveBeenCalledTimes(1);
    expect(mockAmp).toHaveBeenCalledWith(includeProps, {});
  });

  it('should not render include for an Amp page with toggles disabled', async () => {
    const mockAmp = jest.fn().mockReturnValue('amp-includes-container');
    amp.default = mockAmp;
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={toggleStateFalse}
        html={fakeMarkup}
        type="idt2"
        isAmp
      />,
    );
    expect(container).toMatchSnapshot();
    expect(mockAmp).not.toHaveBeenCalled();
  });
});
