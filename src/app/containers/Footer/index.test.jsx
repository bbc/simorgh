import React from 'react';
import FooterContainer from './index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { shouldMatchSnapshot } from '../../../testHelpers';

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
};

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
    <ServiceContext.Provider value={contextStub}>
      <FooterContainer />
    </ServiceContext.Provider>,
  );

  shouldMatchSnapshot(
    'should render null when footer config not availible',
    <ServiceContext.Provider value={{}}>
      <FooterContainer />
    </ServiceContext.Provider>,
  );
});
