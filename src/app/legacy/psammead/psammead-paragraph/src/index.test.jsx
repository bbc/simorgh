import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import Paragraph from './index';
import { MEDIA_ARTICLE_PAGE } from '../../../../routes/utils/pageTypes';

describe('Paragraph', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Paragraph>This is text in a paragraph.</Paragraph>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly on page types that support a dark ui', () => {
    const { container } = render(
      <Paragraph>This is text in a paragraph.</Paragraph>,
      {
        pageType: MEDIA_ARTICLE_PAGE,
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with arabic script typography values', () => {
    const { container } = render(<Paragraph>بعض محتوى النص</Paragraph>, {
      service: 'persian',
    });
    expect(container).toMatchSnapshot();
  });
});
