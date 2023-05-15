import React from 'react';
import { render } from '../../../react-testing-library-with-providers';
import MostReadRank from '.';

const size = 'default';

describe('MostReadRank', () => {
  it('should render ltr correctly', () => {
    const { container } = render(
      <MostReadRank
        service="news"
        listIndex={1}
        numberOfItems={5}
        dir="ltr"
        size={size}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render ltr with double digits correctly', () => {
    const { container } = render(
      <MostReadRank
        service="news"
        listIndex={10}
        numberOfItems={10}
        dir="ltr"
        size={size}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render rtl correctly', () => {
    const { container } = render(
      <MostReadRank
        service="persian"
        listIndex={1}
        numberOfItems={5}
        dir="rtl"
        size={size}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render rtl with double digits correctly', () => {
    const { container } = render(
      <MostReadRank
        service="persian"
        listIndex={10}
        numberOfItems={10}
        dir="rtl"
        size={size}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
