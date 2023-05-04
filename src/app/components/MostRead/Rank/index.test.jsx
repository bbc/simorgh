import React from 'react';
import { render } from '../../../../../components/react-testing-library-with-providers';
import latin from '../../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../../components/ThemeProvider/fontScripts/arabic';
import MostReadRank from '.';

describe('MostReadRank', () => {
  it('should render ltr correctly', () => {
    const { container } = render(
      <MostReadRank
        service="news"
        script={latin}
        listIndex={1}
        numberOfItems={5}
        dir="ltr"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render ltr with double digits correctly', () => {
    const { container } = render(
      <MostReadRank
        service="news"
        script={latin}
        listIndex={10}
        numberOfItems={10}
        dir="ltr"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render rtl correctly', () => {
    const { container } = render(
      <MostReadRank
        service="persian"
        script={arabic}
        listIndex={1}
        numberOfItems={5}
        dir="rtl"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render rtl with double digits correctly', () => {
    const { container } = render(
      <MostReadRank
        service="persian"
        script={arabic}
        listIndex={10}
        numberOfItems={10}
        dir="rtl"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
