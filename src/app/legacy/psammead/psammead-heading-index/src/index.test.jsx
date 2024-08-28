import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import arabic from '#components/ThemeProvider/fontScripts/arabic';
import HeadingIndex from './index';

describe('Index Heading', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HeadingIndex script={latin} service="news">
        This is a page heading
      </HeadingIndex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with arabic script typography values', () => {
    const { container } = render(
      <HeadingIndex script={arabic} service="persian">
        هذا عنوان الصفحة
      </HeadingIndex>,
    );
    expect(container).toMatchSnapshot();
  });
});
