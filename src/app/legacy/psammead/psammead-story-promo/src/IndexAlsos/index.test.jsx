import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import relatedItems from '../../testHelpers/relatedItems';
import IndexAlsosContainer from '../../testHelpers/IndexAlsosContainer';

describe('Index Alsos', () => {
  it('should render multiple correctly', () => {
    const { container } = render(
      <IndexAlsosContainer
        alsoItems={relatedItems}
        script={latin}
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render one correctly', () => {
    const { container } = render(
      <IndexAlsosContainer
        alsoItems={[relatedItems[0]]}
        script={latin}
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
