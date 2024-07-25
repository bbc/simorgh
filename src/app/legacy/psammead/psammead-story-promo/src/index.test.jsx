import React from 'react';
import MediaIndicator from '#psammead/psammead-media-indicator/src';
import styled from '@emotion/styled';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';
import { render } from '../../../../components/react-testing-library-with-providers';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import LiveLabel from '../../../../components/LiveLabel';
import StoryPromo, { Headline, Summary, Link } from './index';
import relatedItems from '../testHelpers/relatedItems';
import IndexAlsosContainer from '../testHelpers/IndexAlsosContainer';

const Image = <img src="https://foobar.com/image.png" alt="Alt text" />;

const Info = ({
  promoType = 'regular',
  isLive,
  alsoItems,
  promoHasImage = true,
}) => (
  <>
    <Headline
      script={latin}
      service="news"
      promoType={promoType}
      promoHasImage={promoHasImage}
    >
      <Link href="https://www.bbc.co.uk/news">
        {isLive ? (
          <LiveLabel ariaHidden offScreenText="Live">
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

const StyledTime = styled.time`
  padding: 0 ${GEL_SPACING_HLF};
`;

const MediaInfo = ({ dir = 'ltr', service = 'news' }) => (
  <MediaIndicator script={latin} service={service} dir={dir}>
    <StyledTime datetime="PT2M15S">2:15</StyledTime>
  </MediaIndicator>
);

describe('StoryPromo', () => {
  it('should render correctly', () => {
    const { container } = render(<StoryPromo image={Image} info={Info({})} />);
    expect(container).toMatchSnapshot();
  });

  it('should render Live promo correctly', () => {
    const { container } = render(
      <StoryPromo image={Image} info={Info({ isLive: true })} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a RTL Live promo correctly', () => {
    const { container } = render(
      <StoryPromo image={Image} info={Info({ isLive: true, dir: 'rtl' })} />,
      { service: 'arabic' },
    );
    expect(container).toMatchSnapshot();
  });
});

describe('StoryPromo with Media Indicator', () => {
  it('should render correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({})}
        mediaIndicator={<MediaInfo />}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a RTL promo with media indicator correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({})}
        mediaIndicator={<MediaInfo service="persian" dir="rtl" />}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('StoryPromo - Top Story', () => {
  it('should render correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'top' })}
        promoType="top"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with Media Indicator correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'top' })}
        mediaIndicator={<MediaInfo />}
        promoType="top"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with multiple Index Alsos correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'top', alsoItems: relatedItems })}
        promoType="top"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with one Index Also correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'top', alsoItems: [relatedItems[0]] })}
        promoType="top"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('StoryPromo - Leading Story', () => {
  it('should render correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'leading' })}
        promoType="leading"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with Media Indicator correctly', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ promoType: 'leading' })}
        mediaIndicator={<MediaInfo />}
        promoType="leading"
      />,
    );
    expect(container).toMatchSnapshot();
  });
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
