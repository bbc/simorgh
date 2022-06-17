import React from 'react';
import { arrayOf, bool, shape, string, oneOf } from 'prop-types';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import { latin } from '#legacy/gel-foundations/src/scripts';
import MediaIndicator from '#legacy/psammead-media-indicator/src';
import { render } from '@testing-library/react';
import LiveLabel from '#legacy/psammead-live-label/src';
import styled from '@emotion/styled';
import { GEL_SPACING_HLF } from '#legacy/gel-foundations/src/spacings';
import StoryPromo, { Headline, Summary, Link } from './index';
import relatedItems from '../testHelpers/relatedItems';
import IndexAlsosContainer from '../testHelpers/IndexAlsosContainer';

const Image = <img src="https://foobar.com/image.png" alt="Alt text" />;

const Info = ({ promoType, isLive, dir, alsoItems, promoHasImage }) => (
  <>
    <Headline
      script={latin}
      service="news"
      promoType={promoType}
      promoHasImage={promoHasImage}
    >
      <Link href="https://www.bbc.co.uk/news">
        {isLive ? (
          <LiveLabel service="news" dir={dir} ariaHidden offScreenText="Live">
            The live promo headline
          </LiveLabel>
        ) : (
          'The headline of the promo'
        )}
      </Link>
    </Headline>
    <Summary
      script={latin}
      service="news"
      promoType={promoType}
      promoHasImage={promoHasImage}
    >
      The summary of the promo
    </Summary>
    <time>12 March 2019</time>
    {promoType === 'top' && alsoItems && (
      <IndexAlsosContainer
        alsoItems={alsoItems}
        script={latin}
        service="news"
      />
    )}
  </>
);

Info.propTypes = {
  promoType: string,
  isLive: bool.isRequired,
  dir: oneOf(['rtl', 'ltr']),
  alsoItems: arrayOf(shape()).isRequired,
  promoHasImage: bool,
};

Info.defaultProps = {
  promoType: 'regular',
  dir: 'ltr',
  promoHasImage: true,
};

const StyledTime = styled.time`
  padding: 0 ${GEL_SPACING_HLF};
`;

const MediaInfo = ({ dir, service }) => (
  <MediaIndicator script={latin} service={service} dir={dir}>
    <StyledTime datetime="PT2M15S">2:15</StyledTime>
  </MediaIndicator>
);

MediaInfo.propTypes = {
  dir: oneOf(['rtl', 'ltr']),
  service: string,
};

MediaInfo.defaultProps = {
  dir: 'ltr',
  service: 'news',
};

describe('StoryPromo', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <StoryPromo image={Image} info={Info({})} />,
  );
  shouldMatchSnapshot(
    'should render Live promo correctly',
    <StoryPromo image={Image} info={Info({ isLive: true })} />,
  );

  shouldMatchSnapshot(
    'should render a RTL Live promo correctly',
    <StoryPromo image={Image} info={Info({ isLive: true, dir: 'rtl' })} />,
  );
});

describe('StoryPromo with Media Indicator', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <StoryPromo image={Image} info={Info({})} mediaIndicator={<MediaInfo />} />,
  );

  shouldMatchSnapshot(
    'should render a RTL promo with media indicator correctly',
    <StoryPromo
      image={Image}
      info={Info({})}
      mediaIndicator={<MediaInfo service="persian" dir="rtl" />}
    />,
  );
});

describe('StoryPromo - Top Story', () => {
  it('should render correctly', () => {
    const { container, getByRole } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'top' })}
        promoType="top"
      />,
    );
    const heading = getByRole('heading');
    const time = container.getElementsByTagName('time');
    const image = container.getElementsByTagName('img');
    expect(heading).toBeInTheDocument();
    expect(time.length).toEqual(1);
    expect(image.length).toEqual(1);
  });

  it('should render with Media Indicator correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'top' })}
        promoType="top"
        mediaIndicator={<MediaInfo />}
      />,
    );

    const svg = container.getElementsByTagName('svg');
    expect(svg.length).toEqual(1);
  });

  it('should render with multiple Index Alsos correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'top', alsoItems: relatedItems })}
        promoType="top"
      />,
    );
    const alsosHeadlines = container.getElementsByTagName('li');
    expect(alsosHeadlines.length).toEqual(2);
  });

  it('should render with one Index Also correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'top', alsoItems: [relatedItems[0]] })}
        promoType="top"
      />,
    );
    const alsosHeadlines = container.getElementsByTagName('h4');
    expect(alsosHeadlines.length).toEqual(1);
  });
});

describe('StoryPromo - OnwardJourney Top Story', () => {
  it('should render correctly', () => {
    const { container, getByRole } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'onwardJourneys' })}
        promoType="onwardJourneys"
      />,
    );
    const heading = getByRole('heading');
    const time = container.getElementsByTagName('time');
    const image = container.getElementsByTagName('img');
    expect(heading).toBeInTheDocument();
    expect(time.length).toEqual(1);
    expect(image.length).toEqual(1);
  });

  it('should render with Media Indicator correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'onwardJourneys' })}
        promoType="onwardJourneys"
        mediaIndicator={<MediaInfo />}
      />,
    );

    const svg = container.getElementsByTagName('svg');
    expect(svg.length).toEqual(1);
  });
});

describe('StoryPromo - Leading Story', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <StoryPromo
      image={Image}
      info={Info({ promoType: 'leading' })}
      promoType="leading"
    />,
  );

  shouldMatchSnapshot(
    'should render with Media Indicator correctly',
    <StoryPromo
      image={Image}
      info={Info({ promoType: 'leading' })}
      mediaIndicator={<MediaInfo />}
      promoType="leading"
    />,
  );
});

describe('assertions', () => {
  it('should render h3, a, p, time', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'top' })}
        mediaIndicator={<MediaInfo />}
        promoType="top"
      />,
    );

    expect(container.querySelector('h3 a').textContent).toEqual(
      'The headline of the promo',
    );
    expect(container.querySelector('p').textContent).toEqual(
      'The summary of the promo',
    );

    const time = container.querySelector('time');
    expect(time.textContent).toEqual('2:15');

    const image = container.querySelector('img');

    expect(image.getAttribute('src')).toEqual('https://foobar.com/image.png');
    expect(image.getAttribute('alt')).toEqual('Alt text');
  });

  it('should add extra props passed to the component', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'top' })}
        mediaIndicator={<MediaInfo />}
        promoType="top"
        data-story-promo="story_promo"
      />,
    );

    expect(
      container.querySelector('div').getAttribute('data-story-promo'),
    ).toEqual('story_promo');
  });
});
