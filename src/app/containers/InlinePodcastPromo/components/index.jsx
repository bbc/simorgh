import React from 'react';
import styled from '@emotion/styled';
import { string, shape, arrayOf, element } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_HLF_TRPL,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_B_MIN_WIDTH,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

import Title from './title';
import Card from './card';
import CardContent from './card-content';
import CardLink from './card-link';
import CardImageWrapper from './card-image-wrapper';
import CardDescription from './card-description';
import CardEpisodesText from './card-episodes-text';

const PodcastContext = React.createContext({});
const withPodcastContext = Component => props =>
  (
    <PodcastContext.Consumer>
      {context => <Component {...context} {...props} />}
    </PodcastContext.Consumer>
  );

const Wrapper = styled.section`
  ${({ dir }) => (dir === 'ltr' ? 'float: right;' : 'float: left;')}
  background: ${C_LUNAR};
  height: auto;

  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    width: 9.25rem;
    margin: ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING_QUAD} ${GEL_SPACING};
    padding: ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }

  @media (min-width: calc(${GEL_GROUP_B_MIN_WIDTH}rem + 2.5rem)) {
    width: 10.93rem;
    margin: ${GEL_SPACING_TRPL} ${GEL_SPACING} ${GEL_SPACING_TRPL}
      ${GEL_SPACING};
    padding: ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 10.93rem;
    margin: ${GEL_SPACING_DBL} ${GEL_SPACING_DBL} ${GEL_SPACING_QUAD}
      ${GEL_SPACING_HLF_TRPL};
    padding: ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 17.25rem;
    margin: ${GEL_SPACING_HLF_TRPL} ${GEL_SPACING_DBL} ${GEL_SPACING_QUAD}
      ${GEL_SPACING_DBL};
    padding: ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }
`;

const PodcastPromo = ({ script, service, children, ...props }) => (
  <PodcastContext.Provider value={{ script, service }}>
    <Wrapper {...props}>{children}</Wrapper>
  </PodcastContext.Provider>
);

PodcastPromo.Title = withPodcastContext(Title);
PodcastPromo.Card = Card;
PodcastPromo.Card.Link = withPodcastContext(CardLink);
PodcastPromo.Card.ImageWrapper = CardImageWrapper;
PodcastPromo.Card.Content = CardContent;
PodcastPromo.Card.Description = withPodcastContext(CardDescription);
PodcastPromo.Card.EpisodesText = withPodcastContext(CardEpisodesText);

PodcastPromo.propTypes = {
  children: arrayOf(element).isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
};

PodcastPromo.defaultProps = {};

export default PodcastPromo;
