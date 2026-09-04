import { screen } from '@testing-library/react';
import { render } from '../../../../components/react-testing-library-with-providers';
import Paragraph from './index';
import { MEDIA_ARTICLE_PAGE } from '../../../../routes/utils/pageTypes';

describe('Paragraph', () => {
  it('should render correctly', () => {
    render(<Paragraph>This is text in a paragraph.</Paragraph>);
    expect(
      screen.getByText('This is text in a paragraph.'),
    ).toBeInTheDocument();
  });

  it('should render correctly on page types that support a dark ui', () => {
    render(<Paragraph>This is text in a paragraph.</Paragraph>, {
      pageType: MEDIA_ARTICLE_PAGE,
    });
    expect(
      screen.getByText('This is text in a paragraph.'),
    ).toBeInTheDocument();
  });

  it('should render correctly with arabic script typography values', () => {
    render(<Paragraph>بعض محتوى النص</Paragraph>, { service: 'persian' });
    expect(screen.getByText('بعض محتوى النص')).toBeInTheDocument();
  });
});
