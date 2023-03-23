import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import Paragraph from './index';

describe('Paragraph', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Paragraph script={latin} service="news">
        This is text in a paragraph.
      </Paragraph>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly in dark mode', () => {
    const { container } = render(
      <Paragraph script={latin} service="news" darkMode>
        This is text in a paragraph.
      </Paragraph>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with arabic script typography values', () => {
    const { container } = render(
      <Paragraph script={arabic} service="persian">
        بعض محتوى النص
      </Paragraph>,
    );
    expect(container).toMatchSnapshot();
  });
});
