import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { Services } from '#app/models/types/global';
import {
  render,
  screen,
} from '../../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../../contexts/ServiceContext';
import TopStoriesItem from '.';
import {
  topStoriesItem,
  topStoriesLiveLabelItem,
  topStoriesMediaContentItem,
  tipoFormattedTopStoriesItem,
  tipoLivePageTopStoriesItem,
} from '../fixture';
import { TopStoryItem } from '../types';

type Props = {
  fixtureData: TopStoryItem;
  service?: Services;
};

const TopStoriesItemFixture = ({ fixtureData, service = 'news' }: Props) => (
  <ServiceContextProvider service={service}>
    <ToggleContextProvider>
      <TopStoriesItem item={fixtureData} ariaLabelledBy="topStories" />
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('Optimo Top Stories Promo Item', () => {
  suppressPropWarnings(['service', 'LiveLabel', 'undefined']);

  it('should render Related Content when given appropriate data', () => {
    render(<TopStoriesItemFixture fixtureData={topStoriesItem} />);

    const heading = screen.getByText(
      'Covid antibodies in 1 in 10 people in December',
    );
    const timestamp = screen.getByText('19 January 2021');

    expect(heading).toBeInTheDocument();
    expect(timestamp).toBeInTheDocument();
  });

  it('should render Top Stories item when data is from Tipo', () => {
    suppressPropWarnings([
      'item.headlines.headline',
      'ForwardRef',
      'undefined',
    ]);

    render(
      <TopStoriesItemFixture
        service="kyrgyz"
        fixtureData={tipoFormattedTopStoriesItem}
      />,
    );

    const heading = screen.getByText(
      'Published at 12:19 - Индиянын Улуттук Конгресс партиясынын жаңы лидери шайланды',
    );
    const timestamp = screen.getByText('27 октябрь 2022');

    expect(heading).toBeInTheDocument();
    expect(timestamp).toBeInTheDocument();
  });

  it('should render Top Stories item when data is from Tipo Live page', () => {
    render(
      <TopStoriesItemFixture
        service="hindi"
        fixtureData={tipoLivePageTopStoriesItem}
      />,
    );

    const heading = screen.getByText(
      'ईवीएम के मॉक टेस्ट में बीजेपी को वोट जाने की रिपोर्ट पर ईसी ने सुप्रीम कोर्ट में दिया जवाब',
    );
    const liveLabel = screen.getByText('लाइव');

    expect(heading).toBeInTheDocument();
    expect(liveLabel).toBeInTheDocument();
  });

  it('should return null if no data is passed', () => {
    // @ts-expect-error - testing null data
    const { container } = render(<TopStoriesItemFixture fixtureData={{}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render Live Label if linked page is live', () => {
    render(<TopStoriesItemFixture fixtureData={topStoriesLiveLabelItem} />);
    const liveLabel = screen.getByText('LIVE');
    expect(liveLabel).toBeInTheDocument();
  });

  it('should render Live Label with correct translations', () => {
    render(
      <TopStoriesItemFixture
        fixtureData={topStoriesLiveLabelItem}
        service="mundo"
      />,
    );
    const liveLabel = screen.getByText('EN VIVO');
    expect(liveLabel).toBeInTheDocument();
  });

  it('should render media Label if linked page has media type', () => {
    render(<TopStoriesItemFixture fixtureData={topStoriesMediaContentItem} />);
    const mediaLabel = screen.getByText('Listen,');
    expect(mediaLabel).toBeInTheDocument();
  });

  it('should render media Label with correct translations ', () => {
    render(
      <TopStoriesItemFixture
        fixtureData={topStoriesMediaContentItem}
        service="mundo"
      />,
    );
    const mediaLabel = screen.getByText('Escuchar,');
    expect(mediaLabel).toBeInTheDocument();
  });
});
