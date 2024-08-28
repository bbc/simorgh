import React from 'react';
import DecoratedInline from '.';
import { render } from '#components/react-testing-library-with-providers';
import { persianLink } from './fixture';

describe('InlineContainer', () => {
  it('should render correctly', () => {
    const { container } = render(
      <DecoratedInline blocks={[persianLink]} language="fa" />,
    );
    expect(container).toMatchSnapshot();
  });
});
