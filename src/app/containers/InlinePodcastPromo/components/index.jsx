import React from 'react';
import styled from '@emotion/styled';
import { string, shape, arrayOf, element } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';

import Title from './title';
import Card from './card';
import CardContent from './card-content';
import CardLink from './card-link';
import CardImageWrapper from './card-image-wrapper';
import CardTitle from './card-title';
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
  background: #f4f4f4;
  width: 115px;
  height: 370px;
  margin: 10px 6px 6px 8px;
  padding: 12px 9.5px 8px 0.5px;

  @media (min-width: 320px) {
    width: 150px;
    height: 350px;
  }
  @media (min-width: 360px) {
    width: 175px;
  }
  @media (min-width: 400px) {
  }
  @media (min-width: 600px) {
    width: 275px;
    height: auto;
    margin: 11px 16px 31px 16px;
    padding: 12px 9.5px 8px 0.5px;
  }
`;

const PodcastPromo = ({ script, service, children, ...props }) => (
  <PodcastContext.Provider value={{ script, service }}>
    <Wrapper {...props}>{children}</Wrapper>
  </PodcastContext.Provider>
);

PodcastPromo.Title = withPodcastContext(Title);
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
