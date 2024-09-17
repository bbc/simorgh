import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import InlineLink from './index';

describe(`InlineLink`, () => {
  it('should render correctly', () => {
    const { container } = render(
      <InlineLink href="https://www.bbc.com/news">BBC News</InlineLink>,
    );
    expect(container).toMatchSnapshot();
  });
});
