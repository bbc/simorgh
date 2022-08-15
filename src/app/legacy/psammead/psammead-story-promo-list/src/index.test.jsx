import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { latin } from '#psammead/gel-foundations/src/scripts';
import StoryPromo, {
  Headline,
  Summary,
} from '#psammead/psammead-story-promo/src';
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
  shouldMatchSnapshot(
    'should render correctly',
    <StoryPromoUl>
      <StoryPromoLi>
        <StoryPromo image={Image} info={Info} />
      </StoryPromoLi>
    </StoryPromoUl>,
  );

  shouldMatchSnapshot(
    'should render correctly without border',
    <StoryPromoUl>
      <StoryPromoLi border={false}>
        <StoryPromo image={Image} info={Info} />
      </StoryPromoLi>
    </StoryPromoUl>,
  );
});

describe('StoryPromo list base', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <StoryPromoUl>
      <StoryPromoLiBase>
        <StoryPromo image={Image} info={Info} />
      </StoryPromoLiBase>
    </StoryPromoUl>,
  );

  shouldMatchSnapshot(
    'should render correctly without border',
    <StoryPromoUl>
      <StoryPromoLiBase border={false}>
        <StoryPromo image={Image} info={Info} />
      </StoryPromoLiBase>
    </StoryPromoUl>,
  );
});
