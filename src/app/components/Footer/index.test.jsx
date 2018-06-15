import Footer from './index';

import testHelper from '../../../../src/__test__/testHelper';

describe(`Footer`, () => {
  testHelper.shouldMatchSnapshot('Footer', Footer);
});
