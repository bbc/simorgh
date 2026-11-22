import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { render, screen } from '../react-testing-library-with-providers';
import Timestamp from '.';

describe('Timestamp', () => {
  it('preserves the semantic datetime and a consumer class without leaking styling props', () => {
    render(
      <Timestamp datetime="2018-07-07" padding={false} className="consumer">
        7 July 2018
      </Timestamp>,
    );
    const time = screen.getByText('7 July 2018');
    expect(time.tagName).toBe('TIME');
    expect(time).toHaveAttribute('datetime', '2018-07-07');
    expect(time).toHaveClass('consumer');
    expect(time).not.toHaveAttribute('padding');
  });
  it('should render Timestamp correctly', () => {
    render(<Timestamp datetime="1530947227000">7 July 2018</Timestamp>);
    expect(screen.getByText('7 July 2018')).toBeInTheDocument();
  });

  it('should render dark mode Timestamp correctly on page types that support a dark UI ', () => {
    render(<Timestamp datetime="1530947227000">7 July 2018</Timestamp>, {
      pageType: MEDIA_ARTICLE_PAGE,
    });
    expect(screen.getByText('7 July 2018')).toBeInTheDocument();
  });

  it('should render Timestamp with a prefix', () => {
    render(<Timestamp datetime="1530947227000">Updated 7 July 2018</Timestamp>);
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
