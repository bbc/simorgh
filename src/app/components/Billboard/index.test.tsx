import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '../react-testing-library-with-providers';
import Billboard from '.';
import { kyrgyzBillboard } from './fixtures';
import * as viewTracking from '../../hooks/useViewTracker';
import * as clickTracking from '../../hooks/useClickTrackerHandler';

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

        expect(viewTrackerSpy).toHaveBeenCalledWith(undefined);
      });

      it('should register view tracker if event tracking data provided', () => {
        render(
          <Billboard
            heading={title}
            description={description}
            link={link}
            image={imageUrl}
            eventTrackingData={eventTrackingData}
            altText={imageAlt}
          />,
        );

        expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
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

        expect(clickTrackerSpy).toHaveBeenCalledWith(undefined);

        const [anchorTag] = container.getElementsByTagName('a');
        fireEvent.click(anchorTag);
        expect(anchorTag.onclick).toBeFalsy();
      });

      it('should register click tracker if event tracking data provided', () => {
        render(
          <Billboard
            heading={title}
            description={description}
            link={link}
            image={imageUrl}
            eventTrackingData={eventTrackingData}
            altText={imageAlt}
          />,
        );

        expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
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
