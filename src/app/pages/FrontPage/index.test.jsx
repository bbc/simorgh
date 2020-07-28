/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import frontPageDataPidgin from '#data/pidgin/frontpage/index-light';
import pidginMostReadData from '#data/pidgin/mostRead';
import getInitialData from '#app/routes/home/getInitialData';
import FrontPage from '.';

// eslint-disable-next-line react/prop-types
const FrontPageWithContext = ({
  isAmp = false,
  service = 'pidgin',
  ...props
}) => (
  <BrowserRouter>
    <FrontPage
      status={200}
      pageType="frontPage"
      service={service}
      isAmp={isAmp}
      pathname="/pathname"
      bbcOrigin="https://www.test.bbc.co.uk"
      {...props}
    />
  </BrowserRouter>
);

let pageData;

beforeEach(async () => {
  window.dotcom = {
    bootstrap: jest.fn(),
    cmd: { push: jest.fn() },
  };

  fetch.mockResponse(JSON.stringify(frontPageDataPidgin));

  const response = await getInitialData({
    path: 'some-front-page-path',
    service: 'pidgin',
  });

  pageData = response.pageData;

  fetch.mockResponse(JSON.stringify(pidginMostReadData));
});

afterEach(() => {
  window.dotcom = undefined;
  window.dotcomConfig = undefined;
});

jest.mock('uuid', () => {
  let x = 1;
  return () => {
    x += 1;
    return `mockid-${x}`;
  };
});

jest.mock('#containers/ChartbeatAnalytics', () => {
  return () => <div>chartbeat</div>;
});

jest.mock('#containers/ATIAnalytics/amp', () => {
  return () => <div>Amp ATI analytics</div>;
});

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  return props => <Component {...props} />;
});

describe('Front Page', () => {
  describe('snapshots', () => {
    it('should render a pidgin frontpage correctly', async () => {
      let container;
      await act(async () => {
        container = render(<FrontPageWithContext pageData={pageData} />)
          .container;
      });

      expect(container).toMatchSnapshot();
    });

    it('should render a pidgin amp frontpage', async () => {
      const { container } = render(
        <FrontPageWithContext pageData={pageData} isAmp />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should render visually hidden text as h1', async () => {
      let container;
      await act(async () => {
        container = render(<FrontPageWithContext pageData={pageData} />)
          .container;
      });

      const h1 = container.querySelector('h1');
      const content = h1.getAttribute('id');
      const tabIndex = h1.getAttribute('tabIndex');

      expect(content).toEqual('content');
      expect(tabIndex).toBe('-1');

      const span = h1.querySelector('span');
      expect(span.getAttribute('role')).toEqual('text');
      expect(span.textContent).toEqual('BBC News, Pidgin - Home');

      const langSpan = span.querySelector('span');
      expect(langSpan.getAttribute('lang')).toEqual('en-GB');
      expect(langSpan.textContent).toEqual('BBC News');
    });

    it('should render front page sections', async () => {
      let container;
      await act(async () => {
        container = render(<FrontPageWithContext pageData={pageData} />)
          .container;
      });

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(3);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });

    it('should create window.dotcomConfig when on Canonical and hasAds is true', async () => {
      await act(async () => {
        render(<FrontPageWithContext service="mundo" pageData={pageData} />);
      });

      expect(window.dotcomConfig).toEqual({
        pageAds: true,
        playerAds: false,
      });
    });

    it('should create window.dotcomConfig when on Canonical and hasAds is false', async () => {
      await act(async () => {
        render(<FrontPageWithContext service="japanese" pageData={pageData} />);
      });

      expect(window.dotcomConfig).toBeFalsy();
    });

    it('should not create window.dotcomConfig when on Amp and hasAds is true', async () => {
      await act(async () => {
        render(
          <FrontPageWithContext service="mundo" pageData={pageData} isAmp />,
        );
      });

      expect(window.dotcomConfig).toBeFalsy();
    });
  });
});
