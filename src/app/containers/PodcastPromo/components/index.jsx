import React from 'react';
import styled from '@emotion/styled';
import { string, shape, arrayOf, element } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';

import Title from './title';
import Card from './card';
import Blah from './blah';
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

const getWrapperPadding = ({ isHorizontal }) => {
  const topBottomPadding = isHorizontal ? GEL_SPACING_QUAD : GEL_SPACING_DBL;
  const leftRightPadding = GEL_SPACING_DBL;

  return `${topBottomPadding} ${leftRightPadding}`;
};

const Wrapper = styled.section`
  background-color: ${C_LUNAR};
  padding: ${getWrapperPadding};
`;

const PodcastPromo = ({ script, service, children, ...props }) => (
  <PodcastContext.Provider value={{ script, service }}>
    <Wrapper {...props}>{children}</Wrapper>
  </PodcastContext.Provider>
);

PodcastPromo.Title = withPodcastContext(Title);
PodcastPromo.Blah = Blah;
PodcastPromo.Card = Card;
PodcastPromo.Card.Link = CardLink;
PodcastPromo.Card.ImageWrapper = CardImageWrapper;
PodcastPromo.Card.Content = CardContent;
PodcastPromo.Card.Title = withPodcastContext(CardTitle);
PodcastPromo.Card.Description = withPodcastContext(CardDescription);
PodcastPromo.Card.EpisodesText = withPodcastContext(CardEpisodesText);

PodcastPromo.propTypes = {
  children: arrayOf(element).isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
};

PodcastPromo.defaultProps = {};

export default PodcastPromo;
