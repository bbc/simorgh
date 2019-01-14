import React from 'react';
import { render } from 'react-testing-library';
import BrandContainer from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`BrandContainer Jest `, () => {
  shouldMatchSnapshot('should render correctly', <BrandContainer />);
});

describe(`BrandContainer react-testing-library`, () => {
  it('should render correctly ', () => {
    const { baseElement } = render(<BrandContainer />);
    expect(baseElement.firstChild).toMatchSnapshot();
  });
});
