import React from 'react';
import VisuallyHiddenText from '#components/VisuallyHiddenText';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import arabic from '#components/ThemeProvider/fontScripts/arabic';
import Caption from '.';

describe('Caption', () => {
  it('should render with some offscreen text', () => {
    const { container } = render(
      <Caption script={latin} service="news">
        This is some Caption text
        <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
      </Caption>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with some offscreen text and arabic script typography values', () => {
    const { container } = render(
      <Caption script={arabic} service="persian">
        هذا هو بعض النص التسمية التوضيحي
        <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
      </Caption>,
    );
    expect(container).toMatchSnapshot();
  });
});
