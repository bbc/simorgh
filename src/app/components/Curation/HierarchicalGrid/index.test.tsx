import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import fixture from './fixtures';
import mediaFixture from './mediaFixtures';
import HierarchicalGrid from '.';

describe('Hierarchical Grid Curation', () => {
  const headingLevel = 2;
  it('renders twelve promos when twelve items are provided', async () => {
    render(<HierarchicalGrid headingLevel={headingLevel} promos={fixture} />);

    expect(document.querySelectorAll('li').length).toBe(12);
  });

  it('renders twelve promos when more than twelve items are provided', async () => {
    const extraPromos = fixture.concat({
      title: 'Wetin happun for January 6 one year ago?',
      type: 'article',
      firstPublished: '2022-01-06T19:00:29.000Z',
      link: 'https://www.bbc.com/pidgin/tori-59901959',
      imageUrl:
        'https://ichef.bbci.co.uk/news/{width}/cpsprodpb/DE3A/production/_122609865_january6timelinewetinhappunforjanuary6oneyearago.jpg',
      description:
        'Here na reminder of wetin happun on di historic day when rioters storm di Capitol exactly one year ago.',
      imageAlt: 'January 6 timeline: Wetin happun for January 6 one year ago?',
      id: 'e2263a1c-8d5a-4a73-a00c-881acfa34381',
    });
    render(
      <HierarchicalGrid headingLevel={headingLevel} promos={extraPromos} />,
    );

    expect(document.querySelectorAll('li').length).toBe(12);
  });

  it('returns null when less than three promos are in the data', async () => {
    render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        promos={fixture.splice(0, 2)}
      />,
    );
    expect(document.querySelectorAll('li').length).toBe(0);
  });

  it('renders list with role of list', async () => {
    render(<HierarchicalGrid headingLevel={headingLevel} promos={fixture} />);

    expect(document.querySelectorAll('ul').length).toBe(1);
    expect(document.querySelector('ul')?.getAttribute('role')).toBe('list');
  });

  it('should use formatted duration when a valid duration is provided - audio', async () => {
    const container = render(
      <HierarchicalGrid headingLevel={headingLevel} promos={mediaFixture} />,
    );

    const durationString = 'Duration, 2,03';

    expect(container.getByText(durationString)).toBeInTheDocument();
    expect(container.getByText('Test audio clip')).toBeInTheDocument();
  });

  it('should use formatted duration when a valid duration is provided - video', async () => {
    const container = render(
      <HierarchicalGrid headingLevel={headingLevel} promos={mediaFixture} />,
    );

    const durationString = 'Duration, 3,43';

    expect(container.getByText(durationString)).toBeInTheDocument();
    expect(container.getByText('Test video article')).toBeInTheDocument();
  });

  it('should use role text when using nested spans', async () => {
    render(
      <HierarchicalGrid headingLevel={headingLevel} promos={mediaFixture} />,
    );

    expect(document.querySelector('span')?.getAttribute('role')).toBe('text');
  });

  it('should use visually hidden text only when type is media i.e video, audio and photogallery', async () => {
    const container = render(
      <HierarchicalGrid headingLevel={headingLevel} promos={mediaFixture} />,
    );

    expect(container.queryAllByTestId('visually-hidden-text')).toHaveLength(2);
    expect(container.getByText('Test image gallery')).toBeInTheDocument();
  });
});
