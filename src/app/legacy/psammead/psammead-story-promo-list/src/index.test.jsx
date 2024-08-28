import React from 'react';
import StoryPromo, {
  Headline,
  Summary,
} from '#psammead/psammead-story-promo/src';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import { StoryPromoLi, StoryPromoLiBase, StoryPromoUl } from './index';

const Image = <img src="https://foobar.com/image.png" alt="Alt text" />;

const Info = (
  <>
    <Headline script={latin} service="news">
      The headline of the promo
    </Headline>
    <Summary script={latin} service="news">
      The summary of the promo
    </Summary>
    <time>12 March 2019</time>
  </>
);

describe('StoryPromo list', () => {
  it('should render correctly', () => {
    const { container } = render(
      <StoryPromoUl>
        <StoryPromoLi>
          <StoryPromo image={Image} info={Info} />
        </StoryPromoLi>
      </StoryPromoUl>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly without border', () => {
    const { container } = render(
      <StoryPromoUl>
        <StoryPromoLi border={false}>
          <StoryPromo image={Image} info={Info} />
        </StoryPromoLi>
      </StoryPromoUl>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('StoryPromo list base', () => {
  it('should render correctly', () => {
    const { container } = render(
      <StoryPromoUl>
        <StoryPromoLiBase>
          <StoryPromo image={Image} info={Info} />
        </StoryPromoLiBase>
      </StoryPromoUl>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly without border', () => {
    const { container } = render(
      <StoryPromoUl>
        <StoryPromoLiBase border={false}>
          <StoryPromo image={Image} info={Info} />
        </StoryPromoLiBase>
      </StoryPromoUl>,
    );
    expect(container).toMatchSnapshot();
  });
});
