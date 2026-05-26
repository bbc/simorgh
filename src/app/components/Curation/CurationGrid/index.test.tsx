import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import {
  type Summary,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import CurationGrid from '.';

const eventTrackingData = { componentName: 'simple-curation-grid' };

const allSummaries = [
  {
    type: 'article',
    title: 'High impact promo',
    link: 'https://www.bbc.com/pidgin/articles/cz93zw8y759o',
    visualProminence: VISUAL_PROMINENCE.MAXIMUM,
    id: '1',
  },
  {
    type: 'video',
    title: 'Standard promo title',
    link: 'https://www.bbc.com/mundo/articles/cx2p3yqypplo',
    visualProminence: VISUAL_PROMINENCE.MAXIMUM,
    id: '2',
  },
  {
    type: 'article',
    title: 'Another standard promo',
    link: 'https://www.bbc.com/igbo/articles/c1en6xwmpkvt',
    id: '3',
  },
] as Summary[];

const [highImpactPromo, mediaPromo, standardPromo] = allSummaries;

describe('CurationGrid', () => {
  it('should render a HighImpactPromo if a promo has MAXIMUM visual prominence and is not a media type', () => {
    render(
      <CurationGrid
        summaries={[highImpactPromo]}
        eventTrackingData={eventTrackingData}
      />,
    );

    expect(screen.getByTestId('high-impact-promo')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'BBC News Pidgin' }),
    ).toBeInTheDocument();
  });

  it('should render a CurationPromo if a promo has MAXIMUM visual prominence but is a media type', () => {
    render(
      <CurationGrid
        summaries={[mediaPromo]}
        eventTrackingData={eventTrackingData}
      />,
    );

    const promo = screen.getByText('Standard promo title');
    expect(promo).toBeInTheDocument();
    expect(screen.queryByTestId('high-impact-promo')).not.toBeInTheDocument();
  });

  it('should not apply stretch styles when no promos are high impact', () => {
    render(
      <CurationGrid
        summaries={[mediaPromo, standardPromo]}
        eventTrackingData={eventTrackingData}
      />,
    );
    const list = screen.getByRole('list');
    expect(list).not.toHaveStyle({
      alignItems: 'stretch',
    });
  });

  it('should not render anything if there are no summaries', () => {
    const { container } = render(
      <CurationGrid summaries={[]} eventTrackingData={eventTrackingData} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should pass correct eventTrackingData to click tracker for video curationContentType', () => {
    const spy = jest.spyOn(clickTracking, 'default');
    const videoEventTrackingData = { componentName: 'video-curation-grid' };
    render(
      <CurationGrid
        summaries={[mediaPromo]}
        eventTrackingData={videoEventTrackingData}
      />,
    );
    expect(screen.getByText('Standard promo title')).toBeInTheDocument();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'video-curation-grid',
        itemTracker: expect.objectContaining({
          type: 'video-curation-grid-promo',
          text: 'Standard promo title',
          position: 1,
          resourceId: '2',
        }),
      }),
    );
    spy.mockRestore();
  });
  it('should pass simple-curation-grid and simple-curation-grid-promo to tracking if curationContentType is empty', () => {
    const spy = jest.spyOn(clickTracking, 'default');
    render(
      <CurationGrid
        summaries={[mediaPromo]}
        eventTrackingData={eventTrackingData}
      />,
    );
    expect(screen.getByText('Standard promo title')).toBeInTheDocument();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'simple-curation-grid',
        itemTracker: expect.objectContaining({
          type: 'simple-curation-grid-promo',
          text: 'Standard promo title',
          position: 1,
          resourceId: '2',
        }),
      }),
    );
    spy.mockRestore();
  });
});
