import { render, screen } from '../../react-testing-library-with-providers';
import BillboardCurationGrid from './index';
import { pidginLiveBillboard } from '../fixtures';

const { summaries } = pidginLiveBillboard;

// minimum data to stop typescript errors - add to this when adding tracking for Billboard
const eventTrackingData = {
  componentName: 'billboard',
};

describe('BillboardCurationGrid breakpoint responsive CurationPromo count', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders 4 promos when at least 4 summaries are provided', () => {
    render(
      <BillboardCurationGrid
        summaries={summaries}
        eventTrackingData={eventTrackingData}
      />,
    );
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(4);
  });

  it('renders 3 promos when only 3 summaries are provided', () => {
    render(
      <BillboardCurationGrid
        summaries={summaries.slice(0, 3)}
        eventTrackingData={eventTrackingData}
      />,
    );
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(3);
  });

  it('renders a single promo in a div when only one summary is provided', () => {
    render(
      <BillboardCurationGrid
        summaries={[summaries[0]]}
        eventTrackingData={eventTrackingData}
      />,
    );
    const promoHeading = screen.getByRole('heading', { level: 3 });
    expect(promoHeading).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders promo links with correct hrefs', () => {
    render(
      <BillboardCurationGrid
        summaries={summaries.slice(1)}
        eventTrackingData={eventTrackingData}
      />,
    );
    const links = screen.getAllByRole('link');
    const expectedLinks = summaries.slice(1, 5).map(promo => promo.link);
    const renderedLinks = links.map(link => link.getAttribute('href'));
    expect(renderedLinks).toEqual(expectedLinks);
  });
});
