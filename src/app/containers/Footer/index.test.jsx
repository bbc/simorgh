import React from 'react';
import { render } from '@testing-library/react';
import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import FooterContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';

const RealDate = Date;

const contextStub = {
  footer: {
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'Read about our approach to external linking.',
    },
    links: [
      {
        href: 'https://www.bbc.com/yoruba/institutional-48528718',
        text: 'Why you can trust the BBC',
      },
    ],
    copyrightText:
      'BBC. The BBC is not responsible for the content of external sites.',
  },
  service: 'news',
  product: 'BBC News',
  brandSVG: {
    group: (
      <g fillRule="evenodd">
        <path d="M84.32,0V24H58.82V0ZM79.26,16l-.41.25a11.91,11.91,0,0,1-6.07,1.85c-4.18,0-6.93-2.49-6.94-6.09s2.88-6.13,6.83-6.14a12,12,0,0,1,6,1.71l.4.22V4.6l-.17-.07A16.54,16.54,0,0,0,72.7,3.14a10.56,10.56,0,0,0-7.19,2.57,8.68,8.68,0,0,0-2.85,6.54A8.46,8.46,0,0,0,65,17.93a10,10,0,0,0,7.5,2.94h0a14,14,0,0,0,6.56-1.5l.15-.07Z M54.94,0V24H29.43V0ZM48.88,15.91a4.62,4.62,0,0,0-3.77-4.47,4.25,4.25,0,0,0,1.49-1.19,3.75,3.75,0,0,0,.72-2.34,4.17,4.17,0,0,0-1.39-3.13,6.33,6.33,0,0,0-4.36-1.41H36.12V20.65H42.5a7.18,7.18,0,0,0,4.9-1.53A4.27,4.27,0,0,0,48.88,15.91Z M45.7,15.57A2,2,0,0,1,45,17.16a4.22,4.22,0,0,1-2.85.79H39.22V13.23H42a4.89,4.89,0,0,1,2.82.68A1.93,1.93,0,0,1,45.7,15.57Z M43.32,9.92a2,2,0,0,0,.82-1.79,1.82,1.82,0,0,0-.58-1.43,3.33,3.33,0,0,0-2.26-.63H39.22v4.47h1.43A4.62,4.62,0,0,0,43.32,9.92Z M25.55,0V24H0V0ZM19.49,15.91a4.62,4.62,0,0,0-3.77-4.47,4.24,4.24,0,0,0,1.49-1.19,3.75,3.75,0,0,0,.72-2.34,4.18,4.18,0,0,0-1.39-3.13,6.33,6.33,0,0,0-4.36-1.41H6.74V20.65h6.38A7.18,7.18,0,0,0,18,19.12,4.27,4.27,0,0,0,19.49,15.91Z M13.93,9.92a2,2,0,0,0,.82-1.79,1.82,1.82,0,0,0-.58-1.43,3.33,3.33,0,0,0-2.26-.63H9.83v4.47h1.43A4.62,4.62,0,0,0,13.93,9.92Z M15.47,13.91a4.89,4.89,0,0,0-2.82-.68H9.83V18h2.94a4.23,4.23,0,0,0,2.85-.79,2,2,0,0,0,.69-1.59A1.93,1.93,0,0,0,15.47,13.91Z" />
        <path d="M111,3.36h2.36V20.7h-2.13L99.66,7.35V20.7H97.33V3.36h2L111,16.83Z" />
        <path d="m117.86 3.36h9.83v2.21h-7.35v5.29h7.1v2.22h-7.1v5.39h7.58v2.21h-10.06z M154.18,3.36h2.48l-7,17.41h-.55l-5.67-14.1-5.73,14.1h-.53l-7-17.41h2.5l4.78,12,4.81-12h2.35l4.83,12Z M163.38,13.43l-1.89-1.15A8.57,8.57,0,0,1,159,10.16a4,4,0,0,1-.75-2.41,4.26,4.26,0,0,1,1.42-3.33,5.31,5.31,0,0,1,3.69-1.28,7,7,0,0,1,4,1.22V7.17a5.74,5.74,0,0,0-4-1.8,3.34,3.34,0,0,0-2,.56,1.71,1.71,0,0,0-.78,1.44,2.22,2.22,0,0,0,.58,1.46,7.25,7.25,0,0,0,1.85,1.43l1.9,1.12Q168,13.28,168,16.21a4.42,4.42,0,0,1-1.4,3.39A5.11,5.11,0,0,1,163,20.9a7.63,7.63,0,0,1-4.68-1.58V16.17a5.84,5.84,0,0,0,4.65,2.55,2.93,2.93,0,0,0,1.94-.65,2,2,0,0,0,.78-1.63Q165.67,14.85,163.38,13.43Z" />
      </g>
    ),
    ratio: 6.9979,
    viewbox: {
      height: 24,
      width: 167.95,
    },
  },
  theming: {
    brandBackgroundColour: `${C_POSTBOX}`,
    brandLogoColour: `${C_WHITE}`,
  },
};

const FooterWithContext = (stub) => (
  <ServiceContext.Provider value={stub}>
    <FooterContainer />
  </ServiceContext.Provider>
);

describe(`FooterContainer`, () => {
  beforeEach(() => {
    global.Date = class extends RealDate {
      constructor() {
        super();
        return new RealDate('3000-01-01T12:00:00');
      }
    };
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  shouldMatchSnapshot(
    'should render correctly',
    FooterWithContext(contextStub),
  );

  isNull(
    'should render null when footer config not available',
    FooterWithContext({}),
  );

  describe('assertions', () => {
    it('should contain copyright text', () => {
      const { container } = render(FooterWithContext(contextStub));

      const paragraph = container.getElementsByTagName('p')[0];

      const copyrightSymbol = paragraph.getElementsByTagName('span')[0];
      paragraph.removeChild(copyrightSymbol);

      const externalLink = paragraph.getElementsByTagName('a')[0];
      paragraph.removeChild(externalLink);

      expect(paragraph.textContent).toEqual(
        '3000 BBC. The BBC is not responsible for the content of external sites. ',
      );
    });

    it('should contain a copyright symbol wrapped in span', () => {
      const { container } = render(FooterWithContext(contextStub));

      const paragraph = container.getElementsByTagName('p')[0];
      const copyrightSymbol = paragraph.getElementsByTagName('span')[0];

      expect(copyrightSymbol.textContent).toEqual('© ');
    });

    it('should contain an external link', () => {
      const { container } = render(FooterWithContext(contextStub));

      const paragraph = container.getElementsByTagName('p')[0];
      const externalLink = paragraph.getElementsByTagName('a')[0];

      expect(externalLink.textContent).toEqual(
        'Read about our approach to external linking.',
      );
    });
  });
});
