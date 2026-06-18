import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import CurationMessageBanner from '.';

const defaultProps = {
  id: 'curation-message-banner',
  heading: 'Follow BBC News Kyrgyz on social media',
  description:
    'Follow all the updates minute-by-minute as the transfer window opens.',
  link: 'https://www.bbc.com/kyrgyz',
  linkText: 'Follow us',
  image:
    'https://ichef.test.bbci.co.uk/ace/ws/{width}/cpsdevpb/66b8/test/d1be6bc0-8114-11ed-bd83-8f15ba358e41.png',
};

describe('CurationMessageBanner', () => {
  it('renders a section with role="region"', () => {
    render(<CurationMessageBanner {...defaultProps} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('labels the region with the heading via aria-labelledby', () => {
    render(<CurationMessageBanner {...defaultProps} />);
    const region = screen.getByRole('region');
    const heading = screen.getByText(defaultProps.heading);
    expect(region.getAttribute('aria-labelledby')).toBe(
      heading.getAttribute('id'),
    );
  });

  it('renders the heading at h2 level', () => {
    render(<CurationMessageBanner {...defaultProps} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(defaultProps.heading);
  });

  it('renders the description text', () => {
    render(<CurationMessageBanner {...defaultProps} />);
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders the call-to-action link', () => {
    render(<CurationMessageBanner {...defaultProps} />);
    expect(
      screen.getByRole('link', { name: new RegExp(defaultProps.linkText) }),
    ).toBeInTheDocument();
  });

  it('renders an image when image prop is provided', () => {
    render(<CurationMessageBanner {...defaultProps} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('does not render an image when image prop is omitted', () => {
    const { image: _, ...propsWithoutImage } = defaultProps;
    render(<CurationMessageBanner {...propsWithoutImage} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('applies the id as data-testid on the section', () => {
    render(<CurationMessageBanner {...defaultProps} />);
    expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();
  });

  it('passes eventTrackingData through to the MessageBanner', () => {
    const eventTrackingData = {
      componentName: 'message-banner',
      groupTracker: {
        type: 'message-banner',
        position: '1',
        itemCount: 1,
      },
    };
    render(
      <CurationMessageBanner
        {...defaultProps}
        eventTrackingData={eventTrackingData}
      />,
    );
    expect(screen.getByRole('region')).toBeInTheDocument();
  });
});
