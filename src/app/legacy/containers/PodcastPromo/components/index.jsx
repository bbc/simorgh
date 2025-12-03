import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';

import Title from './title';
import Card from './card';
import CardContent from './card-content';
import CardLink from './card-link';
import CardImageWrapper from './card-image-wrapper';
import CardTitle from './card-title';
import CardDescription from './card-description';
import CardEpisodesText from './card-episodes-text';

const PodcastContext = React.createContext({});
const withPodcastContext = Component => props => (
  <PodcastContext.Consumer>
    {context => <Component {...context} {...props} />}
  </PodcastContext.Consumer>
);

const Wrapper = styled.section`
  background-color: ${props => props.theme.palette.LUNAR};
  padding: ${GEL_SPACING_DBL};
`;

const PodcastPromo = ({ script, service, children, ...props }) => {
  const podcastPromoValue = useMemo(
    () => ({ script, service }),
    [script, service],
  );
  return (
    <PodcastContext.Provider value={podcastPromoValue}>
      <Wrapper {...props}>{children}</Wrapper>
    </PodcastContext.Provider>
  );
};

PodcastPromo.Title = withPodcastContext(Title);
PodcastPromo.Card = Card;
PodcastPromo.Card.Link = CardLink;
PodcastPromo.Card.ImageWrapper = CardImageWrapper;
PodcastPromo.Card.Content = CardContent;
PodcastPromo.Card.Title = withPodcastContext(CardTitle);
PodcastPromo.Card.Description = withPodcastContext(CardDescription);
PodcastPromo.Card.EpisodesText = withPodcastContext(CardEpisodesText);

export default PodcastPromo;
