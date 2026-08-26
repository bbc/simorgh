import { screen } from '@testing-library/react';
import { render } from '../../../../components/react-testing-library-with-providers';
import Timestamp from '.';
import { MEDIA_ARTICLE_PAGE } from '../../../../routes/utils/pageTypes';

describe('Timestamp', () => {
  it('should render Timestamp correctly', () => {
    render(
      <Timestamp datetime="1530947227000">7 July 2018</Timestamp>,
    );
    expect(screen.getByText('7 July 2018')).toBeInTheDocument();
  });

  it('should render dark mode Timestamp correctly on page types that support a dark UI ', () => {
    render(
      <Timestamp datetime="1530947227000">7 July 2018</Timestamp>,
      {
        pageType: MEDIA_ARTICLE_PAGE,
      },
    );
    expect(screen.getByText('7 July 2018')).toBeInTheDocument();
  });

  it('should render Timestamp with a prefix', () => {
    render(
      <Timestamp datetime="1530947227000">Updated 7 July 2018</Timestamp>,
    );
    expect(screen.getByText('Updated 7 July 2018')).toBeInTheDocument();
  });

  it('should render Timestamp without padding', () => {
    render(
      <Timestamp datetime="1530947227000" padding={false}>
        Updated 7 July 2018
      </Timestamp>,
    );
    expect(screen.getByText('Updated 7 July 2018')).toBeInTheDocument();
  });
});
