import React from 'react';
import FooterContainer from './index';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';

const RealDate = Date;

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

  shouldShallowMatchSnapshot('should render correctly', <FooterContainer />);
});
