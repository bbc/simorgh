import React from 'react';

import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import PodcastExternalLinks from '.';

const Component = ({ links, service = 'russian', variant = null }) => (
  <ToggleContextProvider
    toggles={{
      eventTracking: { enabled: true },
    }}
  >
    <ServiceContextProvider service={service} variant={variant}>
      <PodcastExternalLinks links={links} brandTitle="A brand podcast" />
    </ServiceContextProvider>
  </ToggleContextProvider>
);

const links = [
  {
    linkUrl: 'https://bbc.com',
    linkText: 'Apple',
    linkType: 'apple',
  },
  {
    linkUrl: 'https://bbc.com',
    linkText: 'Spotify',
    linkType: 'spotify',
  },
  {
    linkUrl: 'https://bbc.com',
    linkText: 'RSS',
    linkType: 'rss',
  },
  {
    linkUrl: 'https://bbc.com',
    linkText: 'Download',
    linkType: 'download',
  },
];

describe('PodcastExternalLinks', () => {
  it('Should render external links', () => {
    const { container } = render(<Component links={links} />);
    expect(container).toMatchSnapshot();
  });

  it('should render the right amount of items', () => {
    const { container, getByRole } = render(<Component links={links} />);
    const elements = container.getElementsByTagName('a');
    const listElements = container.getElementsByTagName('li');
    const list = getByRole('list');

    expect(elements.length).toBe(4);
    expect(listElements.length).toBe(4);
    expect(list).toBeInTheDocument();

    const { container: emptyContainer } = render(<Component links={[]} />);
    expect(emptyContainer.getElementsByTagName('a').length).toEqual(0);
  });

  it('should not render a list for only one item', () => {
    const { container, queryByRole } = render(<Component links={[links[0]]} />);
    const elements = container.getElementsByTagName('a');
    expect(elements.length).toBe(1);
    expect(queryByRole('list')).not.toBeInTheDocument();
  });

  it('should use default translations when translations are unavailable', () => {
    const { getByText } = render(<Component links={links} />);
    const russianTitle = getByText('Этот подкаст доступен на');
    expect(russianTitle).toBeInTheDocument();

    const { getByText: afriqueGetByText } = render(
      <Component links={links} service="afrique" />,
    );
    const afriqueTitle = afriqueGetByText('This podcast is also available on');
    expect(afriqueTitle).toBeInTheDocument();
  });

  it('should render component in an aside', () => {
    const { getByRole } = render(<Component links={links} />);
    const aside = getByRole('complementary');
    expect(aside.tagName).toEqual('ASIDE');
    expect(aside.getAttribute('aria-labelledBy')).toEqual('third-party-links');
  });

  it('should render hidden text in the links with external text', () => {
    const { getAllByText } = render(<Component links={links} />);
    const visuallyHiddenText = getAllByText(', A brand podcast, внешняя');
    expect(visuallyHiddenText.length).toEqual(4);
  });

  it('should contain the correct lang attribute', async () => {
    const { getByText } = render(<Component links={links} />);
    const linkText = getByText('Spotify');
    expect(linkText.getAttribute('lang')).toEqual('en-GB');
  });
});

describe('Event Tracking', () => {
  it('should call the view tracking hook with the correct params', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
    render(<Component links={links} />);

    expect(viewTrackerSpy).toHaveBeenCalledWith({
      componentName: 'third-party',
      campaignID: 'player-episode-podcast',
    });
  });

  it('should call the click tracking hook with the correct params', () => {
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
    render(<Component links={links} />);

    expect(clickTrackerSpy).toHaveBeenCalledWith({
      componentName: 'third-party',
      campaignID: 'player-episode-podcast',
    });
  });
});
