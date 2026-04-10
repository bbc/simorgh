import {
  fireEvent,
  render,
  screen,
} from '../react-testing-library-with-providers';
import Billboard from '.';
import { kyrgyzBillboard, pidginLiveBillboard } from './fixtures';
import * as MaskedImage from '../MaskedImage';
import * as viewTracking from '../../hooks/useViewTracker';
import * as clickTracking from '../../hooks/useClickTrackerHandler';
import { service as pidginService } from '../../lib/config/services/pidgin';

describe('Billboard', () => {
  const summary = kyrgyzBillboard.summaries[0];
  const { title, description, link, imageUrl, imageAlt } = summary;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a section with role region', () => {
    render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
      />,
    );
    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
  });

  it('should have a heading with an id which matches the aria-labelledby attribute', () => {
    const { getByRole } = render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
      />,
    );
    const heading = screen.getByRole('heading', { level: 2, name: title });
    const billboardEl = getByRole('region');
    expect(billboardEl.getAttribute('aria-labelledby')).toBe(
      heading.getAttribute('id'),
    );
  });

  it('should display the billboard heading correctly as an H2', () => {
    render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
      />,
    );
    expect(
      screen.getByRole('heading', { level: 2, name: title }),
    ).toBeInTheDocument();
  });

  it('should display the billboard subtext correctly as a Paragraph', () => {
    render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
      />,
    );
    expect(screen.getByText(description).nodeName).toBe('P');
  });

  it('should render a masked image with the correct image src', () => {
    const { getByRole } = render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
      />,
    );
    const maskedImage = getByRole('img');
    expect(maskedImage.getAttribute('src')).toEqual(
      'https://ichef.test.bbci.co.uk/ace/ws/240/cpsdevpb/107B8/test/_63521576_66f7fe9f-1076-402a-988b-6e515cbb6b4b.jpg',
    );
  });

  it('should have an masked image with the correct alt text', () => {
    const { getByAltText } = render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
      />,
    );
    const maskedImage = getByAltText(imageAlt);
    expect(maskedImage).toBeInTheDocument();
  });

  it('disables the vignette when no promo items are present', () => {
    const maskedImageSpy = jest.spyOn(MaskedImage, 'default');

    render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
        summaries={[kyrgyzBillboard.summaries[0]]}
      />,
    );

    expect(maskedImageSpy).toHaveBeenCalled();
    expect(maskedImageSpy.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        showVignette: false,
        singleImageLayout: true,
      }),
    );

    maskedImageSpy.mockRestore();
  });

  it('enables the vignette when promo items are present', () => {
    const maskedImageSpy = jest.spyOn(MaskedImage, 'default');

    render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
        summaries={pidginLiveBillboard.summaries}
      />,
    );

    expect(maskedImageSpy).toHaveBeenCalled();
    expect(maskedImageSpy.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        showVignette: true,
        singleImageLayout: false,
      }),
    );

    maskedImageSpy.mockRestore();
  });

  it('should render BillboardCurationGrid with CurationPromos when summaries are provided', () => {
    render(
      <Billboard
        heading={title}
        description={description ?? ''}
        link={link}
        image={imageUrl}
        altText={imageAlt}
        summaries={pidginLiveBillboard.summaries}
      />,
    );

    const gridContainer = screen.getByTestId('billboard-curation-grid');
    expect(gridContainer).toBeInTheDocument();

    const gridList = screen.getByTestId('billboard-promos');
    expect(gridList).toBeInTheDocument();
    expect(gridList.nodeName).toBe('UL');

    const promoHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(promoHeadings).toHaveLength(4);

    // The main masked image plus the 4 promo images
    const promoImages = screen.getAllByRole('img');
    expect(promoImages).toHaveLength(5);

    // one promo does not have a timestamp
    const promoTimestamps = screen
      .getAllByRole('time')
      .filter(element => element.classList.contains('promo-timestamp'));
    expect(promoTimestamps).toHaveLength(3);
  });

  it('should render an h2 heading with the text for "More on this" translated', () => {
    // can remove this setting of the translation when pidgin moreOnThis translation is available
    const originalMoreOnThis = pidginService.default.translations.moreOnThis;
    pidginService.default.translations.moreOnThis = 'More on this';

    render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
        summaries={pidginLiveBillboard.summaries}
      />,
      { service: 'pidgin' },
    );
    const moreOnThisText = pidginService.default.translations.moreOnThis;

    const curationGridSection = screen
      .getByRole('region')
      .querySelector('[class*="curationGridSection"]');
    const moreLikeThisHeading = curationGridSection?.querySelector('h2');
    expect(moreLikeThisHeading).toBeInTheDocument();
    expect(moreLikeThisHeading?.textContent).toBe(moreOnThisText);

    // Restore the original translation after the test - can remove when pidgin moreOnThis translation is available
    pidginService.default.translations.moreOnThis = originalMoreOnThis;
  });

  it('should not render the "More on this" h2 heading when the "moreOnThis" translation is empty', () => {
    const originalMoreOnThis = pidginService.default.translations.moreOnThis;

    // Remove the translation for this test only
    pidginService.default.translations.moreOnThis = '';

    render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
        summaries={pidginLiveBillboard.summaries}
      />,
      { service: 'pidgin' }, // service context now has no "moreOnThis" translation
    );

    const curationGridSection = screen
      .getByRole('region')
      .querySelector('[class*="curationGridSection"]');
    const heading = curationGridSection?.querySelector('h2');
    expect(heading).toBeNull();

    // Restore the original translation after the test in case future tests rely on it
    pidginService.default.translations.moreOnThis = originalMoreOnThis;
  });

  it('does not render the curation grid section if there is only one summary', () => {
    render(
      <Billboard
        heading={title}
        description={description}
        link={link}
        image={imageUrl}
        altText={imageAlt}
        summaries={[pidginLiveBillboard.summaries[0]]}
      />,
    );

    const moreOnThisText = pidginService.default.translations.moreOnThis;
    const moreLikeThisHeading = screen.queryByRole('heading', {
      level: 2,
      name: moreOnThisText,
    });
    expect(moreLikeThisHeading).not.toBeInTheDocument();

    expect(
      screen.queryByTestId('billboard-curation-grid'),
    ).not.toBeInTheDocument();
  });

  describe('Event Tracking', () => {
    const eventTrackingData = { componentName: 'billboard' };

    describe('View tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should not be enabled if event tracking data not provided', () => {
        render(
          <Billboard
            heading={title}
            description={description}
            link={link}
            image={imageUrl}
            altText={imageAlt}
          />,
        );

        expect(viewTrackerSpy).toHaveBeenCalledWith(
          expect.objectContaining({ componentName: 'billboard' }),
        );
      });

      it('should register view tracker if event tracking data provided', () => {
        render(
          <Billboard
            heading={title}
            description={description}
            link={link}
            image={imageUrl}
            altText={imageAlt}
            eventTrackingData={{ componentName: 'billboard' }}
            summaries={pidginLiveBillboard.summaries}
          />,
        );

        expect(viewTrackerSpy).toHaveBeenCalledWith(
          expect.objectContaining({ componentName: 'billboard' }),
        );
      });
    });

    describe('Click tracking', () => {
      const clickTrackerSpy = jest
        .spyOn(clickTracking, 'default')
        .mockImplementation();

      it('should not be enabled if event tracking data not provided', () => {
        const { container } = render(
          <Billboard
            heading={title}
            description={description}
            link={link}
            image={imageUrl}
            altText={imageAlt}
          />,
        );

        expect(clickTrackerSpy).toHaveBeenCalledWith({
          componentName: 'billboard',
        });

        const [anchorTag] = container.getElementsByTagName('a');
        fireEvent.click(anchorTag);
        expect(anchorTag.onclick).toBeFalsy();
      });

      it('should register click tracker if event tracking data provided', () => {
        const provided = { componentName: 'billboard' };

        render(
          <Billboard
            heading={title}
            description={description}
            link={link}
            image={imageUrl}
            eventTrackingData={provided}
            altText={imageAlt}
          />,
        );

        expect(clickTrackerSpy).toHaveBeenCalledWith(provided);
      });

      it('should handle a click event when link clicked', () => {
        clickTrackerSpy.mockRestore();

        const { container } = render(
          <Billboard
            heading={title}
            description={description}
            link={link}
            image={imageUrl}
            eventTrackingData={eventTrackingData}
            altText={imageAlt}
          />,
        );

        const [anchorTag] = container.getElementsByTagName('a');
        fireEvent.click(anchorTag);

        expect(anchorTag.onclick).toBeTruthy();
      });
    });
  });

  describe('With Live Label', () => {
    it('should display a live pulse', () => {
      const { getByTestId } = render(
        <Billboard
          heading={title}
          description={description}
          link={link}
          image={imageUrl}
          altText={imageAlt}
          showLiveLabel
        />,
      );

      const liveLabel = getByTestId('billboard-live-label');
      expect(liveLabel).toBeInTheDocument();

      const [livePulse] = liveLabel.getElementsByTagName('svg');
      expect(livePulse).toBeInTheDocument();
    });

    it('should display live text', () => {
      const { getByTestId } = render(
        <Billboard
          heading={title}
          description={description}
          link={link}
          image={imageUrl}
          altText={imageAlt}
          showLiveLabel
        />,
        {
          service: 'kyrgyz',
        },
      );

      const liveLabel = getByTestId('billboard-live-label');
      expect(liveLabel).toBeInTheDocument();

      expect(liveLabel.textContent).toEqual(expect.stringContaining(title));
    });
  });
});
