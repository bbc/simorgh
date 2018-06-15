import Header from './index';

import testHelper from '../../../../src/__test__/testHelper';

describe(`Header`, () => {
  testHelper.shouldMatchSnapshot('Header', Header);
});
