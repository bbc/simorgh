import styled from '@emotion/styled';

import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
import Card from './card';
import CardContent from './card-content';
import CardDescription from './card-description';
import CardEpisodesText from './card-episodes-text';
import CardImageWrapper from './card-image-wrapper';
import CardLink from './card-link';
import CardTitle from './card-title';
import Title from './title';

const Wrapper = styled.section`
  background-color: ${props => props.theme.palette.LUNAR};
  padding: ${GEL_SPACING_DBL};
`;

const PodcastPromo = ({ children, ...props }) => (
  <Wrapper {...props}>{children}</Wrapper>
);

PodcastPromo.Title = Title;
PodcastPromo.Card = Card;
PodcastPromo.Card.Link = CardLink;
PodcastPromo.Card.ImageWrapper = CardImageWrapper;
PodcastPromo.Card.Content = CardContent;
PodcastPromo.Card.Title = CardTitle;
PodcastPromo.Card.Description = CardDescription;
PodcastPromo.Card.EpisodesText = CardEpisodesText;

export default PodcastPromo;
